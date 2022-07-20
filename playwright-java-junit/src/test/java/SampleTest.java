import com.google.gson.JsonObject;
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
      page.navigate("http://whatsmyuseragent.org/");
      if(page.title().equalsIgnoreCase("What's my User Agent?")){
        super.setTestStatus("PASSED","Title matched",page);
      } else {
        super.setTestStatus("FAILED","Title not matched",page);
      }
      super.closeConnection(driver);
    } catch (Exception e) {
      e.printStackTrace();
      super.setTestStatus("FAILED","Title not matched",page);
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
      super.setTestStatus("FAILED","Title not matched",page);
    }
  }
}
