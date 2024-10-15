using System.ComponentModel.DataAnnotations;

namespace Car_Auction_Backend.DTOs
{
	public class AdminDto
	{
		[Required]
		public string AName { get; set; }

		[Required]
		public string APassword { get; set; }
	}
}
