using WebAPI.Models;

namespace WebAPI.Data.Repository
{
    public interface ICityRepository
    {
        Task<IEnumerable<City>> GetCitiesAsync();
        Task AddCityAsync(City city);
        void DeleteCity(int id);
        Task<bool> SaveCityChangesAsync();
    }
}
