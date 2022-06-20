using Microsoft.Playwright;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;

class PlaywrightTest
{
    public static async Task main(string[] args)
    {
        using var playwright = await Playwright.CreateAsync();

        string user, accessKey;
        user = Environment.GetEnvironmentVariable("LT_USERNAME");
        accessKey = Environment.GetEnvironmentVariable("LT_ACCESS_KEY");

        Dictionary<string, object> browserstackOptions = new Dictionary<string, object>();
        Dictionary<string, string> ltOptions = new Dictionary<string, string>();

        ltOptions.Add("name", "Playwright Test");
        ltOptions.Add("build", "Playwright C-Sharp tests");
        ltOptions.Add("platform", "Windows 10");
        ltOptions.Add("user", user);
        ltOptions.Add("accessKey", accessKey);

        browserstackOptions.Add("browserName", "Chrome");
        browserstackOptions.Add("browserVersion", "latest");
        browserstackOptions.Add("LT:Options", ltOptions);

        string capsJson = JsonConvert.SerializeObject(browserstackOptions);

        string cdpUrl = "wss://cdp.lambdatest.com/playwright?capabilities=" + Uri.EscapeDataString(capsJson);

        Console.WriteLine("capsJson "+ capsJson);
        Console.WriteLine("cdpUrl "+ cdpUrl);

        await using var browser = await playwright.Chromium.ConnectAsync(cdpUrl);

        // Documentation: https://playwright.dev/docs/emulation#devices
        // Supported devices: https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json
        var context = await browser.NewContextAsync(playwright.Devices["iPad Pro 11 landscape"]);
        var page = await context.NewPageAsync();

        try {
          await page.GotoAsync("https://www.bing.com");
          await page.Locator("[aria-label='Enter your search term']").ClickAsync();
          await page.FillAsync("[aria-label='Enter your search term']", "LambdaTest");
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
