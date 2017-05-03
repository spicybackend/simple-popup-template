var webExtension = chrome || browser;

var emailEntry = document.getElementById('settings-email-entry');
var passwordEntry = document.getElementById('settings-password-entry');
var tokenEntry = document.getElementById('settings-token-entry');
var autoLoginToggle = document.getElementById('settings-auto-login-toggle');

function saveSettings() {
  webExtension.storage.local.set({
    email: emailEntry.value,
    password: passwordEntry.value,
    token: tokenEntry.value,
    autoLogin: autoLoginToggle.checked
  });
}

function fillSettings() {
  webExtension.storage.local.get(function (settings) {
    emailEntry.value = settings.email || '';
    passwordEntry.value = settings.password || '';
    tokenEntry.value = settings.token || '';

    if (settings.autoLogin) {
      autoLoginToggle.setAttribute('checked', 'true');
    } else {
      autoLoginToggle.removeAttribute('checked');
    }
  });
}

function setListeners() {
  document.getElementById('settings-form').addEventListener('submit', function() {
    saveSettings();
  });
}

setListeners();
fillSettings();