﻿using AutoMapper;
using MB.KFC.Dtos.Orders;
using MB.KFC.Entities;

namespace MB.KFC.WebApi.AutoMapperProfiles
{
    public class OrderAutoMapperProfile : Profile
    {
        public OrderAutoMapperProfile()
        {
            CreateMap<Order, OrderListDto>();

            CreateMap<Order, OrderDetailsDto>();

            CreateMap<OrderDto, Order>();

            CreateMap<Order, OrderDto>()
                .ForMember(dest => dest.ProductIds, opts => opts.MapFrom(src => src.Products.Select(p => p.Id)));


        }
    }
}
