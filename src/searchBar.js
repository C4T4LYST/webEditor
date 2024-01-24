
let searchResults = [];
let searchBarOptions = [];
let searchResultsSelectedIndex = 0;

function addSearchOption(displayName, searchFunction) {
    searchBarOptions.push({displayName: displayName.toLowerCase(), searchFunction: searchFunction});
}

addSearchOption('template0', () => {

    let afg = document.createElement('event-mousemove');
    Editor.appendChild(afg);

    let strIn = document.createElement('string-input-block');
    Editor.appendChild(strIn);
    strIn.setPosition(70, 300);

    let gfk = document.createElement('console-log-block');
    gfk.setPosition(300, 250);
    Editor.appendChild(gfk);

    let startEvent = document.createElement('start-event-block');
    startEvent.setPosition(300, 100);
    Editor.appendChild(startEvent);

});

addSearchOption('Create Start event', () => {
    let startEvent = document.createElement('start-event-block');
    Editor.appendChild(startEvent);
});

addSearchOption('Create String input', () => {
    let stringInput = document.createElement('string-input-block');
    Editor.appendChild(stringInput);
});

addSearchOption('Create Console log', () => {
    let consoleLog = document.createElement('console-log-block');
    Editor.appendChild(consoleLog);
});

addSearchOption('Create onMouseMovEvent', () => {
    let onMouseMove = document.createElement('event-mousemove');
    Editor.appendChild(onMouseMove);
});