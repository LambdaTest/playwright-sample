using System;
using System.Collections.Generic;

namespace PlaywrightTesting
{
    class Program
    {
        public static async Task Main(string[] args)
        {
            switch (args[0])
            {
                case "single":
                    Console.WriteLine("Running Playwright Single Test on LambdaTest");
                    await PlaywrightTestSingle.main(args);
                    break;
                case "iphonetest":
                    Console.WriteLine("Running Playwright Test with iPhone Emulation");
                    await PlaywrightTestonIPhone.main(args);
                    break;
                case "ipadtest":
                    Console.WriteLine("Running Playwright Test with iPad Emulation");
                    await PlaywrightTestonIPad.main(args);
                    break;
                default:
                    Console.WriteLine("Running Playwright Single Test on LambdaTest");
                    await PlaywrightTestSingle.main(args);
                    break;
            }
        }
    }
}
