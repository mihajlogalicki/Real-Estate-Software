using AutoMapper;
using WebAPI.DTOs;
using WebAPI.Models;

namespace WebAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles() 
        {
            CreateMap<City, CityDto>();
            CreateMap<CityDto, City>();
            CreateMap<Property, PropertyListDto>()
                .ForMember(d => d.City, opt => opt.MapFrom(src => src.City.Name))
                .ForMember(d => d.Country, opt => opt.MapFrom(src => src.City.Country))
                .ForMember(d => d.PropertyType, opt => opt.MapFrom(src => src.PropertyType.Name))
                .ForMember(d => d.FurnishingType, opt => opt.MapFrom(src => src.FurnishingType.Name));
        }
    }
}
