using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Car_Auction_Backend.Models;
using Car_Auction_Backend.Data;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Car_Auction_Backend.DTOs;

namespace Car_Auction_Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class BidController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public BidController(ApplicationDbContext context)
		{
			_context = context;
		}


		//---------------------------------------------------------------------Add a Bid-------------------------------------------------------------------//

		// POST: api/Bid
		[HttpPost]
		public async Task<ActionResult<Bid>> AddBid([FromBody] Bid bid)
		{
			if (bid == null)
			{
				return BadRequest("Bid object is null.");
			}

			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			// Ensure the associated Admin exists
			var adminExists = await _context.Admins.AnyAsync(a => a.AId == bid.AdminId);
			if (!adminExists)
			{
				return BadRequest("Admin not found.");
			}

			// Add bid to the database
			_context.Bids.Add(bid);
			await _context.SaveChangesAsync();

			return CreatedAtAction(nameof(GetBid), new { id = bid.BidId }, bid);
		}

		// GET: api/Bid/5
		[HttpGet("{id}")]
		public async Task<ActionResult<Bid>> GetBid(int id)
		{
			var bid = await _context.Bids
				.Include(b => b.Car) // Include Car details
				.FirstOrDefaultAsync(b => b.BidId == id);

			if (bid == null)
			{
				return NotFound("Bid not found.");
			}

			return bid;
		}


		// GET: api/Bid/with-cars
		[HttpGet("with-cars")]
		public async Task<ActionResult<IEnumerable<Bid>>> GetAllBidsWithCars()
		{
			var bidsWithCars = await _context.Bids
				.Include(b => b.Car)  // Include Car details in the bid
				.ToListAsync();

			if (bidsWithCars == null || bidsWithCars.Count == 0)
			{
				return NotFound("No bids found.");
			}

			return Ok(bidsWithCars);
		}

		// GET: api/Bid/with-admin
		[HttpGet("with-admin")]
		public async Task<ActionResult<IEnumerable<Bid>>> GetAllBidsWithAdmins()
		{
			return await _context.Bids
				.Include(b => b.Admin)
				.Include(b => b.Car) // Include Car details in the bid
				.ToListAsync();
		}

		// GET: api/Bid/{bidId}/car
		[HttpGet("{bidId}/car")]
		public async Task<ActionResult<Car>> GetCarForBid(int bidId)
		{
			var bid = await _context.Bids
				.Include(b => b.Car)
				.FirstOrDefaultAsync(b => b.BidId == bidId);

			if (bid == null)
			{
				return NotFound("Bid not found.");
			}

			if (bid.Car == null)
			{
				return NotFound("Associated car not found.");
			}

			return bid.Car;
		}

		// GET: api/Bid/car-images
		[HttpGet("car-images")]
		public async Task<ActionResult<IEnumerable<string>>> GetAllCarImagesFromBids()
		{
			// Fetch bids with their associated cars
			var bidsWithCars = await _context.Bids
				.Include(b => b.Car)  // Include Car details in the bid
				.ToListAsync();

			// Select only the image URLs from the cars associated with the bids
			var carImages = bidsWithCars
				.Where(bid => bid.Car != null && !string.IsNullOrEmpty(bid.Car.ImageUrl)) // Ensure Car is not null and ImageUrl is valid
				.Select(bid => bid.Car.ImageUrl) // Select the image URL
				.Distinct() // Get distinct image URLs
				.ToList();

			if (carImages == null || carImages.Count == 0)
			{
				return NotFound("No car images found.");
			}

			return Ok(carImages);
		}

		// GET: api/Bid/car-details
		[HttpGet("car-details")]
		public async Task<ActionResult<IEnumerable<CarInfoDto>>> GetAllCarDetailsFromBids()
		{
			// Fetch bids with their associated cars
			var bidsWithCars = await _context.Bids
				.Include(b => b.Car)  // Include Car details in the bid
				.ToListAsync();

			// Select the car details (ImageUrl, Brand, Model) from the cars associated with the bids
			var carDetails = bidsWithCars
				.Where(bid => bid.Car != null && !string.IsNullOrEmpty(bid.Car.ImageUrl)) // Ensure Car is not null and ImageUrl is valid
				.Select(bid => new CarInfoDto
				{
					ImageUrl = bid.Car.ImageUrl,
					Brand = bid.Car.Brand,
					Model = bid.Car.Model
				})
				.Distinct() // Get distinct car details
				.ToList();

			if (carDetails == null || carDetails.Count == 0)
			{
				return NotFound("No car details found.");
			}

			return Ok(carDetails);
		}


	}
}
