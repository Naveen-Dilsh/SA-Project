namespace Car_Auction_Backend.DTOs
{
	public class BidDto
	{
		public int BidId { get; set; }
		public decimal OpeningBid { get; set; }
		public string ImageUrl { get; set; }
		public string Brand { get; set; }
		public string Model { get; set; }
		public DateTime StartTime { get; set; }
		public DateTime EndTime { get; set; }
		public string Description { get; set; }
	}
}
