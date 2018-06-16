let webExtension = chrome || browser;

let settingsForm = document.getElementById('settings-form');
let toggle = document.getElementById('settings-toggle');
let dropdown = document.getElementById('settings-dropdown');
let entry = document.getElementById('settings-entry');

function saveSettings() {
  webExtension.storage.local.set({
    'examplePopupSettings': {
      toggle: toggle.checked,
      dropdown: dropdown.value,
      entry: entry.value
    },
  });
}

function fillSettings() {
  webExtension.storage.local.get('examplePopupSettings', function (settings) {
    if (settings.toggle)
      toggle.checked = settings.toggle;

    if (settings.dropdown)
      dropdown.value = settings.dropdown

    if (settings.entry)
      entry.value = settings.entry;
  });
}

function setListeners() {
  settingsForm.addEventListener('submit', function(e) {
    saveSettings();
  });
}

setListeners();
fillSettings();
