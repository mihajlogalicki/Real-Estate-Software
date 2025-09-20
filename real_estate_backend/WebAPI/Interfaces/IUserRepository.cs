using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IUserRepository
    {
       Task<User> AuthenticateAsync(string username, string password);
        void Register(string username, string passsword, string email, string mobile);
        Task<bool> UserAlreadyExistsAsync(string username);
    }
}
