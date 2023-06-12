using SinglaRWithCharts.Model;

namespace SinglaRWithCharts.DataStorage
{
	public static class DataManager
	{
		public static List<ChartModel> GetData()
		{
			Random random = new Random();

			return new List<ChartModel>()
		{
			new ChartModel { Data = new List<int> { random.Next(1, 40) }, Label = "Data1" },
			new ChartModel { Data = new List<int> { random.Next(1, 40) }, Label = "Data2" },
			new ChartModel { Data = new List<int> { random.Next(1, 40) }, Label = "Data3" },
			new ChartModel { Data = new List<int> { random.Next(1, 40) }, Label = "Data4" }
		};
		}
	}
}
