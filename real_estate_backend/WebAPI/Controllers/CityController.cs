using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Authorize]
    public class CityController : BaseController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _autoMapper;

        public CityController(IUnitOfWork unitOfWork, IMapper autoMapper)
        {
            _unitOfWork = unitOfWork;
            _autoMapper = autoMapper;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetCities()
        {
            var cities = await _unitOfWork.CityRepository.GetCitiesAsync();
            var citiesDto = _autoMapper.Map<IEnumerable<CityDto>>(cities);

            return Ok(citiesDto);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddCity(CityDto cityDto)
        {
            var city = _autoMapper.Map<City>(cityDto);
            city.LastUpdateBy = 1;
            city.LastUpdateOn = DateTime.Now;

            await _unitOfWork.CityRepository.AddCityAsync(city);
            await _unitOfWork.SaveCityAsync();
            return StatusCode(201);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            _unitOfWork.CityRepository.DeleteCity(id);
            await _unitOfWork.SaveCityAsync();
            return StatusCode(201);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityDto cityDto)
        {
            var cityFromDb = await _unitOfWork.CityRepository.FindCityAsync(id);

            if(cityFromDb == null || id != cityDto.Id)
            {
                return BadRequest("Update not allowed!");
            }

            cityFromDb.LastUpdateBy = 1;
            cityFromDb.LastUpdateOn = DateTime.Now;

            _autoMapper.Map(cityDto, cityFromDb);
            await _unitOfWork.SaveCityAsync();
            return StatusCode(201);
        }

    }
}
