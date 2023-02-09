namespace playwright_csharp_xunit
{
    using Microsoft.Playwright;
    using Xunit;
    using System.Collections.Generic;
    using Newtonsoft.Json;

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
    
        [Fact(DisplayName = "Browse LambdaTest in https://www.bing.com")]
        public static async Task TestWithChrome()
        {
            using var playwright = await Playwright.CreateAsync();
            await using var browser = await playwright.Chromium.ConnectAsync(GetCdpUrl("Chrome"));
            var page = await browser.NewPageAsync();
            await page.GotoAsync("https://www.bing.com");
            await page.Locator("[id='sb_form_q']").ClickAsync();
            await page.FillAsync("[id='sb_form_q']", "LambdaTest");
            await page.Keyboard.PressAsync("Enter");
            await page.Locator("[class=' b_active']")
            var title = await page.TitleAsync();

            if (title.Contains("LambdaTest"))
            {
                // Use the following code to mark the test status.
                await SetTestStatus("passed", "Title matched", page);
            }
            else {
                await SetTestStatus("failed", "Title not matched", page);
            }
            await browser.CloseAsync();
        }
    
        [Fact(DisplayName = "Browse LambdaTest in https://www.google.com")]
        public static async Task TestWithMicrosoftEdge()
        {
            using var playwright = await Playwright.CreateAsync();
            await using var browser = await playwright.Chromium.ConnectAsync(GetCdpUrl("MicrosoftEdge"));
            var page = await browser.NewPageAsync();
            await page.GotoAsync("https://www.google.com");
            await page.FillAsync("[title='Search']", "LambdaTest");
            await page.Keyboard.PressAsync("Enter");
            var title = await page.TitleAsync();

            if (title.Contains("LambdaTest"))
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