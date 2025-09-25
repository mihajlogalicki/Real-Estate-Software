using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IPropertyRepository
    {
        Task<IEnumerable<Property>> GetPropertiesAsync(int sellRentType);
        Task<Property> GetPropertyDetailAsync(int id);
        Task AddPropertyAsync(Property property);
        Task DeletePropertyAsync(int id);
    }
}
