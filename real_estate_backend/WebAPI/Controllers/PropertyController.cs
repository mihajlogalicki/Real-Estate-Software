using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Models;

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

        [HttpGet("detail/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPropertyById(int id)
        {
            var property = await _unitOfWork.PropertyRepository.GetPropertyDetailAsync(id);
            var propertyMapped = _autoMapper.Map<PropertyDetailDto>(property);

            return Ok(propertyMapped);
        }

        [HttpPost("add")]
        [AllowAnonymous]
        public async Task<IActionResult> AddProperty(PropertyAddDto propertyAddDto)
        {
            var property = _autoMapper.Map<Property>(propertyAddDto);
            property.PostedBy = 1;
            property.LastUpdatedBy = 1;

            await _unitOfWork.PropertyRepository.AddPropertyAsync(property);
            await _unitOfWork.SaveAsync();

            return StatusCode(201);
        }
    }
}
