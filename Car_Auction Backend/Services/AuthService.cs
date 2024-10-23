using Car_Auction_Backend.Data;
using Car_Auction_Backend.Data.ExtraConfigs;
using Car_Auction_Backend.DTOs;
using Car_Auction_Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Car_Auction_Backend.Services
{
	public class AuthService
	{
		private readonly ApplicationDbContext _context;
		private readonly JWTSettings _jwtSettings;
		private readonly IEmailService _emailService;

		public AuthService(ApplicationDbContext context, IOptions<JWTSettings> jwtSettings, IEmailService emailService)
		{
			_context = context;
			_jwtSettings = jwtSettings.Value;
			_emailService = emailService;
		}

		//-------------------------------------------Register-------------------------------------------------------------------------------------------------------------------------------------------------//

		
		public async Task RegisterUser(AuthDto userDto)
		{
			if (_context.users.Any(u => u.UName == userDto.UName) || _context.Admins.Any(a => a.AName == userDto.UName))
			{
				throw new Exception("Username already exists.");
			}

			var hashedPassword = BCrypt.Net.BCrypt.HashPassword(userDto.UPassword);

			if (userDto.URole.ToLower() == "user")
			{
				var user = new User
				{
					UName = userDto.UName,
					UPassword = hashedPassword,
					UEmail = userDto.UEmail,
					URole = "User",
					IsEmailVerified = false,
					EmailVerificationToken = GenerateEmailVerificationToken()
				};
				_context.users.Add(user);
				await _context.SaveChangesAsync();

				await _emailService.SendVerificationEmail(user, user.EmailVerificationToken);
			}

			else if (userDto.URole.ToLower() == "admin")
			{
				var isFirstAdmin = !await _context.Admins.AnyAsync();
				var admin = new Admin
				{
					AName = userDto.UName,
					APassword = hashedPassword,
					AEmail = userDto.UEmail,
					ARole = "Admin",
					IsMainAdmin = isFirstAdmin,
					AStatus = isFirstAdmin ? "Approved" : "Pending",
					Brand = userDto.Brand
				};
				_context.Admins.Add(admin);
				await _context.SaveChangesAsync();

				if (!isFirstAdmin)
				{
					await _emailService.SendAdminRegistrationNotification(admin);
				}
			}
			else
			{
				throw new Exception("Invalid role specified.");
			}
		}



		private string GenerateEmailVerificationToken(int userId)
		{
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new[] { new Claim("id", userId.ToString()) }),
				Expires = DateTime.UtcNow.AddDays(1),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
			};
			var token = tokenHandler.CreateToken(tokenDescriptor);
			return tokenHandler.WriteToken(token);
		}


		private string GenerateEmailVerificationToken()
		{
			return Guid.NewGuid().ToString();
		}


		public async Task<bool> VerifyEmail(string token)
		{
			var user = await _context.users.FirstOrDefaultAsync(u => u.EmailVerificationToken == token);
			if (user == null)
			{
				return false;
			}

			user.IsEmailVerified = true;
		//	user.EmailVerificationToken = null;
			await _context.SaveChangesAsync();
			return true;
		}


		//------------------------------------------login---------------------------------------------------------------------------------------------------------------------------------------------------//

		public async Task<(string accessToken, string refreshToken)> LoginUser(string username, string password)
		{
			var user = await _context.users.FirstOrDefaultAsync(u => u.UName == username);
			if (user != null && BCrypt.Net.BCrypt.Verify(password, user.UPassword))
			{
				if (!user.IsEmailVerified)
				{
					throw new Exception("Please verify your email before logging in.");
				}
				return GenerateTokens(new { Id = user.UId, Name = user.UName, Role = "User" });
			}

			var admin = await _context.Admins.FirstOrDefaultAsync(a => a.AName == username);
			if (admin != null && BCrypt.Net.BCrypt.Verify(password, admin.APassword))
			{
				if (admin.AStatus != "Approved")
				{
					throw new Exception("Your admin account is pending approval.");
				}
				return GenerateTokens(admin);
			}

			throw new Exception("Invalid username or password.");
		}



		//--------------------------------------------------------------------------------------------Token Genarate---------------------------------------------------------------------------//

		// New method to generate both access and refresh tokens
		private (string accessToken, string refreshToken) GenerateTokens(object user)
	{
		var accessToken = GenerateAccessToken(user);
		var refreshToken = GenerateRefreshToken(user);
		return (accessToken, refreshToken);
	}

		// Modified to generate access token
		private string GenerateAccessToken(object user)
		{
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);
			var claims = new List<Claim>();

			if (user is Admin admin)
			{
				claims.Add(new Claim(ClaimTypes.NameIdentifier, admin.AId.ToString()));
				claims.Add(new Claim(ClaimTypes.Name, admin.AName));
				if (admin.IsMainAdmin)
				{
					claims.Add(new Claim(ClaimTypes.Role, "MainAdmin"));
				}
				else
				{
					claims.Add(new Claim(ClaimTypes.Role, "Admin"));
				}
				claims.Add(new Claim("IsMainAdmin", admin.IsMainAdmin.ToString().ToLower()));
				
			}
			else if (user is User regularUser)
			{
				claims.Add(new Claim(ClaimTypes.NameIdentifier, regularUser.UId.ToString()));
				claims.Add(new Claim(ClaimTypes.Name, regularUser.UName));
				claims.Add(new Claim(ClaimTypes.Role, "User"));
			}
			else if (user is { } anonymousUser)
			{
				var properties = anonymousUser.GetType().GetProperties();
				foreach (var prop in properties)
				{
					var value = prop.GetValue(anonymousUser)?.ToString();
					if (!string.IsNullOrEmpty(value))
					{
						claims.Add(new Claim(prop.Name, value));
					}
				}
			}

			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(claims),
				Expires = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpirationMinutes),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
			};
			var token = tokenHandler.CreateToken(tokenDescriptor);
			return tokenHandler.WriteToken(token);
		}

		// New method to generate refresh token
		private string GenerateRefreshToken(object user)
		{
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);
			var claims = new List<Claim>();

			if (user is Admin admin)
			{
				claims.Add(new Claim(ClaimTypes.NameIdentifier, admin.AId.ToString()));
				claims.Add(new Claim(ClaimTypes.Name, admin.AName));
				claims.Add(new Claim(ClaimTypes.Role, admin.IsMainAdmin ? "MainAdmin" : "Admin"));
				claims.Add(new Claim("IsMainAdmin", admin.IsMainAdmin.ToString().ToLower()));
			}
			else if (user is User regularUser)
			{
				claims.Add(new Claim(ClaimTypes.NameIdentifier, regularUser.UId.ToString()));
				claims.Add(new Claim(ClaimTypes.Name, regularUser.UName));
				claims.Add(new Claim(ClaimTypes.Role, "User"));
			}
			else if (user is { } anonymousUser)
			{
				var properties = anonymousUser.GetType().GetProperties();
				foreach (var prop in properties)
				{
					var value = prop.GetValue(anonymousUser)?.ToString();
					if (!string.IsNullOrEmpty(value))
					{
						claims.Add(new Claim(prop.Name.ToLower(), value));
					}
				}
			}

			claims.Add(new Claim("tokenType", "refresh"));

			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(claims),
				Expires = DateTime.UtcNow.AddDays(7),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
			};
			var token = tokenHandler.CreateToken(tokenDescriptor);
			return tokenHandler.WriteToken(token);
		}




		//--------------------------------------------------------------------------------------Error in here--------------------------------------------------------------------------//

		public (string accessToken, string refreshToken) RefreshTokens(string refreshToken)
		{
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);

			try
			{
				var tokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuerSigningKey = true,
					IssuerSigningKey = new SymmetricSecurityKey(key),
					ValidateIssuer = false,
					ValidateAudience = false,
					ValidateLifetime = true,
					ClockSkew = TimeSpan.Zero
				};

				ClaimsPrincipal principal = tokenHandler.ValidateToken(refreshToken, tokenValidationParameters, out SecurityToken validatedToken);

				if (principal.FindFirst("tokenType")?.Value != "refresh")
				{
					throw new SecurityTokenException("Invalid token type");
				}

				var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
				var username = principal.FindFirst(ClaimTypes.Name)?.Value;
				var role = principal.FindFirst(ClaimTypes.Role)?.Value;

				if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(username) || string.IsNullOrEmpty(role))
				{
					throw new SecurityTokenException("Invalid token claims");
				}

				object userInfo;

				if (role.Equals("Admin", StringComparison.OrdinalIgnoreCase) || role.Equals("MainAdmin", StringComparison.OrdinalIgnoreCase))
				{
					var isMainAdmin = principal.FindFirst("IsMainAdmin")?.Value;
					userInfo = new Admin
					{
						AId = int.Parse(userId),
						AName = username,
						ARole = role,
						IsMainAdmin = bool.Parse(isMainAdmin ?? "false")
					};
				}
				else if (role.Equals("User", StringComparison.OrdinalIgnoreCase))
				{
					userInfo = new User
					{
						UId = int.Parse(userId),
						UName = username,
						URole = role
					};
				}
				else
				{
					throw new SecurityTokenException("Invalid user role");
				}

				return GenerateTokens(userInfo);
			}
			catch (Exception ex)
			{
				// Log the exception details
				Console.WriteLine($"Error in RefreshTokens: {ex.Message}");
				throw new SecurityTokenException("Invalid refresh token");
			}
		}


		//---------------------------------------------------------------------Check Main Admin ------------------------------------------------------------------------//

		public bool IsMainAdminToken(string token)
		{
			try
			{
				var tokenHandler = new JwtSecurityTokenHandler();
				var key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);

				var validationParameters = new TokenValidationParameters
				{
					ValidateIssuerSigningKey = true,
					IssuerSigningKey = new SymmetricSecurityKey(key),
					ValidateIssuer = false,
					ValidateAudience = false,
					ValidateLifetime = true,
					ClockSkew = TimeSpan.Zero
				};

				var principal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);

				// Check the role claim
				var roleClaim = principal.FindFirst(ClaimTypes.Role);
				if (roleClaim == null || roleClaim.Value != "Admin")
				{
					return false;
				}

				// Check the IsMainAdmin claim
				var isMainAdminClaim = principal.FindFirst("IsMainAdmin");
				return isMainAdminClaim != null && bool.TryParse(isMainAdminClaim.Value, out bool isMainAdmin) && isMainAdmin;
			}
			catch (Exception ex)
			{
				// Log the exception
				Console.WriteLine($"Error in IsMainAdminToken: {ex.Message}");
				return false;
			}
		}

		

	}
}
