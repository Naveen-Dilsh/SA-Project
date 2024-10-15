using Car_Auction_Backend.Data;
using Car_Auction_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Car_Auction_Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PaymentController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public PaymentController(ApplicationDbContext context)
		{
			_context = context;
		}

		// POST: api/Admin
		[HttpPost]
		public async Task<ActionResult<Payment>> PostPayment(Payment payment)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			// IsMainAdmin and AStatus will use the default values set in AdminConfig
			// if not explicitly provided in the request

			_context.Payments.Add(payment);
			await _context.SaveChangesAsync();

			return (payment);
		}
	}
}
