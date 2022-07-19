import com.google.gson.JsonObject;

public class LTCapability {
  JsonObject getDefaultTestCapability(){
    JsonObject capabilities = new JsonObject();
    JsonObject ltOptions = new JsonObject();

    String user = System.getenv("LT_USERNAME");
    String accessKey = System.getenv("LT_ACCESS_KEY");

    capabilities.addProperty("browserName", "Chrome"); // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    capabilities.addProperty("browserVersion", "latest");
    ltOptions.addProperty("platform", "Windows 10");
    ltOptions.addProperty("name", "Playwright Test");
    ltOptions.addProperty("build", "Playwrite Testing using Junit");
    ltOptions.addProperty("user", user);
    ltOptions.addProperty("accessKey", accessKey);
    capabilities.add("LT:Options", ltOptions);
    return capabilities;
  }

}
