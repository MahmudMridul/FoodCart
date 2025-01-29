
using FoodCartApi.Models;
using FoodCartApi.Models.Dtos;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http.Json;

namespace FoodCartApi.Tests.Authentication
{
    public class SigninTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public SigninTests(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Signin_WithValidModel_ReturnsOkResult()
        {
            // Arrange
            var signinDto = new SigninDto
            {
                NameOrEmail = "UserOne_1",
                Password = "UserOne_1"
            };

            // Act
            var response = await _client.PostAsJsonAsync("/api/Auth/signin", signinDto);

            // Assert status code
            Assert.Equal(System.Net.HttpStatusCode.OK, response.StatusCode);

            // Deserialize response
            var apiResponse = await response.Content.ReadFromJsonAsync<ApiResponse>();

            // Assert response object
            Assert.NotNull(apiResponse);
            Assert.True(apiResponse.Success);
            Assert.NotNull(apiResponse.Message);
            Assert.Equal(expected: "Sign in successfull", actual: apiResponse.Message);
        }

        [Fact]
        public async Task Signin_WithInvalidUsername_ReturnsNotFound()
        {
            // Arrange
            var signinDto = new SigninDto
            {
                NameOrEmail = "UserOne",
                Password = "UserOne"
            };

            // Act
            var response = await _client.PostAsJsonAsync("/api/Auth/signin", signinDto);

            // Assert status code
            Assert.Equal(System.Net.HttpStatusCode.NotFound, response.StatusCode);

            // Deserialize response
            var apiResponse = await response.Content.ReadFromJsonAsync<ApiResponse>();

            // Assert response object
            Assert.NotNull(apiResponse);
            Assert.False(apiResponse.Success);
            Assert.NotNull(apiResponse.Message);
        }

        [Fact]
        public async Task Signin_WithWrongPassword_ReturnsUnauthorized()
        {
            // Arrange
            var signinDto = new SigninDto
            {
                NameOrEmail = "UserOne_1",
                Password = "UserOne"
            };

            // Act
            var response = await _client.PostAsJsonAsync("/api/Auth/signin", signinDto);

            // Assert status code
            Assert.Equal(System.Net.HttpStatusCode.Unauthorized, response.StatusCode);

            // Deserialize response
            var apiResponse = await response.Content.ReadFromJsonAsync<ApiResponse>();

            // Assert response object
            Assert.NotNull(apiResponse);
            Assert.False(apiResponse.Success);
            Assert.NotNull(apiResponse.Message);
        }
    }
}
