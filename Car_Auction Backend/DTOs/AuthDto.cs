using System.ComponentModel.DataAnnotations;

namespace Car_Auction_Backend.DTOs
{
	public class AuthDto
	{
		[Required]
		public string UName {  get; set; }

		[Required]
		public string UEmail { get; set; }

		[Required]
		public string UPassword { get; set; }

		public string URole { get; set; } // Role selected from frontend

		public string Brand {  get; set; }
	}

}
