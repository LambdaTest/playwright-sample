import com.google.gson.JsonObject;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import org.junit.Test;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.file.Paths;

public class SampleTest {
  @Test
  public void sampleTest1(){
    try (Playwright playwright = Playwright.create()) {
      LTCapability ltCapability = new LTCapability();
      String caps = URLEncoder.encode(ltCapability.getDefaultTestCapability().toString(), "utf-8");
      String cdpUrl = "wss://cdp.lambdatest.com/playwright?capabilities=" + caps;
      Browser browser = playwright.webkit().connect(cdpUrl);
      Page page = browser.newPage();
      page.navigate("http://whatsmyuseragent.org/");
      page.close();
      browser.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
  @Test
  public void sampleTest2(){
    try (Playwright playwright = Playwright.create()) {
      LTCapability ltCapability = new LTCapability();
      String caps = URLEncoder.encode(ltCapability.getDefaultTestCapability().toString(), "utf-8");
      String cdpUrl = "wss://cdp.lambdatest.com/playwright?capabilities=" + caps;
      Browser browser = playwright.webkit().connect(cdpUrl);
      Page page = browser.newPage();
      page.navigate("http://google.com/");
      page.close();
      browser.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
