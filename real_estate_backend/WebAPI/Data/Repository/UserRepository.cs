using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _dataContext;
        public UserRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<User> AuthenticateAsync(string username, string password)
        {
            return await _dataContext.Users.SingleOrDefaultAsync(u => u.Username == username && u.Password == password); 
        }
    }
}
