using Microsoft.EntityFrameworkCore;
using WebAPI.Data;

var builder = WebApplication.CreateBuilder(args);

var myAllowedOrigin = "_myAllowedResourceShareOrigin";

// Add services to the container.

builder.Services.AddDbContext<DataContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("SQLExpressConnection"))
);

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowedOrigin,
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .WithMethods("GET", "POST", "PUT");
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors(myAllowedOrigin);

app.UseAuthorization();

app.MapControllers();

app.Run();
