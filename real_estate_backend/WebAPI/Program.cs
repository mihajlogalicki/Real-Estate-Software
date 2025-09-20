using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebAPI.Data;
using WebAPI.Helpers;
using WebAPI.Interfaces;
using WebAPI.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// Secrets
var myAllowedOrigin = builder.Configuration.GetSection("AppSettings:ResourceAccessKey").Value;
var angularLocalUrl = builder.Configuration.GetSection("AppSettings:ClientURL").Value;
var secretKey = builder.Configuration.GetSection("AppSettings:SecretKey").Value;

// Add services to the DI container.
builder.Services.AddDbContext<DataContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("LocalDatabase")));
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowedOrigin,
        policy =>
        {
            policy.WithOrigins(angularLocalUrl)
                  .WithMethods("GET", "POST", "PUT", "DELETE")
                  .AllowAnyHeader();
        });
});
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// JWT Authentication service
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        IssuerSigningKey = key
                    };
                });

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionHandlerMiddleware>();

app.UseCors(myAllowedOrigin);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
