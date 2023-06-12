using SinglaRWithCharts.HubConfig;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(opts =>
{
	opts.AddPolicy("CorsPolicy", builder => builder
		.WithOrigins("https://localhost:44402")
		.AllowAnyMethod()
		.AllowAnyHeader()
		.AllowCredentials());
});
builder.Services.AddSignalR();

builder.Services.AddControllersWithViews();


var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
	app.UseHsts();
}

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseStaticFiles();
app.UseRouting();

app.UseEndpoints(endpoints =>
{
	endpoints.MapControllers();
	endpoints.MapHub<ChartHub>("/chart");
});

//app.MapControllerRoute(
//	name: "default",
//	pattern: "{controller}/{action=Index}/{id?}");

//app.MapFallbackToFile("index.html"); ;

app.Run();
