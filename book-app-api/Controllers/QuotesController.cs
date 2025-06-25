using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using BookAppApi.Data;
using BookAppApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BookAppApi.Controllers;


[ApiController]
[Route("api/[controller]")]
public class QuotesController : ControllerBase
{
    private readonly AppDbContext _context;

    public QuotesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Quote>>> GetQuotes()
    {
        return await _context.Quotes.ToListAsync();
    }
    
   [HttpGet("{id}")]
public IActionResult GetQuoteById(int id)
{
    var quote = _context.Quotes.Find(id);
    if (quote == null) return NotFound();
    return Ok(quote);
}

[HttpPost]
public async Task<ActionResult<Quote>> AddQuote(Quote quote)
{
    var userId = GetUserId();
    if (userId == 0)
        return Unauthorized();

    quote.UserId = userId;

    _context.Quotes.Add(quote);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetQuotes), new { id = quote.Id }, quote);
}
private int GetUserId()
{
    var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    if (userIdClaim == null)
        return 0;

    return int.TryParse(userIdClaim, out var userId) ? userId : 0;
}


    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateQuote(int id, Quote updatedQuote)
    {
        var quote = await _context.Quotes.FindAsync(id);
        if (quote == null) return NotFound();

        quote.Text = updatedQuote.Text;
        quote.Author = updatedQuote.Author;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteQuote(int id)
    {
        var quote = await _context.Quotes.FindAsync(id);
        if (quote == null) return NotFound();

        _context.Quotes.Remove(quote);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
