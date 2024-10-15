using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Car_Auction_Backend.Models
{
	public class Admin
	{

		public int AId { get; set; }

		public string AName { get; set; }

		public string ARole { get; set; }	

		public string APassword { get; set; }

		public string AEmail { get; set; }

		public bool IsMainAdmin { get; set; }

		public string AStatus { get; set; }

		[JsonIgnore]
		public virtual ICollection<Bid>? Bids { get; set; }
		
	}
}
