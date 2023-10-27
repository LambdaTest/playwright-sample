Feature('GitHub Login');

Scenario('login on GitHub', ({ I }) => {
  I.amOnPage('https://github.com');
  I.click('Sign in', '//a[contains(text(),\'Sign in\')]');
  I.see('Sign in to GitHub', 'h1');
  I.fillField('Username or email address', 'something@totest.com');
  I.fillField('Password', '123456');
  I.click('Sign in');
});