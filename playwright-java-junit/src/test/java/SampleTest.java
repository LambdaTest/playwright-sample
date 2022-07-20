import com.google.gson.JsonObject;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import com.tngtech.java.junit.dataprovider.DataProvider;
import com.tngtech.java.junit.dataprovider.DataProviderRunner;
import com.tngtech.java.junit.dataprovider.UseDataProvider;
import org.junit.Test;
import org.junit.runner.RunWith;

import java.net.URLEncoder;

@RunWith(DataProviderRunner.class)
public class SampleTest {
  @Test
  @UseDataProvider(value = "getDefaultTestCapability",location = LTCapability.class)
  public void sampleTest1(JsonObject capability){
    try (Playwright playwright = Playwright.create()) {
      String caps = URLEncoder.encode(capability.toString(), "utf-8");
      String cdpUrl = "wss://cdp.lambdatest.com/playwright?capabilities=" + caps;
      Browser browser = playwright.chromium().connect(cdpUrl);
      Page page = browser.newPage();
      page.navigate("http://whatsmyuseragent.org/");
      if(page.title().equalsIgnoreCase("What's my User Agent?")){
        setTestStatus("PASSED","Title matched",page);
      } else {
        setTestStatus("FAILED","Title not matched",page);
      }
      page.close();
      browser.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
  @Test
  @UseDataProvider(value = "getDefaultTestCapability",location = LTCapability.class)
  public void sampleTest2(JsonObject capability){
    try (Playwright playwright = Playwright.create()) {
      String caps = URLEncoder.encode(capability.toString(), "utf-8");
      String cdpUrl = "wss://cdp.lambdatest.com/playwright?capabilities=" + caps;
      Browser browser = playwright.webkit().connect(cdpUrl);
      Page page = browser.newPage();
      page.navigate("https://google.com/");
      if(page.title().equalsIgnoreCase("What's my User Agent?")){
        setTestStatus("PASSED","Title matched",page);
      } else {
        setTestStatus("FAILED","Title not matched",page);
      }
      page.close();
      browser.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
  public static void setTestStatus(String status, String remark, Page page) {
    Object result;
    result = page.evaluate("_ => {}", "lambdatest_action: { \"action\": \"setTestStatus\", \"arguments\": { \"status\": \"" + status + "\", \"remark\": \"" + remark + "\"}}");
  }
}
