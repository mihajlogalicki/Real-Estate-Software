using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;

namespace WebAPI.Controllers
{
    [Authorize]
    public class PropertyController : BaseController
    {
        private readonly IUnitOfWork _unitOfWork;

        public PropertyController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("type/{sellRentType}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyList(int sellRentType)
        {
            var properties = await _unitOfWork.PropertyRepository.GetPropertiesAsync(sellRentType);
            return Ok(properties);
        }
    }
}
