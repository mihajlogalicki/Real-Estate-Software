using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Interfaces;

namespace WebAPI.Controllers
{
    [Authorize]
    public class PropertyController : BaseController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _autoMapper;

        public PropertyController(IUnitOfWork unitOfWork, IMapper autoMapper)
        {
            _unitOfWork = unitOfWork;
            _autoMapper = autoMapper;
        }

        [HttpGet("list/{sellRentType}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyList(int sellRentType)
        {
            var properties = await _unitOfWork.PropertyRepository.GetPropertiesAsync(sellRentType);
            var propertiesResult = _autoMapper.Map<IEnumerable<PropertyListDto>>(properties); 
            
            return Ok(propertiesResult);
        }
    }
}
