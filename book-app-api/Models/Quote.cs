namespace BookAppApi.Models;

public class Quote
{
    public int Id { get; set; }
    public string Text { get; set; }  // Must not be null
    public string Author { get; set; }  // Must not be null
    public int UserId { get; set; }  // FK to User - required
   public User? User { get; set; }

}

