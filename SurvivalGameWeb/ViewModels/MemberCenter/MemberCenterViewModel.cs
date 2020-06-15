using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SurvivalGameWeb.ViewModels.MemberCenter
{
    public class MemberCenterViewModel
    {
        // Profile內容
        [Required]
        [RegularExpression(@"^[a-zA-Z\u2E80-\u9FFF]{2,25}$")]
        [StringLength(25, MinimumLength = 2, ErrorMessage = "The name is between 2-25 Chinese or English characters")]
        public string Name { get; set; }


        [Required(ErrorMessage = "Please enter the complete email")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [RegularExpression(@"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,35}$")]
        [DataType(DataType.Password)]
        [StringLength(35, MinimumLength = 8, ErrorMessage = "Password length is between 8-35 uppercase and lowercase English digits")]
        public string Password { get; set; }

        [Required]
        [RegularExpression(@"^\d{3,6}$")]
        [StringLength(6, MinimumLength = 2, ErrorMessage = "Please enter 3 to 6 digits")]
        public string PostCode { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-Z\u2E80-\u9FFF]*$")]
        [StringLength(50, MinimumLength = 10, ErrorMessage = "Please enter the complete address of more than 10 words")]
        public string Address { get; set; }

        [Required]
        [StringLength(10)]
        [RegularExpression(@"^09\d{8}$", ErrorMessage = "Please enter the 10-digit mobile phone number starting with 09")]
        public string Phone { get; set; }

        // History 內容
        public string HistoryImg { get; set; }
        public string HistoryName { get; set; }
        public decimal HistoryPrice { get; set; }

        // Wishlist 內容
        public string WishlistImg { get; set; }
        public string WishlistName { get; set; }
        public decimal WishlistPrice { get; set; }
    }
}