using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.ValidationRules.FluentValidation
{
	public class CustomerValidator:AbstractValidator<Customer>
	{
		public CustomerValidator()
		{
			RuleFor(c => c.CustomerName).NotEmpty();
			RuleFor(c => c.CustomerName).MinimumLength(2);
			RuleFor(c => c.CustomerPhoneNumber).NotEmpty();
			RuleFor(c => c.CustomerPhoneNumber).MaximumLength(14);

		}
	}
}
