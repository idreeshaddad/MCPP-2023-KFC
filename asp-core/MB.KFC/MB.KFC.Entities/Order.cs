﻿using MB.KFC.Entities.Customers;
using MB.KFC.Entities.Products;

namespace MB.KFC.Entities
{
    public class Order
    {
        public Order()
        {
            Products = new List<Product>();
        }

        public int Id { get; set; }
        public double TotalPrice { get; set; }
        public string Note { get; set; }
        public DateTime OrderDate { get; set; }

        public int CustomerId { get; set; }
        public Customer Customer { get; set; }

        public List<Product> Products { get; set; }
    }
}
