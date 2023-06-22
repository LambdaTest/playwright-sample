using BoDi;
using Microsoft.Playwright;
using Newtonsoft.Json;

namespace SpecFlowPlaywrightXUnitExample.Steps
{
    [Binding]
    internal class Hooks
    {
        public IBrowser browser;
        public IBrowserContext context;
        public IPage page;
        public IPlaywright playwright;
        private Dictionary<string, object>? _capabilities = new Dictionary<string, object>();
        private string gdpUrl = "";
        private readonly IObjectContainer _objectContainer;
        private readonly ScenarioContext _scenarioContext;

        public Hooks(IObjectContainer objectContainer, ScenarioContext scenarioContext)
        {
            _objectContainer = objectContainer;
            _scenarioContext = scenarioContext;
        }
        [BeforeScenario()]
        public async Task CreateCapabilities()
        {
            string? user, accessKey;
            string browserName =  JsonConvert.SerializeObject(_scenarioContext.ScenarioInfo.Arguments["browser"]).Replace("\"", "");
            user = Environment.GetEnvironmentVariable("LT_USERNAME");
            accessKey = Environment.GetEnvironmentVariable("LT_ACCESS_KEY");
            Dictionary<string, string?> ltOptions = new Dictionary<string, string?>();

            ltOptions.Add("name", "Playwright Test");
            ltOptions.Add("build", "Playwright C-Sharp SpecFlow Tests");
            ltOptions.Add("platform", "Windows 10");
            ltOptions.Add("user", user);
            ltOptions.Add("accessKey", accessKey);

             _capabilities.Add("browserName", browserName);
            _capabilities.Add("browserVersion", "latest");
            _capabilities.Add("LT:Options", ltOptions);
            try {
                string capabilitiesJson = JsonConvert.SerializeObject(_capabilities);
                gdpUrl = "wss://cdp.lambdatest.com/playwright?capabilities=" + Uri.EscapeDataString(capabilitiesJson);
                playwright = await Playwright.CreateAsync();
                browser = await playwright.Chromium.ConnectAsync(gdpUrl);
                context = await browser.NewContextAsync();
                page = await context.NewPageAsync();
                _objectContainer.RegisterInstanceAs(page);
            } catch (Exception e) {
                Console.WriteLine("{0} Exception caught.", e);
            }

        }

        [AfterScenario()]
        public async Task CloseDriver()
        {
            if (_scenarioContext.TestError != null)
            {
                await SetTestStatus("failed", _scenarioContext.TestError.Message.Replace("\"", ""), page);
            } else {
                await SetTestStatus("passed", "Assertions Passed", page);
            }
           await browser.DisposeAsync();
        }
        private static async Task SetTestStatus(string status, string remark, IPage _page) {
            await _page.EvaluateAsync("_ => {}", "lambdatest_action: {\"action\": \"setTestStatus\", \"arguments\": {\"status\":\"" + status + "\", \"remark\": \"" + remark + "\"}}");
        }
    }
}
