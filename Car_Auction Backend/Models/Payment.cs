using System.Text.Json.Serialization;

namespace Car_Auction_Backend.Models
{
	public class Payment
	{
		public int PId { get; set; }

		//Foreign Key
		public int SubmissionId	{ get; set; }

		//Foreign Key
		public int UsersId { get; set; }

		public Decimal PAmount { get; set; }	

		public String PMethod	{ get; set; }

		public String PStatus { get; set; }

		public DateTime PDate { get; set; }

		//Relationship between Bid_sub 1: 1
		[JsonIgnore]
		public virtual Bid_Sub? Bid_Sub { get; set; }

		//Relationship between User 1 : M
		[JsonIgnore]
		public virtual User? User { get; set; }
	}
}
