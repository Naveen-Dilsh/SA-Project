using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Car_Auction_Backend.Models
{
	public class Car
	{
		public int CId { get; set; }

		public string Model { get; set; }

		public string Brand { get; set; }

		public int Year { get; set; }

		public string Description { get; set; }

		public string ImageUrl { get; set; }

		public string CStatus { get; set; } = "Unsold";

		[JsonIgnore]
		public virtual Bid? Bid { get; set; }

	}
}
