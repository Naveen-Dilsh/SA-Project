using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Car_Auction_Backend.Models;
using Car_Auction_Backend.Data;

[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
	private readonly ApplicationDbContext _context;

	public PaymentController(ApplicationDbContext context)
	{
		_context = context;
	}

	[HttpPost("{bidId}/{userId}/AddPayment")]
	public async Task<IActionResult> AddPayment(int bidId, int userId)
	{
		try
		{
			// Find the winning bid submission for this auction
			var winningBidSub = await _context.Bid_subs
				.FirstOrDefaultAsync(bs =>
					bs.BidID == bidId &&
					bs.BSStatus == "Sold");

			if (winningBidSub == null)
			{
				return NotFound("No closed bid submission found for this auction");
			}

			// Verify that the user making the payment is the winning bidder
			if (winningBidSub.UserId != userId)
			{
				return BadRequest("Only the winning bidder can make the payment");
			}

			// Check if payment already exists
			var existingPayment = await _context.Payments
				.FirstOrDefaultAsync(p => p.SubmissionId == winningBidSub.SubId);

			if (existingPayment != null)
			{
				return BadRequest("Payment already exists for this bid");
			}

			// Create new payment
			var payment = new Payment
			{
				SubmissionId = winningBidSub.SubId,
				UsersId = userId,
				PAmount = winningBidSub.Amount,
				PMethod = "PayPal",
				PStatus = "Pending",
				PDate = DateTime.UtcNow
			};

			// Add payment to database
			_context.Payments.Add(payment);
			await _context.SaveChangesAsync();

			// Return the created payment details
			return Ok(new
			{
				PaymentId = payment.PId,
				Amount = payment.PAmount,
				Status = payment.PStatus,
				Message = "Payment created successfully"
			});
		}
		catch (Exception ex)
		{
			return StatusCode(500, new { Message = "An error occurred while processing the payment", Error = ex.Message });
		}
	}

		[HttpGet("amount/{bidId}")]
		public async Task<IActionResult> GetPaymentAmountForBid(int bidId)
		{
			try
			{
				// Find the winning bid submission for this auction
				var winningBidSub = await _context.Bid_subs
					.FirstOrDefaultAsync(bs =>
						bs.BidID == bidId &&
						bs.BSStatus == "Sold");

				if (winningBidSub == null)
				{
					return NotFound("No closed bid submission found for this auction");
				}

				// Find the payment associated with the winning bid submission
				var payment = await _context.Payments
					.FirstOrDefaultAsync(p => p.SubmissionId == winningBidSub.SubId);

				if (payment == null)
				{
					return NotFound("No payment found for this bid");
				}

				// Return the payment amount
				return Ok(new
				{
					BidId = bidId,
					PaymentAmount = payment.PAmount
				});
			}
			catch (Exception ex)
			{
				return StatusCode(500, new { Message = "An error occurred while retrieving the payment amount", Error = ex.Message });
			}
		}
	}
