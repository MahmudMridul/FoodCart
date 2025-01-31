
using FoodCartApi.Controllers;
using FoodCartApi.Db;
using FoodCartApi.Models;
using FoodCartApi.Models.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using System.Net;

namespace FoodCartApi.Tests.Unit.Authentication
{
    public class SignupTests : IDisposable
    {
        private readonly ApplicationContext _context;
        private readonly Mock<UserManager<User>> _mockUserManager;
        private readonly Mock<SignInManager<User>> _mockSignInManager;
        private readonly Mock<IConfiguration> _mockConfig;
        private readonly AuthController _controller;

        public SignupTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationContext>()
                .UseInMemoryDatabase(databaseName: "TestDb")
                .Options;
            _context = new ApplicationContext(options);

            var userStoreMock = new Mock<IUserStore<User>>();
            _mockUserManager = new Mock<UserManager<User>>(
                userStoreMock.Object,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            );

            // user property mock
            _mockUserManager.Setup(x => x.Users)
                .Returns(_context.Users);

            var contextAccessorMock = new Mock<IHttpContextAccessor>();
            var userPrincipalFactoryMock = new Mock<IUserClaimsPrincipalFactory<User>>();
            _mockSignInManager = new Mock<SignInManager<User>>(
                _mockUserManager.Object,
                contextAccessorMock.Object,
                userPrincipalFactoryMock.Object,
                null,
                null,
                null,
                null
            );

            _mockConfig = new Mock<IConfiguration>();

            _controller = new AuthController(
                _context,
                _mockUserManager.Object,
                _mockSignInManager.Object,
                _mockConfig.Object
            );
        }

        [Fact]
        public async Task Signup_WithValidModel_ReturnsOkResult()
        {
            // Arrange
            var signupModel = new SignupDto
            {
                FirstName = "Test",
                LastName = "User",
                Email = "test@example.com",
                Password = "Test123!",
                UserName = "testuser"
            };

            _mockUserManager.Setup(x => x.CreateAsync(It.IsAny<User>(), signupModel.Password))
                .ReturnsAsync(IdentityResult.Success);

            _mockUserManager.Setup(x => x.AddToRoleAsync(It.IsAny<User>(), "User"))
                .ReturnsAsync(IdentityResult.Success);

            // Act
            var result = await _controller.Signup(signupModel);

            // Assert
            var actionResult = Assert.IsType<ActionResult<ApiResponse>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var response = Assert.IsType<ApiResponse>(okResult.Value);

            Assert.True(response.Success);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            //_mockUserManager.Verify(x => x.CreateAsync(
            //    It.Is<User>(u =>
            //        u.Email == signupModel.Email &&
            //        u.UserName == signupModel.UserName &&
            //        u.FirstName == signupModel.FirstName &&
            //        u.LastName == signupModel.LastName),
            //    signupModel.Password
            //), Times.Once);

            //_mockUserManager.Verify(x => x.AddToRoleAsync(
            //    It.IsAny<User>(),
            //    "User"
            //), Times.Once);
        }

        [Fact]
        public async Task Signup_WithExistingUsername_ReturnsConflict()
        {
            // Arrange
            var existingUser = new User
            {
                UserName = "testuser",
                Email = "existing@example.com",
                FirstName = "Existing",
                LastName = "User"
            };
            await _context.Users.AddAsync(existingUser);
            await _context.SaveChangesAsync();

            var signupModel = new SignupDto
            {
                FirstName = "Test",
                LastName = "User",
                Email = "new@example.com",
                Password = "Test123!",
                UserName = "testuser"
            };

            // Act
            var result = await _controller.Signup(signupModel);

            // Assert
            var actionResult = Assert.IsType<ActionResult<ApiResponse>>(result);
            var conflictResult = Assert.IsType<ConflictObjectResult>(actionResult.Result);
            var response = Assert.IsType<ApiResponse>(conflictResult.Value);

            Assert.False(response.Success);
            Assert.Equal(HttpStatusCode.Conflict, response.StatusCode);
        }

        [Fact]
        public async Task Signup_WithInvalidModel_ReturnsBadRequest()
        {
            // Arrange
            var signupModel = new SignupDto
            {
                UserName = "testuser",
                Email = "invalid-email",  // Invalid email format
                Password = "Password123!",
                FirstName = "Test",
                LastName = "User"
            };

            _controller.ModelState.AddModelError("Email", "The Email field is not a valid e-mail address.");

            _mockUserManager.Setup(x => x.CreateAsync(It.IsAny<User>(), signupModel.Password))
               .ReturnsAsync(IdentityResult.Success);

            _mockUserManager.Setup(x => x.AddToRoleAsync(It.IsAny<User>(), "User"))
                .ReturnsAsync(IdentityResult.Success);

            // Act
            var result = await _controller.Signup(signupModel);

            // Assert
            var actionResult = Assert.IsType<ActionResult<ApiResponse>>(result);
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(actionResult.Result);
            var response = Assert.IsType<ApiResponse>(badRequestResult.Value);

            Assert.False(response.Success);
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);

            // Verify that CreateAsync was never called due to validation failure
            _mockUserManager.Verify(x => x.CreateAsync(It.IsAny<User>(), It.IsAny<string>()), Times.Never);
        }

        [Fact]
        public async Task Signup_WithInvalidPassword_ReturnsBadRequest()
        {
            // Arrange
            var signupModel = new SignupDto
            {
                UserName = "UserFour_4",
                Email = "user.four@email.com",
                Password = "3",
                FirstName = "User",
                LastName = "Four"
            };

            _controller.ModelState.AddModelError("Password", "Password must be at least 8 characters long.");

            _mockUserManager.Setup(x => x.CreateAsync(It.IsAny<User>(), signupModel.Password))
               .ReturnsAsync(IdentityResult.Success);

            _mockUserManager.Setup(x => x.AddToRoleAsync(It.IsAny<User>(), "User"))
                .ReturnsAsync(IdentityResult.Success);

            // Act
            var result = await _controller.Signup(signupModel);

            // Assert
            var actionResult = Assert.IsType<ActionResult<ApiResponse>>(result);
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(actionResult.Result);
            var response = Assert.IsType<ApiResponse>(badRequestResult.Value);

            Assert.False(response.Success);
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);

            _mockUserManager.Verify(x => x.CreateAsync(It.IsAny<User>(), It.IsAny<string>()), Times.Never);

        }

        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }
    }
}

