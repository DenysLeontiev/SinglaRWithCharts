using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SinglaRWithCharts.DataStorage;
using SinglaRWithCharts.HubConfig;
using SinglaRWithCharts.TimerFeatures;

namespace SinglaRWithCharts.Controllers
{
	[ApiController]
	[Route("api/{controller}")]
	public class ChartController : ControllerBase
	{
		private readonly IHubContext<ChartHub> _hubContext; // we use, because class ChartHub is empty

		public ChartController(IHubContext<ChartHub> hubContext)
		{
			_hubContext = hubContext;
		}

		public ActionResult Get()
		{
			var timerManager = new TimerManager(() =>
			{
				_hubContext.Clients.All.SendAsync("transferChartData", DataManager.GetData());
			});

			return Ok( new { Message="Request Completed", Data = DataManager.GetData()});
		}
	}
}
