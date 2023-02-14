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
            string user, accessKey;
            user = Environment.GetEnvironmentVariable("LT_USERNAME");
            accessKey = Environment.GetEnvironmentVariable("LT_ACCESS_KEY");
            string tags = string.Join(",", _scenarioContext.ScenarioInfo.Tags);
            if(tags.Contains("chrome")) {
                _capabilities.Add("browserName", "Chrome");

            } else if(tags.Contains("edge")) {
                _capabilities.Add("browserName", "MicrosoftEdge");

            } else {
                _capabilities.Add("browserName", "Firefox");
            }
            Dictionary<string, string> ltOptions = new Dictionary<string, string>();

            ltOptions.Add("name", "Playwright Test");
            ltOptions.Add("build", "Playwright C-Sharp XUnit tests");
            ltOptions.Add("platform", "Windows 10");
            ltOptions.Add("user", user);
            ltOptions.Add("accessKey", accessKey);

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
                await SetTestStatus("failed", "Test Failed", page);
            } else {
                await SetTestStatus("passed", "Test Passed}", page);
            }
           await browser.DisposeAsync();
        }
        private static async Task SetTestStatus(string status, string remark, IPage _page) {
            await _page.EvaluateAsync("_ => {}", "lambdatest_action: {\"action\": \"setTestStatus\", \"arguments\": {\"status\":\"" + status + "\", \"remark\": \"" + remark + "\"}}");
        }
    }
}
