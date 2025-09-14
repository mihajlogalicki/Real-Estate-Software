using Microsoft.AspNetCore.Mvc;
using WebAPI.Data.Repository;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly ICityRepository _cityRepository;

        public CityController(ICityRepository cityRepository)
        {
            _cityRepository = cityRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            var cities = await _cityRepository.GetCitiesAsync();
            return Ok(cities);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddCity(City city)
        {
            await _cityRepository.AddCityAsync(city);
            await _cityRepository.SaveCityChangesAsync();
            return StatusCode(201);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            _cityRepository.DeleteCity(id);
            await _cityRepository.SaveCityChangesAsync();
            return StatusCode(201);
        }
    }
}
