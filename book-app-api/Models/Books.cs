namespace BookAppApi.Models;

public class Book
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Author { get; set; } = "";
    public DateTime PublishDate { get; set; }
}
