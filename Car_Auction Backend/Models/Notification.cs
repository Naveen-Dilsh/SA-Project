using System.Text.Json.Serialization;

namespace Car_Auction_Backend.Models
{
	public class Notification
	{
		public int NId { get; set; }	

		public int UserssId { get; set; }

		public String NType	{ get; set; }

		public String NMessage	{ get; set; }

		//Relationship Between User  1 : M
		[JsonIgnore]
		public virtual User? User { get; set; }
	}
}
