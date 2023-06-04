using AutoMapper;
using MB.KFC.Dtos.Carts;
using MB.KFC.Entities;

namespace MB.KFC.WebApi.AutoMapperProfiles
{
    public class CartAutoMapperProfile : Profile
    {
        public CartAutoMapperProfile()
        {
            CreateMap<Cart, CartListDto>();
            CreateMap<Cart, CartDetailsDto>();
        }
    }
}
