using AutoMapper;
using MB.KFC.Dtos.Lookups;
using MB.KFC.Dtos.Products;
using MB.KFC.EfCore;
using MB.KFC.Entities;
using MB.KFC.Entities.Products;
using MB.KFC.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MB.KFC.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        #region Data and Const

        private readonly KfcDbContext _context;
        private readonly IMapper _mapper;

        public ProductsController(KfcDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Actions

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            var products = await _context
                                    .Products
                                    .Include(p => p.Category)
                                    .ToListAsync();

            var productDtos = _mapper.Map<List<ProductDto>>(products);

            return productDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var product = await _context
                                    .Products
                                    .Include(p => p.Category)
                                    .Include(p => p.Images)
                                    .SingleOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            var productDto = _mapper.Map<ProductDto>(product);


            return productDto;
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(ProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);

            product.Category = await _context.Categories.Where(c => c.Id == productDto.CategoryId).SingleAsync();

            _context.Products.Add(product);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProduct(int id, ProductDto productDto)
        {
            if (id != productDto.Id)
            {
                return BadRequest();
            }

            var product = _mapper.Map<Product>(productDto);
            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet]
        public async Task<ActionResult<List<LookupDto>>> GetProductsLookup()
        {
            // This is in three statements 
            // - Easier to read
            // - easier to debug
            var products  = await _context
                                    .Products
                                    .ToListAsync();

            var productDtos = _mapper.Map<List<LookupDto>>(products);

            return productDtos;

            // This is in one statement
            //return await _context
            //            .Products
            //            .Select(p => new LookupDto { Id = p.Id, Name = p.Name })
            //            .ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> AddProductToCart(int productId)
        {
            var product = await _context
                                    .Products
                                    .FindAsync(productId);

            if (product == null)
            {
                return NotFound();
            }

            var cart = await GetCart();

            cart.Products.Add(product);
            await _context.SaveChangesAsync();

            // TODO update cart total price

            return Ok();
        }

        #endregion

        #region Pivate Methods

        private bool ProductExists(int id)
        {
            return (_context.Products?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private async Task<Cart> GetCart()
        {
            var cart = await _context
                                .Carts
                                .Where(c => c.Status == CartStatus.OpenCart)
                                .SingleOrDefaultAsync();

            if (cart != null) // An open cart has been found
            {
                return cart;
            }

            // What if there is not open cart? then create a new cart
            var newCart = new Cart();
            newCart.CustomerId = 10; // Customer 10 is hardcoded for now

            await _context.Carts.AddAsync(newCart);
            await _context.SaveChangesAsync();

            return newCart;
        }

        #endregion
    }
}
