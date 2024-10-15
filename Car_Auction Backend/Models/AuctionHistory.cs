using System.Text.Json.Serialization;

namespace Car_Auction_Backend.Models
{
	public class AuctionHistory
	{
		public int HId { get; set; }	

		//Foreign Key
		public int Submissions_Id { get; set; }

		public DateTime EndTime { get; set; }

		public Decimal FinalBidAmount { get; set; }

		//Relationship between Bid_sub 1 : 1
		[JsonIgnore]
		public virtual Bid_Sub Bid_Sub { get; set; }
	}
}
