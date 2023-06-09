﻿using MB.KFC.Entities.Products;

namespace MB.KFC.Entities
{
    public class Category
    {
        public Category()
        {
            Products = new List<Product>();    
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public List<Product> Products { get; set; }
    }
}