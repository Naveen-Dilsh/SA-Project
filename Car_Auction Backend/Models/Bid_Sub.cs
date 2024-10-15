using System.Text.Json.Serialization;

namespace Car_Auction_Backend.Models
{
	public class Bid_Sub
	{
		public int SubId { get; set; }

		//Foreign Key
		public int BidID { get; set; }

		//Foreign Key
		public int UserId { get; set; }

		public Decimal Amount { get; set; }

		public Decimal ReservationPrice {  get; set; }

		public String BStatus { get; set; }

		//Relationship between User 1 : M
		[JsonIgnore]
		public virtual User? User { get; set; }

		//Relationship between Bid 1 : M
		[JsonIgnore]
		public virtual Bid? Bid { get; set; }

		//Relationship between Payment 1 : 1
		[JsonIgnore]
		public virtual Payment? Payment { get; set; }

		//Relationship between AuctionHistory 1 : 1
		[JsonIgnore]
		public virtual AuctionHistory AuctionHistory { get; set; }
	}
}
