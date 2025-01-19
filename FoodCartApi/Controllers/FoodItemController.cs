using FoodCartApi.Db;
using FoodCartApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;



namespace FoodCartApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodItemController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public FoodItemController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<ApiResponse>> GetAllFoodItems()
        {
            ApiResponse res;
            try 
            {
                List<FoodItem> foodItems = await _context.FoodItems.AsNoTracking().ToListAsync();
                res = ApiResponse.Create(HttpStatusCode.OK, success: true, data: foodItems, msg: "Retrieved all food items");
                return Ok(res);
            } 
            catch (Exception e) 
            {
                List<string> errs = new List<string> { e.Message, e.StackTrace };
                res = ApiResponse.Create(HttpStatusCode.InternalServerError, msg: "An unexpected error occurred", errors: errs);
                return StatusCode((int)HttpStatusCode.InternalServerError, res);
            }
        }

        //// GET api/<FoodItemController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/<FoodItemController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<FoodItemController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<FoodItemController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
