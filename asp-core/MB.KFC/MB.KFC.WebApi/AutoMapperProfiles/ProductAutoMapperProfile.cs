using AutoMapper;
using MB.KFC.Dtos.Products;
using MB.KFC.Entities;

namespace MB.KFC.WebApi.AutoMapperProfiles
{
    public class ProductAutoMapperProfile : Profile
    {
        public ProductAutoMapperProfile()
        {
            CreateMap<Product, ProductDto>();
            CreateMap<Product, ProductAddEditDto>().ReverseMap();
        }
    }
}
