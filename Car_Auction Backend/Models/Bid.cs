using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Car_Auction_Backend.Models
{
	public class Bid
	{

		public int BidId { get; set; }

		//Foreign Key
		public int AdminId { get; set; }

		//Foreign Key
		public int CarId{ get; set; }

		public decimal OpeningBid { get; set; }

		public DateTime StartTime { get; set; }

		public DateTime EndTime { get; set; }

		[JsonIgnore]
		public virtual Admin? Admin { get; set; }

		[JsonIgnore]
		public virtual Car? Car { get; set; }

		//Relationship with Bid_sub
		[JsonIgnore]
		public virtual ICollection<Bid_Sub>? Bid_Subs { get; set; }
	}

}
