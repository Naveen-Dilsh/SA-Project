using System.ComponentModel.DataAnnotations;

namespace Car_Auction_Backend.DTOs
{
	public class LoginDto
	{
		[Required]
		public string Username { get; set; }

		[Required]
		public string Password { get; set; }
	}
}
