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

		/// <summary>
		/// Adds a new car to the database.
		/// </summary>
		/// <param name="car">The car object to add.</param>
		/// <returns>The created car object.</returns>
		/// <response code="201">Returns the newly created car.</response>
		/// <response code="400">If the car object is null or invalid.</response>
		[HttpPost]
		[ProducesResponseType(typeof(Car), StatusCodes.Status201Created)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public async Task<ActionResult<Car>> AddCar(Car car)
		{
			if (car == null || !ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			// CStatus will use the default value "Unsold" if not provided

			_context.Cars.Add(car);
			await _context.SaveChangesAsync();

			return CreatedAtAction(nameof(GetCar), new { id = car.CId }, car);
		}

		/// <summary>
		/// Retrieves a car by ID.
		/// </summary>
		/// <param name="id">The ID of the car to retrieve.</param>
		/// <returns>The car object.</returns>
		/// <response code="200">Returns the requested car.</response>
		/// <response code="404">If the car is not found.</response>
		[HttpGet("{id}")]
		[ProducesResponseType(typeof(Car), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<ActionResult<Car>> GetCar(int id)
		{
			var car = await _context.Cars.FindAsync(id);

			if (car == null)
			{
				return NotFound();
			}

			return car;
		}

		/// <summary>
		/// Retrieves all cars from the database.
		/// </summary>
		/// <returns>A list of all cars.</returns>
		/// <response code="200">Returns the list of cars.</response>
		[HttpGet]
		[ProducesResponseType(typeof(IEnumerable<Car>), StatusCodes.Status200OK)]
		public async Task<ActionResult<IEnumerable<Car>>> GetAllCars()
		{
			return await _context.Cars.ToListAsync();
		}

		/// <summary>
		/// Updates an existing car in the database.
		/// </summary>
		/// <param name="id">The ID of the car to update.</param>
		/// <param name="car">The updated car object.</param>
		/// <returns>No content if successful.</returns>
		/// <response code="204">If the car was successfully updated.</response>
		/// <response code="400">If the car object is null, invalid, or the ID doesn't match.</response>
		/// <response code="404">If the car is not found.</response>
		[HttpPut("{id}")]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> UpdateCar(int id, Car car)
		{
			if (id != car.CId)
			{
				return BadRequest();
			}

			_context.Entry(car).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!CarExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return NoContent();
		}

		private bool CarExists(int id)
		{
			return _context.Cars.Any(e => e.CId == id);
		}
	}
}