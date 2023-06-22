using Microsoft.Playwright;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;

class PlaywrightTestSingle
{
    public static async Task main(string[] args)
    {
        using var playwright = await Playwright.CreateAsync();

        string? user, accessKey;
        user = Environment.GetEnvironmentVariable("LT_USERNAME");
        accessKey = Environment.GetEnvironmentVariable("LT_ACCESS_KEY");

        Dictionary<string, object?> capabilities = new Dictionary<string, object?>();
        Dictionary<string, string?> ltOptions = new Dictionary<string, string?>();

        ltOptions.Add("name", "Playwright Test");
        ltOptions.Add("build", "Playwright C-Sharp tests");
        ltOptions.Add("platform", "Windows 10");
        ltOptions.Add("user", user);
        ltOptions.Add("accessKey", accessKey);

        capabilities.Add("browserName", "Chrome");
        capabilities.Add("browserVersion", "latest");
        capabilities.Add("LT:Options", ltOptions);

        string capabilitiesJson = JsonConvert.SerializeObject(capabilities);

        string cdpUrl = "wss://cdp.lambdatest.com/playwright?capabilities=" + Uri.EscapeDataString(capabilitiesJson);

        await using var browser = await playwright.Chromium.ConnectAsync(cdpUrl);
        var page = await browser.NewPageAsync();
        try {
          await page.GotoAsync("https://duckduckgo.com");
          await page.Locator("[name='q']").ClickAsync();
          await page.FillAsync("[name='q']", "LambdaTest");
          await page.Keyboard.PressAsync("Enter");
          var title = await page.TitleAsync();

          if (title.Contains("LambdaTest at DuckDuckGo"))
          {
            // Use the following code to mark the test status.
            await SetTestStatus("passed", "Title matched", page);
          }
          else {
            await SetTestStatus("failed", "Title not matched", page);
          }
        }
        catch (Exception err) {
          await SetTestStatus("failed", err.Message, page);
        }
        await browser.CloseAsync();
    }

    public static async Task SetTestStatus(string status, string remark, IPage page) {
        await page.EvaluateAsync("_ => {}", "lambdatest_action: {\"action\": \"setTestStatus\", \"arguments\": {\"status\":\"" + status + "\", \"remark\": \"" + remark + "\"}}");
    }
}
