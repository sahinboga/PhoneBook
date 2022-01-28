using Business.Abstract;
using Core.Extensions;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CustomersController : ControllerBase
	{
		private ICustomerService _customerService;

		public CustomersController(ICustomerService customerService)
		{
			_customerService = customerService;
		}

		[HttpGet("getallcustomers")]
		public IActionResult GetAll()
		{
			return this.ResponseResult(_customerService.GetAll());
		}

		[HttpPost("addcustomer")]
		public  IActionResult Add(Customer customer)
		{
			return this.ResponseResult(_customerService.Add(customer));
		}

		[HttpPost("updatecustomer")]
		public IActionResult Update(Customer customer)
		{
			return this.ResponseResult(_customerService.Update(customer));
		}

		[HttpPost("deletetecustomer")]
		public IActionResult Delete(Customer customer)
		{
			return this.ResponseResult(_customerService.Delete(customer));
		}
	}
}
