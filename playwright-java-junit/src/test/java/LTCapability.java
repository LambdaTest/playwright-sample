import com.google.gson.JsonObject;
import com.tngtech.java.junit.dataprovider.DataProvider;

public class LTCapability {
  @DataProvider
  public static Object[] getDefaultTestCapability() {
    JsonObject capabilities1 = new JsonObject();
    JsonObject ltOptions1 = new JsonObject();

    String user = System.getenv("LT_USERNAME");
    String accessKey = System.getenv("LT_ACCESS_KEY");

    capabilities1.addProperty("browserName", "Chrome"); // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    capabilities1.addProperty("browserVersion", "latest");
    ltOptions1.addProperty("platform", "Windows 10");
    ltOptions1.addProperty("name", "Playwright Test");
    ltOptions1.addProperty("build", "Playwrite Testing using Junit");
    ltOptions1.addProperty("user", user);
    ltOptions1.addProperty("accessKey", accessKey);
    Scanner s = new java.util.Scanner(Runtime.getRuntime().exec("npx playwright --version").getInputStream()).useDelimiter("\\A");
    String playwrightClientVersion = s.hasNext() ? s.next() : "";
    String client_version = playwrightClientVersion.split(" ")[1];
    ltOptions1.addProperty("playwrightClientVersion", client_version);        
    capabilities1.add("LT:Options", ltOptions1);


    JsonObject capabilities2 = new JsonObject();
    JsonObject ltOptions2 = new JsonObject();
    capabilities2.addProperty("browserName", "MicrosoftEdge"); // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    capabilities2.addProperty("browserVersion", "latest");
    ltOptions2.addProperty("platform", "Windows 10");
    ltOptions2.addProperty("name", "Playwright Test");
    ltOptions2.addProperty("build", "Playwrite Testing using Junit");
    ltOptions2.addProperty("user", user);
    ltOptions2.addProperty("accessKey", accessKey);
    Scanner s = new java.util.Scanner(Runtime.getRuntime().exec("npx playwright --version").getInputStream()).useDelimiter("\\A");
    String playwrightClientVersion = s.hasNext() ? s.next() : "";
    String client_version = playwrightClientVersion.split(" ")[1];
    ltOptions1.addProperty("playwrightClientVersion", client_version);  
    capabilities2.add("LT:Options", ltOptions2);
    return new Object[]{
      capabilities1,capabilities2
    };
  }
}
