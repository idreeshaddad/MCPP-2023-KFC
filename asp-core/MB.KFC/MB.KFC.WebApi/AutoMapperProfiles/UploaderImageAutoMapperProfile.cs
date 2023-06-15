using AutoMapper;
using MB.KFC.Dtos.Uploaders;
using MB.KFC.Entities.Customers;
using MB.KFC.Entities.Products;

namespace MB.KFC.WebApi.AutoMapperProfiles
{
    public class UploaderImageAutoMapperProfile : Profile
    {
        public UploaderImageAutoMapperProfile()
        {
            CreateMap<UploaderImageDto, CustomerImage>().ReverseMap();
            CreateMap<UploaderImageDto, ProductImage>().ReverseMap();
        }
    }
}
