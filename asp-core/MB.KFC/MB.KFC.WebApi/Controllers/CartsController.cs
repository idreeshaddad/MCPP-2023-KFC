using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MB.KFC.EfCore;
using MB.KFC.Entities;
using AutoMapper;
using MB.KFC.Dtos.Carts;

namespace MB.KFC.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        #region Data and Const

        private readonly KfcDbContext _context;
        private readonly IMapper _mapper;

        public CartsController(KfcDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Actions

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartListDto>>> GetCarts()
        {
            var carts = await _context
                                .Carts
                                .Include(c => c.Customer)
                                .ToListAsync();

            var cartDtos = _mapper.Map<List<CartListDto>>(carts);

            return cartDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CartDetailsDto>> GetCart(int id)
        {
            var cart = await _context
                                .Carts
                                .Include(c => c.Customer)
                                .Include(c => c.Products)
                                    .ThenInclude(p => p.Category)
                                .SingleOrDefaultAsync(c => c.Id == id);

            if (cart == null)
            {
                return NotFound();
            }

            var cartDto = _mapper.Map<CartDetailsDto>(cart);

            return cartDto;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, Cart cart)
        {
            if (id != cart.Id)
            {
                return BadRequest();
            }

            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
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

        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {
            if (_context.Carts == null)
            {
                return Problem("Entity set 'KfcDbContext.Carts'  is null.");
            }
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCart", new { id = cart.Id }, cart);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            if (_context.Carts == null)
            {
                return NotFound();
            }
            var cart = await _context.Carts.FindAsync(id);
            if (cart == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        #endregion

        #region Private Methods

        private bool CartExists(int id)
        {
            return (_context.Carts?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        #endregion
    }
}
