using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BookAppApi.Data;
using BookAppApi.Models;
using Microsoft.EntityFrameworkCore;


namespace BookAppApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public AuthController(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }
[HttpPost("login")]
public async Task<IActionResult> Login([FromBody] LoginRequest login)
{
    Console.WriteLine($"Login model: {login.Email}");

    var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == login.Email && u.Password == login.Password);
    if (user == null)
        return Unauthorized(new { message = "Invalid email or password" });

    // Generate JWT token
    var tokenHandler = new JwtSecurityTokenHandler();
    var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"] ?? throw new InvalidOperationException("JWT key is missing."));

    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
        }),
        Expires = DateTime.UtcNow.AddHours(24),
        Issuer = _config["Jwt:Issuer"],
        Audience = _config["Jwt:Audience"],
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
    };

    var token = tokenHandler.CreateToken(tokenDescriptor);
    var tokenString = tokenHandler.WriteToken(token);

    return Ok(new
    {
        token = tokenString,
        message = "Login successful"
    });
}





[HttpPost("register")]
public async Task<IActionResult> Register([FromBody] User user)
{
    if (user == null)
        return BadRequest("User data is missing.");

    if (string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.Password))
        return BadRequest("Email or password cannot be empty.");

    // Async check for existing email
    if (await _context.Users.AnyAsync(u => u.Email == user.Email))
    {
        return BadRequest(new { message = "Email already exists." });
    }

    _context.Users.Add(user);
    await _context.SaveChangesAsync();

    Console.WriteLine("User Registered: " + user.Name);

    return Ok(new
    {
        message = "User registered successfully",
        user
    });
}



    [HttpGet("users")]
public IActionResult GetUsers()
{
    var users = _context.Users.ToList();
    return Ok(users);
}
}
