using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Interfaces;

namespace WebAPI.Controllers
{
    public class PropertyTypeController : BaseController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _autoMapper;

        public PropertyTypeController(IUnitOfWork unitOfWork, IMapper autoMapper)
        {
            _autoMapper = autoMapper;
            _unitOfWork = unitOfWork; 
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetPropertyTypes()
        {
            var propertyTypes = await _unitOfWork.PropertyTypeRepository.GetPropertyTypesAsync();
            var propertyTypesResult = _autoMapper.Map<IEnumerable<KeyValuePairDto>>(propertyTypes);

            return Ok(propertyTypesResult);
        }
    }
}
