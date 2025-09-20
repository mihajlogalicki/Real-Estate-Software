using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IUnitOfWork _unitOfWork;
        private IConfiguration _config;
        public AccountController(IUnitOfWork unitOfWork,IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _config = config;
        }

        [HttpPost("sign-in")]
        public async Task<IActionResult> SignInAsync(LoginRequestDto loginRequestDto)
        {
            var user = await _unitOfWork.UserRepository.AuthenticateAsync(loginRequestDto.Username, loginRequestDto.Password);
            if(user == null)
            {
                return Unauthorized("Invalid User ID or Password");
            }

            var loginResponse = new LoginResponseDto
            {
                Username = user.Username,
                Token = GenerateJWT(user)
            };

            return Ok(loginResponse);
        }

        [HttpPost("sign-up")]
        public async Task<IActionResult> SignUpAsync(RegisterRequestDto registerRequestDto)
        {
            bool isUserAlreadyExists = await _unitOfWork.UserRepository.UserAlreadyExistsAsync(registerRequestDto.Username);
            if (isUserAlreadyExists)
            {
                return BadRequest("User already exists");
            }

            _unitOfWork.UserRepository.Register(
                registerRequestDto.Username,
                registerRequestDto.Password,
                registerRequestDto.Email,
                registerRequestDto.Mobile
               );

            await _unitOfWork.SaveAsync();
            return StatusCode(201);
        }

        private string GenerateJWT(User user)
        {
            var secrectKey = _config.GetSection("AppSettings:secretKey").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secrectKey));

            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var signinCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = signinCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
