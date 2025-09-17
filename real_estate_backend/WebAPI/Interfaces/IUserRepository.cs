using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IUserRepository
    {
       Task<User> AuthenticateAsync(string username, string password);
    }
}
