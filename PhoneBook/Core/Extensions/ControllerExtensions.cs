using Core.Utilities.Results;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Extensions
{
	public static class ControllerExtensions
	{
        public static IActionResult ResponseResult(this ControllerBase controller, IResult result)
        {
            if (result.Success)
            {
                return controller.Ok(result);
            }
            return controller.BadRequest(result);
        }
    }
}
