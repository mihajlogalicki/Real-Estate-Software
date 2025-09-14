using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Data.Repository
{
    public class CityRepository : ICityRepository
    {
        private DataContext _dataContext;

        public CityRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task AddCityAsync(City city)
        {
             await _dataContext.Cities.AddAsync(city);
        }

        public void DeleteCity(int id)
        {
            var city =  _dataContext.Cities.Find(id);

            if (city != null)
            {
                _dataContext.Cities.Remove(city);
            }
        }

        public async Task<IEnumerable<City>> GetCitiesAsync()
        {
            return await _dataContext.Cities.ToListAsync();
        }

        public async Task<bool> SaveCityChangesAsync()
        {    
           return await _dataContext.SaveChangesAsync() > 0;
        }
    }
}
