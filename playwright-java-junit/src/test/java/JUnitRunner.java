import org.junit.runner.JUnitCore;
import org.junit.runner.Result;

public class JUnitRunner {
  public static void main(String[] args) {
    Result result = JUnitCore.runClasses(SampleTest.class);
    System.out.println(result.wasSuccessful());
  }
}
