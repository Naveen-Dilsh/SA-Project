using Car_Auction_Backend.DTOs;
using Car_Auction_Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Car_Auction_Backend.Data;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
	private readonly AuthService _authService;

	public AuthController(AuthService authService)
	{
		_authService = authService;
	}


	//-------------------------------------------------Register-----------------------------------------//

	[HttpPost("register")]
	public async Task<IActionResult> Register([FromBody] AuthDto userDto)
	{
		try
		{
			if (userDto.URole.ToLower() == "admin" && string.IsNullOrEmpty(userDto.Brand))
			{
				return BadRequest(new { Message = "Brand is required for admin registration." });
			}

			await _authService.RegisterUser(userDto);
			if (userDto.URole.ToLower() == "user")
			{
				return Ok(new { Message = "Registration successful! Please check your email to verify your account." });
			}
			else if (userDto.URole.ToLower() == "admin")
			{
				return Ok(new { Message = "Admin registration successful! We will inform you once your account is approved." });
			}
			else
			{
				return BadRequest(new { Message = "Invalid role specified." });
			}
		}
		catch (Exception ex)
		{
			return BadRequest(new { Message = ex.Message });
		}
	}

	//-----------------------------------------------VerifyEmail-------------------------------------------------//

	[HttpGet("verify-email")]
	public async Task<IActionResult> VerifyEmail([FromQuery] string token)
	{
		var result = await _authService.VerifyEmail(token);
		if (result)
		{
			return Ok(new { Message = "Email verified successfully." });
		}
		return BadRequest(new { Message = "Invalid verification token." });
	}

	//--------------------------------------------Login---------------------------------------------------//

	// Modified Login method to handle refresh tokens
	[HttpPost("login")]
	public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
	{
		try
		{
			var (accessToken, refreshToken) = await _authService.LoginUser(loginDto.Username, loginDto.Password);

			// Set the access token in a cookie
			Response.Cookies.Append("jwt", accessToken, new CookieOptions
			{
				HttpOnly = true,
				SameSite = SameSiteMode.Strict,
				Secure = true,
				Expires = DateTimeOffset.UtcNow.AddMinutes(30)
			});

			// Set the refresh token in a separate cookie
			Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
			{
				HttpOnly = true,
				SameSite = SameSiteMode.Strict,
				Secure = true,
				Expires = DateTimeOffset.UtcNow.AddDays(7)
			});

			// Decode the access token to get the claims
			var handler = new JwtSecurityTokenHandler();
			var jsonToken = handler.ReadToken(accessToken) as JwtSecurityToken;

			return Ok(new
			{
				AccessToken = accessToken,
				RefreshToken = refreshToken,
				Message = "Login successful",
				Claims = jsonToken?.Claims.Select(c => new { c.Type, c.Value })
			});
		}
		catch (Exception ex)
		{
			return BadRequest(new { Message = ex.Message });
		}
	}


	//------------------------------------------------------------------------------Get Refresh Token------------------------------------------------------------------------//

	// New endpoint to refresh tokens
	[HttpPost("refresh-token")]
	public IActionResult RefreshToken()
	{
		var refreshToken = Request.Cookies["refreshToken"];
		if (string.IsNullOrEmpty(refreshToken))
		{
			return BadRequest(new { Message = "Refresh token is required" });
		}

		try
		{
			var (newAccessToken, newRefreshToken) = _authService.RefreshTokens(refreshToken);

			// Update the cookies with new tokens
			Response.Cookies.Append("jwt", newAccessToken, new CookieOptions
			{
				HttpOnly = true,
				SameSite = SameSiteMode.Strict,
				Secure = true,
				Expires = DateTimeOffset.UtcNow.AddMinutes(30)
			});

			Response.Cookies.Append("refreshToken", newRefreshToken, new CookieOptions
			{
				HttpOnly = true,
				SameSite = SameSiteMode.Strict,
				Secure = true,
				Expires = DateTimeOffset.UtcNow.AddDays(7)
			});

			return Ok(new { AccessToken = newAccessToken, RefreshToken = newRefreshToken, Message = "Tokens refreshed successfully" });
		}
		catch (SecurityTokenException ex)
		{
			return Unauthorized(new { Message = ex.Message });
		}
	}



	//-----------------------------------------------------------------------------------------------Get Refresh token Acording to the Other refresh token---------------------------------------------------------//

	[HttpPost("refresh-tokenss")]
	public IActionResult RefreshTokenNEW([FromBody] RefreshTokenRequest refreshRequest)
	{
		if (string.IsNullOrEmpty(refreshRequest.RefreshToken))
		{
			return BadRequest(new { Message = "Refresh token is required" });
		}

		try
		{
			var (newAccessToken, newRefreshToken) = _authService.RefreshTokens(refreshRequest.RefreshToken);

			// Decode the access token to get the claims
			var handler = new JwtSecurityTokenHandler();
			var jsonToken = handler.ReadToken(newAccessToken) as JwtSecurityToken;

			return Ok(new
			{
				AccessToken = newAccessToken,
				RefreshToken = newRefreshToken,
				Message = "Tokens refreshed successfully",
				Claims = jsonToken?.Claims.Select(c => new { c.Type, c.Value })
			});
		}
		catch (SecurityTokenException ex)
		{
			return Unauthorized(new { Message = ex.Message });
		}
	}
	



	//--------------------------------------------------------------Check Main admin -----------------------------------------------------------------//

	[HttpPost("check-main-admin")]
	public IActionResult CheckMainAdmin([FromBody] TokenDto tokenDto)
	{
		try
		{
			var handler = new JwtSecurityTokenHandler();
			var jsonToken = handler.ReadToken(tokenDto.Token) as JwtSecurityToken;

			if (jsonToken == null)
			{
				return BadRequest(new { Message = "Invalid token" });
			}

			var roleClaim = jsonToken.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Role) ??
							jsonToken.Claims.FirstOrDefault(claim => claim.Type == "role");
			var isMainAdminClaim = jsonToken.Claims.FirstOrDefault(claim => claim.Type == "IsMainAdmin");
			var nameClaim = jsonToken.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Name) ??
							jsonToken.Claims.FirstOrDefault(claim => claim.Type == "unique_name");

			var isMainAdmin = isMainAdminClaim != null &&
							  bool.TryParse(isMainAdminClaim.Value, out bool parsedIsMainAdmin) &&
							  parsedIsMainAdmin;

			return Ok(new
			{
				isMainAdmin = isMainAdmin,
				role = roleClaim?.Value,
				adminName = nameClaim?.Value,
				isMainAdminClaim = isMainAdminClaim?.Value,
				allClaims = jsonToken.Claims.Select(c => new { c.Type, c.Value })
			});
		}
		catch (Exception ex)
		{
			return BadRequest(new { Message = ex.Message });
		}
	}

	//----------------------------------------------------------------Chech Admins----------------------------------------------------------------------//

	[HttpPost("check-admin")]
	public IActionResult CheckAdmin([FromBody] TokenDto tokenDto)
	{
		try
		{
			var handler = new JwtSecurityTokenHandler();
			var jsonToken = handler.ReadToken(tokenDto.Token) as JwtSecurityToken;

			if (jsonToken == null)
			{
				return BadRequest(new { Message = "Invalid token" });
			}

			var roleClaim = jsonToken.Claims.FirstOrDefault(claim => claim.Type.ToLower() == "role");
			var isMainAdminClaim = jsonToken.Claims.FirstOrDefault(claim => claim.Type == "IsMainAdmin");
			var nameClaim = jsonToken.Claims.FirstOrDefault(claim => claim.Type == "unique_name");

			var isAdmin = roleClaim?.Value.ToLower() == "admin";

			return Ok(new
			{
				isAdmin = isAdmin,
				role = roleClaim?.Value,
				adminName = isAdmin ? nameClaim?.Value : null,
				allClaims = jsonToken.Claims.Select(c => new { c.Type, c.Value }),
				tokenHeader = jsonToken.Header,
				tokenPayload = jsonToken.Payload
			});
		}
		catch (Exception ex)
		{
			return BadRequest(new { Message = ex.Message, StackTrace = ex.StackTrace });
		}
	}


}
