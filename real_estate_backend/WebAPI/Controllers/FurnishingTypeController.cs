using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class FurnishingTypeController : BaseController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public FurnishingTypeController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;   
            _mapper = mapper;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetFurnishingTypes()
        {
            var furnishingTypes = await _unitOfWork.FurnishingTypeRepository.GetFurnishingTypesAsync();
            var furnishingTypesMapped = _mapper.Map<IEnumerable<KeyValuePairDto>>(furnishingTypes);

            return Ok(furnishingTypesMapped);

        }
    }
}
