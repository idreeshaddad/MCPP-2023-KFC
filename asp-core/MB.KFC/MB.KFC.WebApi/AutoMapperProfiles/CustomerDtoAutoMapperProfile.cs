using AutoMapper;
using MB.KFC.Dtos.Customers;
using MB.KFC.Entities;

namespace MB.KFC.WebApi.AutoMapperProfiles
{
    public class CustomerDtoAutoMapperProfile : Profile
    {
        public CustomerDtoAutoMapperProfile()
        {
            CreateMap<Customer, CustomerDto>().ReverseMap();
            CreateMap<Customer, CustomerListDto>();
            CreateMap<Customer, CustomerDetailsDto>();
        }
    }
}
