using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BookAppApi.Data;
using BookAppApi.Models;

namespace BookAppApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class BooksController : ControllerBase
{
    private readonly AppDbContext _context;

    public BooksController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetBooks()
    {
        return Ok(_context.Books.ToList());
    }
    [HttpGet("{id}")]
public IActionResult GetBookById(int id)
{
    var book = _context.Books.Find(id);
    if (book == null) return NotFound();
    return Ok(book);
}

    [HttpPost]
    public IActionResult AddBook([FromBody] Book book)
    {
        _context.Books.Add(book);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetBookById), new { id = book.Id }, book);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateBook(int id, Book book)
    {
        var existing = _context.Books.Find(id);
        if (existing == null) return NotFound();

        existing.Title = book.Title;
        existing.Author = book.Author;
        existing.PublishDate = book.PublishDate;

        _context.SaveChanges();
        return Ok(existing);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteBook(int id)
    {
        var book = _context.Books.Find(id);
        if (book == null) return NotFound();

        _context.Books.Remove(book);
        _context.SaveChanges();
        return Ok();
    }
}
