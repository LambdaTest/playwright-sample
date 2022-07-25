import com.google.gson.JsonObject;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

import java.net.URLEncoder;

public abstract class BaseTest {

  protected Driver createConnection(JsonObject cap) throws Exception {
    try {
      Playwright playwright = Playwright.create();
      String caps = URLEncoder.encode(cap.toString(), "utf-8");
      String cdpUrl = "wss://cdp.lambdatest.com/playwright?capabilities=" + caps;
      Browser browser = playwright.chromium().connect(cdpUrl);
      Page page = browser.newPage();
      return new Driver(browser,page);
    }
    catch (Exception e){
      e.printStackTrace();
      throw e;
    }
  }

  protected void closeConnection(Driver driver){
    driver.getPage().close();
    driver.getBrowser().close();
  }

  protected void setTestStatus(String status, String remark,Page page) {
    page.evaluate("_ => {}", "lambdatest_action: { \"action\": \"setTestStatus\", \"arguments\": { \"status\": \"" + status + "\", \"remark\": \"" + remark + "\"}}");
  }
}
class Driver{

  private Browser browser;
  private Page page;
  Driver(Browser browser, Page page){
    this.browser = browser;
    this.page = page;
  }

  public Browser getBrowser() {
    return browser;
  }

  public Page getPage() {
    return page;
  }
}