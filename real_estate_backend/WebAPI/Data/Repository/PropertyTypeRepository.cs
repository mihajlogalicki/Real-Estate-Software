using Microsoft.EntityFrameworkCore;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repository
{
    public class PropertyTypeRepository : IPropertyTypeRepository
    {
        private readonly DataContext _dataContext;
        public PropertyTypeRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }  
        
        public async Task<IEnumerable<PropertyType>> GetPropertyTypesAsync()
        {
            return await _dataContext.PropertyTypes.ToListAsync();
        }
    }
}
