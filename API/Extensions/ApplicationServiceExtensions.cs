using System;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services,
    IConfiguration config)
    {
        // Add services to the container.
        services.AddControllers();
        //ehhez majd dependency injectiont fogunk használni, buildelés során ez meghívja a db konstruktorát
        services.AddDbContext<DataContext>(opt =>
        {
            opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
        });
        services.AddCors();
        //Token service hozzáadása, mivel nincs beépített, mi határozzuk meg hogy meddig éljen a service
        //addscoped - minden http requestnél egyszer létrejön, pl. login
        services.AddScoped<ITokenService, TokenService>(); //interface, osztály ami megvalósít

        return services;
    }
}
