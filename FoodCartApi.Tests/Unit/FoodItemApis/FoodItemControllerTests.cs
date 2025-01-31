﻿
using FoodCartApi.Db;
using Microsoft.EntityFrameworkCore;
using FoodCartApi.Controllers;
using FoodCartApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Moq;

namespace FoodCartApi.Tests.Unit.FoodItemApis
{
    public class FoodItemControllerTests : IDisposable
    {
        private readonly ApplicationContext _context;
        private readonly FoodItemController _controller;

        public FoodItemControllerTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationContext>().UseInMemoryDatabase("TestDb").Options;
            _context = new ApplicationContext(options);
            _controller = new FoodItemController(_context);
        }

        [Fact]
        public async Task GetAllFoodItems_WithFoodItems_ReturnsOk()
        {
            // Arrange
            await SeedTestData();

            // Act
            var result = await _controller.GetAllFoodItems();

            // Assert
            var actionResult = Assert.IsType<ActionResult<ApiResponse>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var apiResponse = Assert.IsType<ApiResponse>(okResult.Value);

            Assert.Equal(HttpStatusCode.OK, apiResponse.StatusCode);
            Assert.True(apiResponse.Success);
            Assert.Equal("Retrieved all food items", apiResponse.Message);

            var returnedFoodItems = Assert.IsType<List<FoodItem>>(apiResponse.Data);
            Assert.Equal(2, returnedFoodItems.Count);
            Assert.Contains(returnedFoodItems, item => item.Name == "Pizza");
            Assert.Contains(returnedFoodItems, item => item.Name == "Burger");
        }

        [Fact]
        public async Task GetAllFoodItems_WithNoItems_ReturnsOkResult()
        {
            // Act
            var result = await _controller.GetAllFoodItems();

            // Assert
            var actionResult = Assert.IsType<ActionResult<ApiResponse>>(result);
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var apiResponse = Assert.IsType<ApiResponse>(okResult.Value);

            Assert.Equal(HttpStatusCode.OK, apiResponse.StatusCode);
            Assert.True(apiResponse.Success);
            var returnedFoodItems = Assert.IsType<List<FoodItem>>(apiResponse.Data);
            Assert.Empty(returnedFoodItems);
        }

        private async Task SeedTestData()
        {
            var foodItems = new List<FoodItem>
            {
                new FoodItem
                {
                    Id = 1,
                    Name = "Pizza",
                    Description = "Italian dish",
                    Price = 200
                },
                new FoodItem
                {
                    Id = 2,
                    Name = "Burger",
                    Description = "American classic",
                    Price = 300
                }
            };

            await _context.FoodItems.AddRangeAsync(foodItems);
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }
    }
}
