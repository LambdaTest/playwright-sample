const config = {
  testDir: './tests',
  testMatch: '*.js',
  timeout: 300000,
  workers: 6,
  use: {},
  projects: [
    {
      name: 'Pixel.*:16:android@lambdatest',
      use: {},
    },
    {
      /* Regex device name */
      name: 'Galaxy*:15:android@lambdatest',
      use: {},
    },
    {
      name: "chrome:latest:MacOS Ventura@lambdatest",
      use: {
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "chrome:latest:Windows 11@lambdatest",
      use: {
        viewport: { width: 1280, height: 720 },
      },
    },
    /* iOS supported in JS setup */
    {
      name: 'iPhone 16:18:ios@lambdatest',
      use: {},
    },
  ],
};

export default config;
