using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Helpers;
using WebAPI.Interfaces;

var builder = WebApplication.CreateBuilder(args);

var myAllowedOrigin = "_myAllowedResourceShareOrigin";

// Add services to the container.

builder.Services.AddDbContext<DataContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("SQLExpressConnection")));
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowedOrigin,
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .WithMethods("GET", "POST", "PUT", "DELETE");
        });
});
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
// Add single instance of UoF for each request -> scope lifetime
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();


var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(myAllowedOrigin);

app.UseAuthorization();

app.MapControllers();

app.Run();
