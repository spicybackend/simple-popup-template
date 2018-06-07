let webExtension = chrome || browser;

let protocolEntry = document.getElementById('settings-protocol-entry');
let protocolDropdown = document.getElementById('settings-protocol-dropdown');
let directoryEntry = document.getElementById('settings-directory-entry');

let settingsForm = document.getElementById('settings-form');

function saveSettings() {
  webExtension.storage.local.set({
    protocol: protocolEntry.value,
    directory: directoryEntry.value
  });
}

function fillSettings() {
  webExtension.storage.local.get(function (settings) {
    if (settings.protocol) {
      protocolEntry.value = settings.protocol;
      protocolDropdown.value = "custom";

      Array.from(protocolDropdown.options).forEach(option => {
        if (option.value == settings.protocol) {
          protocolDropdown.value = settings.protocol;
          protocolEntry.classList.add('hidden');
        }
      });
    } else {
      protocolEntry.classList.add('hidden');
    }

    if (settings.directory) {
      directoryEntry.value = settings.directory;
    }
  });
}

function setListeners() {
  protocolDropdown.addEventListener('change', function(e) {
    let selectedEditorProtocol = e.target.value;

    if (selectedEditorProtocol == 'custom') {
      protocolEntry.classList.remove('hidden');
      protocolEntry.value = '';
      protocolEntry.focus();
    } else {
      protocolEntry.classList.add('hidden');
      protocolEntry.value = selectedEditorProtocol;
    }
  });

  protocolEntry.addEventListener('change', function(e) {
    e.target.classList.remove('invalid');
  })

  settingsForm.addEventListener('submit', function(e) {
    if (protocolEntry.value.match(/^[^:]+(?=:\/\/)/)) {
      saveSettings();
    } else {
      protocolEntry.classList.add('invalid');
      e.preventDefault();
    }
  });
}

setListeners();
fillSettings();
