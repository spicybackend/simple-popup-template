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
    let popupSettings = settings.examplePopupSettings;

    if (popupSettings.toggle)
      toggle.checked = popupSettings.toggle;

    if (popupSettings.dropdown)
      dropdown.value = popupSettings.dropdown

    if (popupSettings.entry)
      entry.value = popupSettings.entry;
  });
}

function setListeners() {
  settingsForm.addEventListener('submit', function(e) {
    saveSettings();
  });
}

setListeners();
fillSettings();
