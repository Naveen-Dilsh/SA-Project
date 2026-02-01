using Car_Auction_Backend.Data;
using Car_Auction_Backend.Data.ExtraConfigs;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Car_Auction_Backend.Services;
using System.Net.Mail;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Updated Swagger configuration
builder.Services.AddSwaggerGen(c =>
{
	c.SwaggerDoc("v1", new OpenApiInfo { Title = "Car Auction API", Version = "v1" });

	// Add JWT Authentication in Swagger UI
	c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
	{
		Description = "JWT Authorization header using the Bearer scheme. Enter 'Bearer' [space] and then your token in the text input below.",
		Name = "Authorization",
		In = ParameterLocation.Header,
		Type = SecuritySchemeType.ApiKey,
		Scheme = "Bearer"
	});

	c.AddSecurityRequirement(new OpenApiSecurityRequirement
	{
		{
			new OpenApiSecurityScheme
			{
				Reference = new OpenApiReference
				{
					Type = ReferenceType.SecurityScheme,
					Id = "Bearer"
				}
			},
			new string[] {}
		}
	});
});

// Register services for Dependency Injection
builder.Services.AddScoped<IEmailService, EmailService>(); // Email service
builder.Services.AddScoped<MainAdminService>(); // Service for managing main admins

// Add DbContext with SQL Server Connecting String
builder.Services.AddDbContext<ApplicationDbContext>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure JWT Settings from appsettings.json
builder.Services.Configure<JWTSettings>(builder.Configuration.GetSection("JWTSettings"));
builder.Services.AddScoped<AuthService>(); // Authentication service

builder.Services.AddHostedService<AuctionFinalizationService>();

builder.Services.AddHostedService<HighestBidUpdateService>();

// Configure JWT Authentication
builder.Services.AddAuthentication(options =>
{
	options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
	// Load JWT settings from configuration
	var jwtSettings = builder.Configuration.GetSection("JWTSettings").Get<JWTSettings>();
	options.RequireHttpsMetadata = false; // For local development
	options.SaveToken = true;
	options.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuerSigningKey = true,
		IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings.Secret)),
		ValidateIssuer = false,
		ValidateAudience = false,
		ClockSkew = TimeSpan.Zero // Immediate expiration
	};
});

// CORS configuration - Allow all origins for development
builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAll",
		builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// SMTP Client configuration (for email service)
builder.Services.AddTransient<SmtpClient>((serviceProvider) =>
{
	var smtpSettings = builder.Configuration.GetSection("SmtpSettings");
	return new SmtpClient(smtpSettings["Host"], int.Parse(smtpSettings["Port"] ?? "587"))
	{
		Credentials = new System.Net.NetworkCredential(
			smtpSettings["SenderEmail"],
			smtpSettings["SenderPassword"]
		),
		EnableSsl = bool.TryParse(smtpSettings["EnableSsl"], out bool enableSsl) ? enableSsl : true
	};
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

// Enable HTTPS redirection
app.UseHttpsRedirection();

// Enable CORS
app.UseCors("AllowAll");

// Enable JWT Authentication & Authorization
app.UseAuthentication();
app.UseAuthorization();

// Map Controllers
app.MapControllers();

// Apply migrations automatically on startup
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        context.Database.Migrate();
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while emigrating the database.");
    }
}

app.Run();
