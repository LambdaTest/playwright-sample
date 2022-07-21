import com.google.gson.JsonObject;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Page;
import com.tngtech.java.junit.dataprovider.DataProviderRunner;
import com.tngtech.java.junit.dataprovider.UseDataProvider;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(DataProviderRunner.class)
public class SampleTest extends  BaseTest{

  @Test
  @UseDataProvider(value = "getDefaultTestCapability",location = LTCapability.class)
  public void sampleTest1(JsonObject capability){
    Driver driver;
    Page page = null;
    try {
      driver = super.createConnection(capability);
      page = driver.getPage();
      page.navigate("https://www.duckduckgo.com");
      Locator locator = page.locator("#search_form_input_homepage");
      locator.click();
      page.fill("#search_form_input_homepage", "LambdaTest");
      page.keyboard().press("Enter");
      String title = page.title();
      if (title.equals("LambdaTest at DuckDuckGo")) {
        setTestStatus("passed", "Title matched", page);
      } else {
        setTestStatus("failed", "Title not matched", page);
      }
      super.closeConnection(driver);
    } catch (Exception e) {
      e.printStackTrace();
      super.setTestStatus("FAILED",e.getMessage(),page);
    }
  }

  @Test
  @UseDataProvider(value = "getDefaultTestCapability",location = LTCapability.class)
  public void sampleTest2(JsonObject capability) {
    Driver driver;
    Page page = null;
    try {
      driver = super.createConnection(capability);
      page = driver.getPage();
      page.navigate("http://whatsmyuseragent.org/");
      if(page.title().equalsIgnoreCase("What's my User Agent?")){
        super.setTestStatus("PASSED","Title matched",page);
      } else {
        super.setTestStatus("FAILED","Title not matched",page);
      }
      super.closeConnection(driver);
    } catch (Exception e) {
      e.printStackTrace();
      super.setTestStatus("FAILED",e.getMessage(),page);
    }
  }
}
