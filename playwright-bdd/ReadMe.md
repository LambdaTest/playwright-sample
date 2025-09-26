# LambdaTest PlayWright BDD Tests

In this 'Playwright BDD Demo with Cloud Grid' repo, we have covered the usage of the [LambdaTest Playwright-Node.js SDK](https://www.lambdatest.com/support/docs/playwright-sdk/) to automate tests on the LambdaTest platform. Here is the top-level view of the internal working of the Playwright-BDD framework:

<a href="https://github.com/user-attachments/assets/adb3dab7-e663-4657-9eed-9b58a7ff1b83" target="_blank">
    <img src="https://github.com/user-attachments/assets/adb3dab7-e663-4657-9eed-9b58a7ff1b83"  alt="Playwright BDD Schema" width="1000" height="450" />
</a>

You can find more information about Playwright-BDD in the [Playwright-BDD GitHub Repository](https://github.com/vitalets/playwright-bdd).

## Steps for test execution

**Step 1:** Create a virtual environment by triggering the *virtualenv venv* command on the terminal

```bash
virtualenv venv
```
<img width="1418" alt="VirtualEnvironment" src="https://github.com/hjsblogger/web-scraping-with-python/assets/1688653/89beb6af-549f-42ac-a063-e5f715018ef8">

**Step 2:** Navigate the newly created virtual environment by triggering the *source venv/bin/activate* command on the terminal

```bash
source venv/bin/activate
```
**Step 3:** You can fetch the LambdaTest Credentials from the [LambdaTest Profile Section](https://accounts.lambdatest.com/security/username-accesskey) section.

Update the LambdaTest Credentials - [LT_USERNAME](https://github.com/hjsblogger/playwright-cucumber-bdd-demo/blob/main/lambdatest.yml#L5) and [LT_ACCESS_KEY](https://github.com/hjsblogger/playwright-cucumber-bdd-demo/blob/main/lambdatest.yml#L6) in lambdatest.yml.

**Step 4:** Run the *npm install* command on the terminal to install the desired packages (or dependencies).

```bash
npm install
```

<img width="571" height="291" alt="Image" src="https://github.com/user-attachments/assets/54ee6ed8-101a-41c0-a498-facc62c5d9e4" />

With this, all the dependencies and environment variables are set. We can now harness the combination of (playwright-bdd + LambdaTest Playwright-Node.js SDK) for running web  - desktop + mobile (Android + iOS) tests on the LambdaTest cloud grid.

You can add/remove the browser, OS, and device(s) from [lambdatest.yml](https://github.com/hjsblogger/playwright-cucumber-bdd-demo/blob/main/lambdatest.yml) by selecting the appropriate combination from the [LambdaTest Capabilities Generator](https://www.lambdatest.com/capabilities-generator).

You can find the list of available real devces on LambdaTest in the [LambdaTest Real Devices Page](https://www.lambdatest.com/list-of-real-devices).

**Step 5:** Trigger the command ```npx bddgen && npx playwright-node-sdk playwright test``` on the terminal. The command does the following:

 - **npx bddgen**: Triggers BDD test generator CLI that comes with the playwright-bdd library. This command generates the step definitions from the .feature(s) in the ```<project-folder>/.features-gen/features``` folder
 - **npx playwright-node-sdk playwright test**: Runs the Playwright tests on LambdaTest cloud gridusing the LambdaTest SDK that injects config, capabilities, and reporting.

<img width="1411" height="491" alt="Image" src="https://github.com/user-attachments/assets/a516b04c-8aea-4339-b89d-7259c09a4931" /><br/>

<img width="1411" height="514" alt="Image" src="https://github.com/user-attachments/assets/a5bf2884-b980-48ca-8112-900c0b88568d" /><br/>

**Step 6:** Navigate to the [LambdaTest Automation Dashboard](https://automation.lambdatest.com/) to check the status of the test execution:

<img width="1440" height="900" alt="Image" src="https://github.com/user-attachments/assets/a246ad30-3fd4-4e59-80df-7011294bc014" /><br/>

As seen below, all the scenarios that are a part of respective .feature(s) files successfuly executed on LambdaTest.

<img width="1440" height="900" alt="Image" src="https://github.com/user-attachments/assets/1d1f4df6-ad8d-4590-888e-b7b5f01e105a" /><br/>

<img width="1440" height="900" alt="Image" src="https://github.com/user-attachments/assets/f3dcc6c3-30d4-4936-895a-c9d46a3015a6" /><br/>
