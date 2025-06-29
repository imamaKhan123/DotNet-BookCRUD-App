namespace BookAppApi.Models;

public class Quote
{
    public int Id { get; set; }
    public required string Text { get; set; }  // Must not be null
    public required string Author { get; set; }  // Must not be null
    public int UserId { get; set; }  // FK to User - required
   public User? User { get; set; }

}

