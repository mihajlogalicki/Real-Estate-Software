using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface ICityRepository
    {
        Task<IEnumerable<City>> GetCitiesAsync();
        Task AddCityAsync(City city);
        void DeleteCity(int id);
        Task<City> FindCityAsync(int id);
    }
}
