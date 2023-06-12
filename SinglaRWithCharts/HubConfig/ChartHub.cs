using Microsoft.AspNetCore.SignalR;
using SinglaRWithCharts.Model;

namespace SinglaRWithCharts.HubConfig
{
	public class ChartHub : Hub
	{
		public async Task BroadcastChartData(List<ChartModel> chartModels)
		{
			await Clients.All.SendAsync("transferChartData", chartModels);
		}
	}
}
