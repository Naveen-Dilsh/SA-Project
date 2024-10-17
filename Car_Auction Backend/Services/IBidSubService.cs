namespace Car_Auction_Backend.Services
{
	public interface IBidSubService
	{
		Task<bool> FinalizeBidAndNotifyWinner(int bidId);
		Task<bool> IsBidFinalized(int bidId);

	}
}
