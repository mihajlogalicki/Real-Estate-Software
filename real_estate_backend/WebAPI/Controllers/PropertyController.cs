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
        private readonly IPhotoInterface _photoService;

        public PropertyController(IUnitOfWork unitOfWork, IMapper autoMapper, IPhotoInterface photoService)
        {
            _unitOfWork = unitOfWork;
            _autoMapper = autoMapper;
            _photoService = photoService;
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
        public async Task<IActionResult> AddProperty(PropertyAddDto propertyAddDto)
        {
            var property = _autoMapper.Map<Property>(propertyAddDto);
            var userId = GetUserId();
            property.PostedBy = userId;
            property.LastUpdatedBy = userId;

            await _unitOfWork.PropertyRepository.AddPropertyAsync(property);
            await _unitOfWork.SaveAsync();

            return StatusCode(201);
        }

        [HttpPost("add/photo/{propertyId}")]
        [AllowAnonymous]
        public async Task<IActionResult> AddPropertyPhoto(IFormFile photo, int propertyId)
        {
            var uploadResult = await _photoService.UploadPhotoAsync(photo);
            if (uploadResult.Error != null)
            {
                return BadRequest(uploadResult.Error.Message);
            }

            var propertyDb = await _unitOfWork.PropertyRepository.GetPropertyPhotoAsync(propertyId);

            if(propertyDb == null)
            {
                return BadRequest("Property does not exists!");
            }

            var file = new Photo()
            {
                ImageUrl = uploadResult.SecureUrl.AbsoluteUri,
                PublicId = uploadResult.PublicId
            };

            if(propertyDb.Photos.Count == 0)
            {
                file.IsPrimary = true;
            }

            propertyDb.Photos.Add(file);
            await _unitOfWork.SaveAsync();

            return StatusCode(201);
        }

        [HttpPost("set-primary-photo/{propertyId}/{publicId}")]
        [AllowAnonymous]
        public async Task <IActionResult> SetPrimaryPhoto(int propertyId, string publicId)
        {
            var userId = GetUserId();

            var propertyUpdate = await _unitOfWork.PropertyRepository.GetPropertyDetailAsync(propertyId);
            
            if(propertyUpdate == null)
            {
                return BadRequest("Property does not exists!");
            }

            //if(propertyUpdate.PostedBy != userId)
            //{
            //    return BadRequest("You are not authorized to change the photo!");
            // }

            var file = propertyUpdate.Photos.FirstOrDefault(p => p.PublicId == publicId);   
            if(file == null)
            {
                return BadRequest("Photo does not exists, error occured!");
            }

            if(file.IsPrimary)
            {
                return BadRequest("This is already primary photo!");
            }

            var currentPrimary = propertyUpdate.Photos.FirstOrDefault(p => p.IsPrimary);
            if (currentPrimary != null) currentPrimary.IsPrimary = false;

            file.IsPrimary = true;

            bool isSavedAsync = await _unitOfWork.SaveAsync();
            if (isSavedAsync)
            {
                return NoContent();
            }

            return BadRequest("Failed to set primary photo!");
        }
    }
}
