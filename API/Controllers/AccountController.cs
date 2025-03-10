using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context, ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")] // account/register
    public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO) 
    //api controllernek tudnia kell hogy honnan jött a két paraméter, pl. bodyból, queryből? - ezt egyszerűsíti a DTO
    {
        if(await UserExists(registerDTO.Username))
        {
            return BadRequest("Username is taken");
        }

        using var hmac = new HMACSHA512(); //ha nem használnánk using-ot garbage collector kidobná

        var user = new AppUser{
            UserName = registerDTO.Username.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
            PasswordSalt = hmac.Key
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return new UserDTO
        {
            Username = user.UserName,
            Token = tokenService.CreateToken(user)
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO) 
    {
        var user = await context.Users.FirstOrDefaultAsync( x => 
        x.UserName == loginDTO.Username.ToLower());
        
         //ugye csak lowerként tároljuk el, felesleges csekkolni case-re, DE lehet null mert First... azt ad vissza ha nincs

        if(user==null)
        {
            return Unauthorized("Invalid username");
        }

        using var hmac = new HMACSHA512(user.PasswordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if(computedHash[i] != user.PasswordHash[i])
            {
                return Unauthorized("Invalid password");
            }
        }
        return new UserDTO
        {
            Username = user.UserName,
            Token = tokenService.CreateToken(user)
        };

    }

    //csekkolni akarjuk hogy ne legyen kettő ugyanolyan username
    private async Task<bool> UserExists(string username)
    {
        return await context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower()); //tolower -> legegyszerűbb megoldás
    }


}
