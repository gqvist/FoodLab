using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodLab.Controllers;

[ApiController]
[Route("api/test")]
[Authorize]
public class TestController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            message = "Du är inloggad! Whohoo!"
        });
    }
}