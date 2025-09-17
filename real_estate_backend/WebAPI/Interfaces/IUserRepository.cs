using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IUserRepository
    {
       Task<User> AuthenticateAsync(string username, string password);
        void Register(string username, string passsword);
        Task<bool> UserAlreadyExistsAsync(string username);
    }
}
