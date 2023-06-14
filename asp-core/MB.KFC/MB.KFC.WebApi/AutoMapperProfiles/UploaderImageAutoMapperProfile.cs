using AutoMapper;
using MB.KFC.Dtos.Uploaders;
using MB.KFC.Entities.Customers;

namespace MB.KFC.WebApi.AutoMapperProfiles
{
    public class UploaderImageAutoMapperProfile : Profile
    {
        public UploaderImageAutoMapperProfile()
        {
            CreateMap<UploaderImageDto, CustomerImage>().ReverseMap();
        }
    }
}
