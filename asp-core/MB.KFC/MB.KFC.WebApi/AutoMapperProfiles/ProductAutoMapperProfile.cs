using AutoMapper;
using MB.KFC.Dtos.Products;
using MB.KFC.Entities.Products;

namespace MB.KFC.WebApi.AutoMapperProfiles
{
    public class ProductAutoMapperProfile : Profile
    {
        public ProductAutoMapperProfile()
        {
            CreateMap<Product, ProductDto>().ReverseMap();
        }
    }
}
