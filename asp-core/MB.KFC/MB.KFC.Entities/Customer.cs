using System.ComponentModel.DataAnnotations.Schema;

namespace MB.KFC.Entities
{
    public class Customer
    {
        public Customer()
        {
            Orders = new List<Order>();   
            Carts = new List<Cart>();
        }

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }

        public List<Order> Orders { get; set; }

        public List<Cart> Carts { get; set; }

        [NotMapped]
        public int Age
        {
            get
            {
                return DateTime.Now.Year - DateOfBirth.Year;
            }
        }

        [NotMapped]
        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
    }
}