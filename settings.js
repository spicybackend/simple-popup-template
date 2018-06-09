let webExtension = chrome || browser;

let protocolEntry = document.getElementById('settings-protocol-entry');
let protocolDropdown = document.getElementById('settings-protocol-dropdown');

let directoryEntry = document.getElementsByClassName('directory')[0];  // deprecated

let settingsForm = document.getElementById('settings-form');

function saveSettings() {
  webExtension.storage.local.set({
    protocol: protocolEntry.value,
    projects: buildProjectsFromSettings(),
    directory: directoryEntry.value  // deprecated
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
      directoryEntry.value = settings.directory;  // deprecated
    }

    if (settings.projects) {
      fillProjectSettings(settings.projects);
    }
  });
}

function buildProjectsFromSettings() {
  let projectForms = document.getElementsByClassName('project');

  let projects = Array.from(projectForms).map(function(projectForm) {
    let projectRepo = null;
    let projectDirectory = null;

    projectForm.childNodes.forEach(function(node) {
      if (node.tagName === "INPUT") {
        if (node.classList.contains('repository')) {
          projectRepo = node.value;
        } else if (node.classList.contains('directory')) {
          projectDirectory = node.value;
        }
      }
    })

    return {repository: projectRepo, directory: projectDirectory};
  });

  return projects.filter(function(project) {
    return project.repository || project.projectDirectory;
  });
}

function fillProjectSettings(projects) {
  projects.forEach(function(project) {
    lastProjectFields = Array.from(document.getElementsByTagName('fieldset')).slice(-1).pop();

    lastProjectFields.childNodes.forEach(function(node) {
      if (node.tagName === "INPUT") {
        if (node.classList.contains('repository')) {
          node.value = project.repository;
        } else if (node.classList.contains('directory')) {
          node.value = project.directory;
        }
      }
    })

    newProjectFields = lastProjectFields.cloneNode(true);
    newProjectFields.childNodes.forEach(function(node) {
      if (node.tagName === "INPUT") {
        node.value = null;
      }
    })

    lastProjectFields.parentNode.insertBefore(newProjectFields, lastProjectFields.nextSibling);
  })
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
