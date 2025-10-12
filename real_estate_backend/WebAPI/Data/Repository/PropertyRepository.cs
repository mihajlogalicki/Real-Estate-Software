using WebAPI.Models;
using WebAPI.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Data.Repository
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly DataContext _dataContext;
        public PropertyRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task AddPropertyAsync(Property property)
        {
            await _dataContext.Properties.AddAsync(property);
        }

        public async Task DeletePropertyAsync(int id)
        {
            var property = await _dataContext.Properties.FindAsync(id);

            if (property != null)
            {
                _dataContext.Properties.Remove(property);
            }
        }

        public async Task<IEnumerable<Property>> GetPropertiesAsync(int sellRentType)
        {
            var properties = await _dataContext.Properties
                .Include(p => p.PropertyType)
                .Include(p => p.FurnishingType)
                .Include(p => p.City)
                .Include(p => p.Photos)
                .Where(p => p.SellRentType == sellRentType)
                .ToListAsync();

            return properties;
        }

        public async Task<Property> GetPropertyDetailAsync(int id)
        {
            var property = await _dataContext.Properties
                .Include(p => p.PropertyType)
                .Include(p => p.FurnishingType)
                .Include(p => p.City)
                .Include(p => p.Photos)
                .Where(p => p.Id == id)
                .SingleOrDefaultAsync();

            return property;
        }

        public async Task<Property> GetPropertyPhotoAsync(int id)
        {
            var property = await _dataContext.Properties
                .Include(p => p.Photos)
                .Where(p => p.Id == id)
                .SingleOrDefaultAsync();

            return property;
        }
    }
}
