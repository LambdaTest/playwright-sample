import json
import os
import urllib
import subprocess

from playwright.sync_api import sync_playwright

capabilities = {
    'browserName': 'Chrome',  # Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
        'platform': 'Windows 10',
        'build': 'Playwright Python Build',
        'name': 'Playwright Test',
        'user': os.getenv('LT_USERNAME'),
        'accessKey': os.getenv('LT_ACCESS_KEY'),
        'network': True,
        'video': True,
        'console': True,
        'tunnel': False,  # Add tunnel configuration if testing locally hosted webpage
        'tunnelName': '',  # Optional
        'geoLocation': '', # country code can be fetched from https://www.lambdatest.com/capabilities-generator/
    }
}


def run(playwright):
    playwrightVersion = str(subprocess.getoutput('playwright --version')).strip().split(" ")[1]
    capabilities['LT:Options']['playwrightClientVersion'] = playwrightVersion

    lt_cdp_url = 'wss://cdp.lambdatest.com/playwright?capabilities=' + urllib.parse.quote(
        json.dumps(capabilities))
    browser = playwright.chromium.connect(lt_cdp_url, timeout=120000)
    page = browser.new_page()
    try:
        page.goto("https://duckduckgo.com")
        # Generate lighthouse report for the required URL.
        # You can generate multiple lighthouse reports in a test by executing this function anywhere in the test.
        generate_lighthouse_report(page, "https://duckduckgo.com")
        
        page.fill("[name='q']", "LambdaTest")
        page.wait_for_timeout(1000)
        page.keyboard.press("Enter")
        page.wait_for_timeout(1000)
        title = page.title()
        is_title_matched = True if "LambdaTest" in title else False

        if is_title_matched:
            set_test_status(page, "passed", "Title matched")
        else:
            set_test_status(page, "failed", "Title did not match")
    except Exception as err:
        print("Error:: ", err)
        set_test_status(page, "failed", str(err))

    browser.close()


def generate_lighthouse_report(page, url):
    page.evaluate("_ => {}", "lambdatest_action: {\"action\": \"lighthouseReport\", \"arguments\": {\"url\": \"" + url + "\"}}")

def set_test_status(page, status, remark):
    page.evaluate("_ => {}",
                  "lambdatest_action: {\"action\": \"setTestStatus\", \"arguments\": {\"status\":\"" + status + "\", \"remark\": \"" + remark + "\"}}");


with sync_playwright() as playwright:
    run(playwright)
