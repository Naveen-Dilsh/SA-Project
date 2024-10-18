using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json.Nodes;

namespace Car_Auction_Backend.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CheckOutController : ControllerBase
	{
		private readonly string PaypalClientId;
		private readonly string PaypalSecret;
		private readonly string PaypalUrl;

		public CheckOutController(IConfiguration configuration)
		{
			PaypalClientId = configuration["PaypalSettings:ClientId"]!;
			PaypalSecret = configuration["PaypalSettings:Secret"]!;
			PaypalUrl = configuration["PaypalSettings:Url"]!;
		}

		// Method to get the PayPal access token
		[HttpGet("GetPaypalAccessToken")]
		public async Task<string> GetPaypalAccessToken()
		{
			string accessToken = "";
			string url = PaypalUrl + "/v1/oauth2/token";

			using (var client = new HttpClient())
			{
				string credentials64 =
					Convert.ToBase64String(Encoding.UTF8.GetBytes(PaypalClientId + ":" + PaypalSecret));

				client.DefaultRequestHeaders.Add("Authorization", "Basic " + credentials64);

				var requestMessage = new HttpRequestMessage(HttpMethod.Post, url);
				requestMessage.Content = new StringContent("grant_type=client_credentials", Encoding.UTF8, "application/x-www-form-urlencoded");

				var httpResponse = await client.SendAsync(requestMessage);

				if (httpResponse.IsSuccessStatusCode)
				{
					var strResponse = await httpResponse.Content.ReadAsStringAsync();

					var jsonResponse = JsonNode.Parse(strResponse);
					if (jsonResponse != null)
					{
						accessToken = jsonResponse["access_token"]?.ToString() ?? "";
					}
				}
			}

			return accessToken;
		}


		[HttpPost("CreateOrder")]
		public async Task<JsonResult> CreateOrder([FromBody] JsonObject data)
		{
			var totalAmount = data?["amount"]?.ToString(); // Corrected key here
			if (totalAmount == null)
			{
				return new JsonResult(new { Id = "" });
			}

			// Create the request body
			JsonObject createOrderRequest = new JsonObject();
			createOrderRequest.Add("intent", "CAPTURE");

			JsonObject amount = new JsonObject();
			amount.Add("currency_code", "USD");
			amount.Add("value", totalAmount);

			JsonObject purchaseUnit1 = new JsonObject();
			purchaseUnit1.Add("amount", amount);

			JsonArray purchaseUnits = new JsonArray();
			purchaseUnits.Add(purchaseUnit1); // Corrected: Adding purchaseUnit1 to purchaseUnits

			createOrderRequest.Add("purchase_units", purchaseUnits);

			// Get access token
			string accessToken = await GetPaypalAccessToken();

			// Send request
			string url = PaypalUrl + "/v2/checkout/orders";

			using (var client = new HttpClient())
			{

				client.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken); // Add space after "Bearer"


				var requestMessage = new HttpRequestMessage(HttpMethod.Post, url);
				requestMessage.Content = new StringContent(createOrderRequest.ToString(), Encoding.UTF8, "application/json"); // Corrected null to Encoding.UTF8

				var httpResponse = await client.SendAsync(requestMessage);

				if (httpResponse.IsSuccessStatusCode)
				{
					var strResponse = await httpResponse.Content.ReadAsStringAsync();
					var jsonResponse = JsonNode.Parse(strResponse);

					if (jsonResponse != null)
					{
						string paypalOrderId = jsonResponse["id"]?.ToString() ?? "";

						return new JsonResult(new { Id = paypalOrderId });
					}
				}
			}

			return new JsonResult(new { Id = "" });
		}

		[HttpPost("CompleteOrder")]
		public async Task <JsonResult> CompleteOrder([FromBody] JsonObject data)
		{
			var orderId = data?["orderID"]?.ToString();
			if(orderId == null)
			{
				return new JsonResult("error");
			}

			//get access token
			string accessToken = await GetPaypalAccessToken();

			string url = PaypalUrl + "/v2/checkout/orders/" + orderId + "/capture";

			using (var client = new HttpClient())
			{
				client.DefaultRequestHeaders.Add("Authorization", "Bearer " + accessToken);

				var requestMessage = new HttpRequestMessage(HttpMethod.Post, url);
				requestMessage.Content = new StringContent("", null, "application/json");

				var httpResponse = await client.SendAsync(requestMessage);


				if (httpResponse.IsSuccessStatusCode)
				{
					var strResponse = await httpResponse.Content.ReadAsStringAsync();
					var jsonResponse = JsonNode.Parse(strResponse);

					if (jsonResponse != null)
					{
						string paypalOrderStatus = jsonResponse["status"]?.ToString() ?? "";

						if (paypalOrderStatus == "COMPLETED")
						{
							//save the order in database
							return new JsonResult("success");

						}
					}
				}

			}


			return new JsonResult("error");
		}
	}
}
