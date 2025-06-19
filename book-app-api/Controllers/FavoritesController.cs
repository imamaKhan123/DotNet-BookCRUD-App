using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using BookAppApi.Data;
using BookAppApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BookAppApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class FavoritesController : ControllerBase
{
    private readonly AppDbContext _context;

    public FavoritesController(AppDbContext context)
    {
        _context = context;
    }

    // Helper to get current logged-in user id from JWT claims
    private int GetUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userIdClaim == null)
            throw new Exception("User Id claim not found");
        return int.Parse(userIdClaim);
    }

   [HttpGet]
public IActionResult GetFavorites()
{
    var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

    var favorites = _context.Favorites
        .Where(f => f.UserId == userId)
        .Include(f => f.Book)  // include book details
        .ToList();

    return Ok(favorites);
}


    // POST: api/favorites
    [HttpPost]
    public async Task<IActionResult> AddFavorite([FromBody] Favorite favorite)
    {
        var userId = GetUserId();

        // Check if already added
        var exists = await _context.Favorites.AnyAsync(f => f.UserId == userId && f.BookId == favorite.BookId);
        if (exists)
            return BadRequest(new { message = "Book is already in favorites." });

        favorite.UserId = userId;
        _context.Favorites.Add(favorite);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetFavorites), new { id = favorite.Id }, favorite);
    }

    // DELETE: api/favorites/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFavorite(int id)
    {
        var userId = GetUserId();

        var favorite = await _context.Favorites.FindAsync(id);

        if (favorite == null || favorite.UserId != userId)
            return NotFound();

        _context.Favorites.Remove(favorite);
        await _context.SaveChangesAsync();

        return Ok();
    }
}
