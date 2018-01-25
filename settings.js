let webExtension = chrome || browser;

let protocolEntry = document.getElementById('settings-protocol-entry');
let directoryEntry = document.getElementById('settings-directory-entry');

function saveSettings() {
  webExtension.storage.local.set({
    protocol: protocolEntry.value,
    directory: directoryEntry.value
  });
}

function fillSettings() {
  webExtension.storage.local.get(function (settings) {
    protocolEntry.value = settings.protocol || '';
    directoryEntry.value = settings.directory || '';

    // if (settings.autoLogin) {
    //   autoLoginToggle.setAttribute('checked', 'true');
    // } else {
    //   autoLoginToggle.removeAttribute('checked');
    // }
  });
}

function setListeners() {
  document.getElementById('settings-form').addEventListener('submit', function() {
    saveSettings();
  });
}

setListeners();
fillSettings();