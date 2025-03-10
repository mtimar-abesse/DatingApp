using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplicationServices(builder.Configuration); //kattints bele
builder.Services.AddIdentityServices(builder.Configuration); //kattints bele


var app = builder.Build();

//Configure the HTTP request pipeline.
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200", "https://localhost:4200" ));
//EZ middleware-nek számít, a lényege a CORS hiba kijavítása, security cucc

//SORREND!!!!
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
