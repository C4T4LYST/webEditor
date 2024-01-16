
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

addSearchOption('template', () => { 
    let startEvent = document.createElement('start-event-block');
    startEvent.setUp(100, 100);
    Editor.appendChild(startEvent);

    let consoloeLog0 = document.createElement('console-log-block');
    consoloeLog0.setUp(250, 220);
    Editor.appendChild(consoloeLog0);

    let consoleLog1 = document.createElement('console-log-block');
    consoleLog1.setUp(550, 220);
    Editor.appendChild(consoleLog1);
});