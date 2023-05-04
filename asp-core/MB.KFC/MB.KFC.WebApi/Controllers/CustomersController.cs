﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MB.KFC.EfCore;
using MB.KFC.Entities;
using AutoMapper;
using MB.KFC.Dtos.Customers;

namespace MB.KFC.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        #region Data and Const

        private readonly KfcDbContext _context;
        private readonly IMapper _mapper;

        public CustomersController(KfcDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        #endregion

        #region Actions

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerListDto>>> GetCustomers()
        {
            var customers = await _context.Customers.ToListAsync();

            var customerDtos = _mapper.Map<List<CustomerListDto>>(customers);

            return customerDtos;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDetailsDto>> GetCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            var cusDto = _mapper.Map<CustomerDetailsDto>(customer);

            return cusDto;
        }

        [HttpPost]
        public async Task<ActionResult> CreateCustomer(CustomerDto customerDto)
        {
            var customer = _mapper.Map<Customer>(customerDto);

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Ok(new { customerId = customer.Id });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCustomer(int id, Customer customer)
        {
            if (id != customer.Id)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            if (_context.Customers == null)
            {
                return NotFound();
            }
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        #endregion

        #region Private Methods

        private bool CustomerExists(int id)
        {
            return (_context.Customers?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        #endregion
    }
}