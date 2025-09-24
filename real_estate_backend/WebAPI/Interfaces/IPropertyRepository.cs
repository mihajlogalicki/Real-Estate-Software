using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IPropertyRepository
    {
        Task<IEnumerable<Property>> GetPropertiesAsync(int sellRentType);
        Task AddPropertyAsync(Property property);
        Task DeletePropertyAsync(int id);
    }
}
