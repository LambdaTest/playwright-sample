import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import org.junit.Test;
import java.net.URLEncoder;

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
  public void sampleTest2(){
    try (Playwright playwright = Playwright.create()) {
      LTCapability ltCapability = new LTCapability();
      String caps = URLEncoder.encode(ltCapability.getDefaultTestCapability().toString(), "utf-8");
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
