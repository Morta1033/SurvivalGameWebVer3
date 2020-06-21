using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SurvivalGameWeb.ViewModels.MemberRegister
{
    public class MemberRegisteredViewModel
    {
        [Required]
        [RegularExpression(@"^[a-zA-Z\u2E80-\u9FFF]{2,25}$")]
        [StringLength(25, MinimumLength = 2, ErrorMessage = "The name is between 2-25 Chinese or English characters")]
        public string Name { get; set; }

        //[Required]
        //[RegularExpression(@"^[a-zA-Z_][\w*\u2E80-\u9FFF]*$")]
        //[StringLength(25, MinimumLength = 2, ErrorMessage = "開頭只能為大寫或小寫英文")]
        //public string Account { get; set; }

        [Required(ErrorMessage = "Please enter the complete email")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [RegularExpression(@"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,35}$")]
        [DataType(DataType.Password)]
        [StringLength(35, MinimumLength = 8, ErrorMessage = "Password length is between 8-35 uppercase and lowercase English digits")]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [NotMapped]
        [Compare("Password", ErrorMessage = "Passwords are inconsistent!")]
        public string CheckPassword { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime Birth { get; set; }

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
    }
}