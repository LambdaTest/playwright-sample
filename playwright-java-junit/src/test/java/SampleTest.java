import com.google.gson.JsonObject;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.tngtech.java.junit.dataprovider.DataProviderRunner;
import com.tngtech.java.junit.dataprovider.UseDataProvider;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(DataProviderRunner.class) public class SampleTest extends BaseTest {

  @Test
  @UseDataProvider(value = "getDefaultTestCapability", location = LTCapability.class)
  public void sampleTest1(JsonObject capability) throws Exception {
    Driver driver = null;
    Page page = null;
    try {
      driver = super.createConnection(capability);
      page = driver.getPage();
      page.navigate("https://www.duckduckgo.com");
      Locator locator = page.locator("[name=\"q\"]");
      locator.click();
      locator.type("LambdaTest");
      page.keyboard().press("Enter");
      String title = page.title();
      if (title.equals("LambdaTest at DuckDuckGo")) {
        setTestStatus("passed", "Title matched", page);
      } else {
        setTestStatus("failed", "Title not matched", page);
      }
      super.closeConnection(driver);
    } catch (Exception err) {
      err.printStackTrace();
      super.setTestStatus("FAILED", err.getMessage(), page);
      super.closeConnection(driver);
      throw err;
    }
  }

  @Test
  @UseDataProvider(value = "getDefaultTestCapability", location = LTCapability.class)
  public void sampleTest2(JsonObject capability) throws Exception {
    Driver driver = null;
    Page page = null;
    try {
      driver = super.createConnection(capability);
      page = driver.getPage();
      page.navigate("http://whatsmyuseragent.org/");
      if (page.title().equalsIgnoreCase("whatsmyuseragent.org")) {
        super.setTestStatus("PASSED", "Title matched", page);
      } else {
        super.setTestStatus("FAILED", "Title not matched", page);
      }
      super.closeConnection(driver);
    } catch (Exception err) {
      err.printStackTrace();
      super.setTestStatus("FAILED", err.getMessage(), page);
      super.closeConnection(driver);
      throw err;
    }
  }
}
