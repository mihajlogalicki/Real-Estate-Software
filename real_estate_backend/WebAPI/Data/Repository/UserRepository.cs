using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.Security.Cryptography;
using System.Text;
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
            var user = await _dataContext.Users.SingleOrDefaultAsync(u => u.Username == username);

            if (user == null || user.PasswordKey == null) return null;

            if(!MatchPasswordHash(password, user.Password, user.PasswordKey))
            {
                return null;
            }

            return user;
        }

        public void Register(string username, string passsword)
        {
            byte[] passwordHash;
            byte[] passwordKey;

            using(var hmac = new HMACSHA512())
            {
                passwordKey = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(passsword));
            }

            User user = new User
            {
                Username = username,
                Password = passwordHash,
                PasswordKey = passwordKey
            };

            _dataContext.Users.Add(user);
        }

        private bool MatchPasswordHash(string passwordText, byte[] password, byte[] PasswordKey)
        {
            using (var hmac = new HMACSHA512(PasswordKey))
            {
                var passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(passwordText));
                
                for(int i = 0; i < passwordHash.Length; i++)
                {
                    if (passwordHash[i] != password[i]) return false;
                }

                return true;
            }
        }

        public async Task<bool> UserAlreadyExistsAsync(string username)
        {
            return await _dataContext.Users.AnyAsync(u => u.Username == username);
        }
    }
}
