namespace Car_Auction_Backend.Data.ExtraConfigs
{
	public class JWTSettings
	{
		public string Secret { get; set; }

		public int ExpirationMinutes { get; set; }
	}
}
