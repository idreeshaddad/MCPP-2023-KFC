using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MB.KFC.EfCore;
using MB.KFC.Entities;
using AutoMapper;
using MB.KFC.Dtos.Orders;

namespace MB.KFC.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        #region Data and Const

        private readonly KfcDbContext _context;
        private readonly IMapper _mapper;

        public OrdersController(KfcDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Actions

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderListDto>>> GetOrders()
        {
            var orders = await _context
                            .Orders
                            .Include(o => o.Customer)
                            .ToListAsync();

            var orderDtos = _mapper.Map<List<OrderListDto>>(orders);

            return orderDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDetailsDto>> GetOrder(int id)
        {
            var order = await _context
                                .Orders
                                .Include(o => o.Customer)
                                .Include(o => o.Products)
                                    .ThenInclude(p => p.Category)
                                .SingleOrDefaultAsync(o => o.Id == id);

            if (order == null)
            {
                return NotFound();
            }

            var orderDto = _mapper.Map<OrderDetailsDto>(order);

            return orderDto;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(OrderDto orderDto)
        {
            var order = _mapper.Map<Order>(orderDto);

            await UpdateOrderProducts(orderDto.ProductIds, order);

            order.OrderDate = DateTime.Now;
            order.TotalPrice = GetOrderTotalPrice(order);
            
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditOrder(int id, OrderDto orderDto)
        {
            if (id != orderDto.Id)
            {
                return BadRequest();
            }

            var order = await GetOrderWithProducts(id);

            _mapper.Map(orderDto, order); // Patch (((NOT))) regular map that we are used to.

            try
            {
                await UpdateOrderProducts(orderDto.ProductIds, order);

                order.TotalPrice = GetOrderTotalPrice(order);

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            if (_context.Orders == null)
            {
                return NotFound();
            }
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        #endregion

        #region Private Methods

        private bool OrderExists(int id)
        {
            return (_context.Orders?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private async Task<Order> GetOrderWithProducts(int orderId)
        {
            return await _context
                            .Orders
                            .Include(o => o.Products)
                            .Where(o => o.Id == orderId)
                            .SingleAsync();
        }

        private async Task UpdateOrderProducts(List<int> productIds, Order order)
        {
            order.Products.Clear();

            var products = await _context
                                .Products
                                .Where(p => productIds.Contains(p.Id))
                                .ToListAsync();

            order.Products.AddRange(products);
        }

        private double GetOrderTotalPrice(Order order)
        {
            return order.Products.Sum(p => p.Price);
        }

        #endregion
    }
}
