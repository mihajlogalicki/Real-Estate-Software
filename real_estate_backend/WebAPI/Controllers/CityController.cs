using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<string> City()
        {
            return new string[] { "Belgrade", "Paris", "Madrid" };
        }

        [HttpGet("{id}")]
        public string City(int id)
        {
            return "Belgrade";
        }
    }
}
