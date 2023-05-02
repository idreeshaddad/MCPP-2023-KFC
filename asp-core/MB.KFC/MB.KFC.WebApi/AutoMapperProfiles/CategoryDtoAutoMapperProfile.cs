using AutoMapper;
using MB.KFC.Dtos.Categories;
using MB.KFC.Entities;

namespace MB.KFC.WebApi.AutoMapperProfiles
{
    public class CategoryDtoAutoMapperProfile : Profile
    {
        public CategoryDtoAutoMapperProfile()
        {
            CreateMap<Category, CategoryDto>().ReverseMap();
        }
    }
}
