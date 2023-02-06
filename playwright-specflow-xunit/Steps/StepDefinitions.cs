using Microsoft.Playwright;
using Newtonsoft.Json;

namespace  SpecFlowPlaywrightXUnitExample.Steps
{
    [Binding]
    public class PlaywrightTestParallel
    {
        private IBrowser? _browser;
        private Dictionary<string, object>? _capabilities = new Dictionary<string, object>();
        private string gdpUrl = "";
        private string currentUrl;

        [BeforeScenario]
        private async void CreateCapabilities()
        {
            string user, accessKey;
            user = Environment.GetEnvironmentVariable("LT_USERNAME");
            accessKey = Environment.GetEnvironmentVariable("LT_ACCESS_KEY");
            
            Dictionary<string, string> ltOptions = new Dictionary<string, string>();

            ltOptions.Add("name", "Playwright Test");
            ltOptions.Add("build", "Playwright C-Sharp XUnit tests");
            ltOptions.Add("platform", "Windows 10");
            ltOptions.Add("user", user);
            ltOptions.Add("accessKey", accessKey);
            
            _capabilities.Add("browserVersion", "latest");
            _capabilities.Add("LT:Options", ltOptions);
        }
        
        [AfterScenario]
        private async void CloseDriver()
        {
            await _browser.CloseAsync();
        }

        [Given(@"Set (.*) as a capability")]
        public void CreateBrowser(string browserType)
        {
            _capabilities.Add("browserName", browserType);
            string capabilitiesJson = JsonConvert.SerializeObject(_capabilities);
            gdpUrl = "wss://cdp.lambdatest.com/playwright?capabilities=" + Uri.EscapeDataString(capabilitiesJson);
        }
    
        [Then(@"Go to Bing")]
        public async Task SearchWithBing()
        {
            using var playwright = await Playwright.CreateAsync();
            _browser = await playwright.Chromium.ConnectAsync(gdpUrl);
            var page = await _browser.NewPageAsync();
            await page.GotoAsync("https://www.bing.com");
            currentUrl = page.Url;

            if (currentUrl.Contains("bing"))
            {
                // Use the following code to mark the test status.
                await SetTestStatus("passed", "Title matched", page);
            }
            else {
                await SetTestStatus("failed", "Title not matched", page);
            }
        }
        
        [Then(@"Go to Google")]
        public async Task SearchWithGoogle()
        {
            using var playwright = await Playwright.CreateAsync();
            _browser = await playwright.Chromium.ConnectAsync(gdpUrl);
            var page = await _browser.NewPageAsync();
            await page.GotoAsync("https://www.google.com");
            var url = page.Url;
        
            if (url.Contains("google"))
            {
                // Use the following code to mark the test status.
                await SetTestStatus("passed", "Title matched", page);
            }
            else {
                await SetTestStatus("failed", "Title not matched", page);
            }
        }
        private static async Task SetTestStatus(string status, string remark, IPage page) {
            await page.EvaluateAsync("_ => {}", "lambdatest_action: {\"action\": \"setTestStatus\", \"arguments\": {\"status\":\"" + status + "\", \"remark\": \"" + remark + "\"}}");
        }
    }
}
