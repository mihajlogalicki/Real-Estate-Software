using AutoMapper;
using CloudinaryDotNet.Actions;
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
        public async Task<ActionResult<List<PhotoDto>>> AddPropertyPhoto(List<IFormFile> files, int propertyId)
        {
            // TODO: Finish user authorization, only authenticated user is able to add photo

            var propertyDb = await _unitOfWork.PropertyRepository.GetPropertyPhotoAsync(propertyId);

            if (propertyDb == null)
            {
                return BadRequest("Property does not exists!");
            }
            var filesResult = new List<PhotoDto>();

            foreach (var file in files)
            {
                var photoResult = await _photoService.UploadPhotoAsync(file);
                if (photoResult.Error != null)
                {
                    return BadRequest(photoResult.Error.Message);
                }

                var photo = new Photo()
                {
                    ImageUrl = photoResult.SecureUrl.AbsoluteUri,
                    PublicId = photoResult.PublicId
                };

                if (propertyDb.Photos.Count == 0)
                {
                    photo.IsPrimary = true;
                }

                propertyDb.Photos.Add(photo);
                filesResult.Add(new PhotoDto { ImageUrl = photo.ImageUrl, PublicId  = photo.PublicId});
            }

            bool isSaved = await _unitOfWork.SaveAsync();
            if (isSaved)
            {
                return filesResult;
            }

            return BadRequest("Problem occured while uploading the photo.");
        }

        [HttpPost("set-primary-photo/{propertyId}/{publicId}")]
        public async Task <IActionResult> SetPrimaryPhoto(int propertyId, string publicId)
        {
            var userId = GetUserId();

            var propertyUpdate = await _unitOfWork.PropertyRepository.GetPropertyDetailAsync(propertyId);
            
            if(propertyUpdate == null)
            {
                return BadRequest("Property does not exists!");
            }

            if(propertyUpdate.PostedBy != userId)
            {
                return BadRequest("You are not authorized to change the photo!");
            }

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

        [HttpDelete("delete-photo/{id}/{publicId}")]
        public async Task<IActionResult> DeletePhoto(int id, string publicId)
        {
            // TODO: Finish user authorization, not allowed for anonymous and different owner of property

            var userId = GetUserId();

            var property = await _unitOfWork.PropertyRepository.GetPropertyDetailAsync(id);
            if(property == null)
            {
                return BadRequest("No such property exists.");
            }

            if(property.PostedBy != userId)
            {
                return BadRequest("You are not authorized to delete photo.");
            }

            var photo = property.Photos.FirstOrDefault(p => p.PublicId == publicId);
            if(photo == null)
            {
                return BadRequest("No such photo exists.");
            }

            if(photo.IsPrimary)
            {
                return BadRequest("You can't delete primary photo.");
            }

            var result = await _photoService.DeletePhotoAsync(photo.PublicId);
            if(result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }

            property.Photos.Remove(photo);

            bool isDeleted = await _unitOfWork.SaveAsync();
            if (isDeleted)
            {
                return Ok();
            }

            return BadRequest("Some error has occured, failed to delete photo.");
        }
    }
}
