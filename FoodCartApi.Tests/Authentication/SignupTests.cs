using FoodCartApi.Models;
using FoodCartApi.Models.Dtos;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http.Json;

namespace FoodCartApi.Tests.Authentication
{
    public class SignupTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public SignupTests(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Signup_WithValidModel_ReturnsOkResult()
        {
            // Arrange
            var signupDto = new SignupDto
            {
                UserName = "UserThree_3",
                Email = "user.three@email.com",
                Password = "UserThree_3",
                FirstName = "User",
                LastName = "Three"
            };

            // Act
            var response = await _client.PostAsJsonAsync("/api/Auth/signup", signupDto);

            // Assert status code
            Assert.Equal(System.Net.HttpStatusCode.OK, response.StatusCode);

            // Deserialize response
            var apiResponse = await response.Content.ReadFromJsonAsync<ApiResponse>();

            // Assert response object
            Assert.NotNull(apiResponse);
            Assert.True(apiResponse.Success);
            Assert.NotNull(apiResponse.Message);
        }

        [Fact]
        public async Task Signup_WithExistingUsername_ReturnsConflict()
        {
            // Arrange
            var signupDto = new SignupDto
            {
                UserName = "UserThree_3",
                Email = "user.three@email.com",
                Password = "UserThree_3",
                FirstName = "User",
                LastName = "Three"
            };

            // Act
            var response = await _client.PostAsJsonAsync("/api/Auth/signup", signupDto);

            // Assert status code
            Assert.Equal(System.Net.HttpStatusCode.Conflict, response.StatusCode);

            // Deserialize response
            var apiResponse = await response.Content.ReadFromJsonAsync<ApiResponse>();

            // Assert response object
            Assert.NotNull(apiResponse);
            Assert.False(apiResponse.Success);
            Assert.NotNull(apiResponse.Message);
        }

        [Fact]
        public async Task Signup_WithInvalidModel_ReturnsBadRequest()
        {
            // Arrange
            var signupDto = new SignupDto
            {
                UserName = "testuser",
                Email = "invalid-email",  // Invalid email format
                Password = "Password123!",
                FirstName = "Test",
                LastName = "User"
            };

            // Act
            var response = await _client.PostAsJsonAsync("/api/Auth/signup", signupDto);

            // Assert status code
            Assert.Equal(System.Net.HttpStatusCode.BadRequest, response.StatusCode);

            // Deserialize response
            var apiResponse = await response.Content.ReadFromJsonAsync<ApiResponse>();

            // Assert response object
            Assert.NotNull(apiResponse);
            Assert.False(apiResponse.Success);
            Assert.NotNull(apiResponse.Message);
        }

        [Fact]
        public async Task Signup_WithInvalidPassword_ReturnsBadRequest()
        {
            // Arrange
            var signupDto = new SignupDto
            {
                UserName = "UserFour_4",
                Email = "user.four@email.com",
                Password = "3",
                FirstName = "User",
                LastName = "Four"
            };
            // Act
            var response = await _client.PostAsJsonAsync("/api/Auth/signup", signupDto);

            // Assert status code
            Assert.Equal(System.Net.HttpStatusCode.BadRequest, response.StatusCode);

            // Deserialize response
            var apiResponse = await response.Content.ReadFromJsonAsync<ApiResponse>();

            // Assert response object
            Assert.NotNull(apiResponse);
            Assert.False(apiResponse.Success);
            Assert.NotNull(apiResponse.Message);
        }
    }
}
