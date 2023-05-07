using AutoMapper;
using MB.KFC.Dtos.Products;
using MB.KFC.Entities;

namespace MB.KFC.WebApi.AutoMapperProfiles
{
    public class ProductAutoMapperProfile : Profile
    {
        public ProductAutoMapperProfile()
        {
            CreateMap<Product, ProductListDto>();
            CreateMap<Product, ProductDetailsDto>();
            CreateMap<Product, ProductDto>().ReverseMap();
        }
    }
}
