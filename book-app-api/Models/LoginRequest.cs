
using System.Text.Json.Serialization;

namespace BookAppApi.Models
{
public class LoginRequest
{
    [JsonPropertyName("email")]
    public string Email { get; set; } = null!;

    [JsonPropertyName("password")]
    public string Password { get; set; } = null!;
}
}