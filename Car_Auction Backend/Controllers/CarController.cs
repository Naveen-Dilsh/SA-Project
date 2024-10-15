using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Car_Auction_Backend.Models;
using Car_Auction_Backend.Data;
using System.Threading.Tasks;

namespace Car_Auction_Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CarController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public CarController(ApplicationDbContext context)
		{
			_context = context;
		}

		[HttpPost("Add Car")]
		public async Task<IActionResult> AddCar(Car car)
		{
			// Add the car entity to the database
			_context.Cars.Add(car);

			// Save the changes to generate the car's ID (CId)
			await _context.SaveChangesAsync();

			// Get the inserted car's ID (CId)
			var carId = car.CId;  // Use car.CId as per your model

			// Return the carId in the response
			return Ok(new { carId });
		}

	}
}