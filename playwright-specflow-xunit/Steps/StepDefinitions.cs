using Microsoft.Playwright;
using FluentAssertions;

namespace  SpecFlowPlaywrightXUnitExample.Steps
{
    [Binding]
    internal class PlaywrightTestParallel
    {
        private IPage _page;

        public PlaywrightTestParallel(IPage page)
        {
            _page = page;
        }

        [Given(@"Set (.*) as a capability")]
        public async Task CreateBrowser(string browserType)
        {
            Console.WriteLine("The passed browser is " + browserType);
            await _page.WaitForTimeoutAsync(1000);

        }

        [Then("Go to Bing")]
        public async Task SearchWithBing()
        {
            await _page.GotoAsync("https://www.bing.com");
            var title = await _page.TitleAsync();
            title.Should().Contain("Bing");
        }

        [Then("Go to Google")]
        public async Task SearchWithGoogle()
        {
            await _page.GotoAsync("https://www.google.com");
            var title = await _page.TitleAsync();
            title.Should().Contain("Google");
        }
    }
}
