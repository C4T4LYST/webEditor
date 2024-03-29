
let searchResults = [];
let searchBarOptions = [];
let searchResultsSelectedIndex = 0;

function addSearchOption(displayName, searchFunction) {
    searchBarOptions.push({displayName: displayName.toLowerCase(), searchFunction: searchFunction});
}

addSearchOption('template0', () => {
    let afg = document.createElement('event-mousemove');
    Editor.appendChild(afg);

    let dsse = document.createElement('object-simple-deserializer'); 
    dsse.setPosition(250, 230);
    Editor.appendChild(dsse);

    let strIn = document.createElement('string-input-block');
    Editor.appendChild(strIn);
    strIn.setPosition(0, 260);

    let gfk = document.createElement('console-log-block');
    gfk.setPosition(800, 200);
    Editor.appendChild(gfk);

    let extender = document.createElement('extender-simple-block');
    extender.setPosition(660, 280);
    Editor.appendChild(extender);

    let ObjectModifier = document.createElement('object-simple-modifyer');
    ObjectModifier.setPosition(460, 200);
    Editor.appendChild(ObjectModifier);
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

addSearchOption('Create Object deserializer', () => {
    let objDeserializer = document.createElement('object-simple-deserializer');
    Editor.appendChild(objDeserializer);
});