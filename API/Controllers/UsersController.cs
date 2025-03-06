using System;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")] //a felhasználó így éri el: localhost:5001/api/users, automatikusan az osztálynév Controller előtti részét használja a környezet
public class UsersController(DataContext context) : ControllerBase //ez is egy primary constructor
{
    //nem lehet kettő ugyanolyan, pl. ket HttpGet - paraméter megkülönbözteti
    //asynccá csináljuk, így már egy Taskot kapunk vissza ami tartalmazza a lényeget
    //db queryknél async-ot szokás használni!
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers() 
    {
        var users = await context.Users.ToListAsync();

        return users;
    }

    [HttpGet("{id:int}")] //pl. /api/users/3
    public async Task<ActionResult<AppUser>> GetUser(int id) 
    {
        var user = await context.Users.FindAsync(id); //find null-t ad vissza, hogyha nincs megfelelő id-jű

        if(user==null)
        {
            return NotFound();
        }
        return user;
    }
}
