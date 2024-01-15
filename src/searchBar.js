
let searchResults = [];
let searchBarOptions = [];
let searchResultsSelectedIndex = 0;

function addSearchOption(displayName, searchFunction) {
    searchBarOptions.push({displayName: displayName.toLowerCase(), searchFunction: searchFunction});
}

addSearchOption('Create Start event', () => {
    let startEvent = document.createElement('start-event-block');
    Editor.appendChild(startEvent);
});

addSearchOption('Create Console log', () => {
    let consoleLog = document.createElement('console-log-block');
    Editor.appendChild(consoleLog);
});

addSearchOption('Create string input', () => {
    let stringInput = document.createElement('string-input-block');
    Editor.appendChild(stringInput);
});
