using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Car_Auction_Backend.Models
{
	public class User
	{
		public int UId {  get; set; }

		public string UName { get; set; }

		public string UEmail { get; set; }

		public string UPassword { get; set; }

		public String URole {  get; set; }

		public string? Address { get; set; }

		public string? EmailVerificationToken { get; set; }

		public bool IsEmailVerified { get; set; } = false; // Add email verification status

		// Contact number with validation (only digits allowed)
		[RegularExpression(@"^\d{10,15}$", ErrorMessage = "Contact number must be between 10 and 15 digits and contain only numbers.")]
		public string? C_Number { get; set; }

		//Relationship with Bid_sub M : 1
		[JsonIgnore]
		public virtual ICollection<Bid_Sub>? Bid_subs { get; set; }

		//Relationship with Payment M : 1
		[JsonIgnore]
		public virtual ICollection<Payment>? Payments { get; set; }

		//Relationship with Notification M : 1
		[JsonIgnore]
		public virtual ICollection<Notification>? Notifications { get; set;}
	}
}
