using Microsoft.Playwright;
using Newtonsoft.Json;
using Xunit;

[assembly: CollectionBehavior(DisableTestParallelization = false)]
namespace  SpecFlowPlaywrightXUnitExample.Steps
{
    [Binding]
    public class PlaywrightTestParallel
    {
        private static string GetCdpUrl(string browserType)
        {
            string user, accessKey;
            user = Environment.GetEnvironmentVariable("LT_USERNAME");
            accessKey = Environment.GetEnvironmentVariable("LT_ACCESS_KEY");

            Dictionary<string, object> capabilities = new Dictionary<string, object>();
            Dictionary<string, string> ltOptions = new Dictionary<string, string>();

            ltOptions.Add("name", "Playwright Test");
            ltOptions.Add("build", "Playwright C-Sharp XUnit tests");
            ltOptions.Add("platform", "Windows 10");
            ltOptions.Add("user", user);
            ltOptions.Add("accessKey", accessKey);

            capabilities.Add("browserName", browserType);
            capabilities.Add("browserVersion", "latest");
            capabilities.Add("LT:Options", ltOptions);

            string capabilitiesJson = JsonConvert.SerializeObject(capabilities);
            return "wss://cdp.lambdatest.com/playwright?capabilities=" + Uri.EscapeDataString(capabilitiesJson);
        }
    
        [Given(@"Go to Bing with (.*)")]
        public static async Task SearchWithBing(string browserType)
        {
            using var playwright = await Playwright.CreateAsync();
            await using var browser = await playwright.Chromium.ConnectAsync(GetCdpUrl(browserType));
            var page = await browser.NewPageAsync();
            await page.GotoAsync("https://www.bing.com");
            var url = page.Url;

            if (url.Contains("bing"))
            {
                // Use the following code to mark the test status.
                await SetTestStatus("passed", "Title matched", page);
            }
            else {
                await SetTestStatus("failed", "Title not matched", page);
            }
            await browser.CloseAsync();
        }
        
    
        [Given(@"Go to Google with (.*)")]
        public static async Task SearchWithGoogle(string browserType)
        {
            using var playwright = await Playwright.CreateAsync();
            await using var browser = await playwright.Chromium.ConnectAsync(GetCdpUrl(browserType));
            var page = await browser.NewPageAsync();
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
            await browser.CloseAsync();
        }
        private static async Task SetTestStatus(string status, string remark, IPage page) {
            await page.EvaluateAsync("_ => {}", "lambdatest_action: {\"action\": \"setTestStatus\", \"arguments\": {\"status\":\"" + status + "\", \"remark\": \"" + remark + "\"}}");
        }
    }
}
