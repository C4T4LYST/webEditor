
let searchResults = [];
let searchBarOptions = [];
let searchResultsSelectedIndex = 0;

function addSearchOption(displayName, searchFunction) {
    searchBarOptions.push({displayName: displayName.toLowerCase(), searchFunction: searchFunction});
}

addSearchOption('Create start point', () => {});
addSearchOption('getElementsByName', () => {});
addSearchOption('getElementsByClassName', () => {});
addSearchOption('getElementsByTagName', () => {});
addSearchOption('querySelector', () => {});
addSearchOption('querySelectorAll', () => {});
addSearchOption('getElementById', () => {});

addSearchOption('getWindowName', () => {});
addSearchOption('getWindowLocation', () => {});
addSearchOption('getWindowHistory', () => {});

addSearchOption('While loop', () => {});
addSearchOption('For loop', () => {});
addSearchOption('For in loop', () => {});
addSearchOption('For of loop', () => {});
addSearchOption('Do while loop', () => {});
addSearchOption('Switch statement', () => {});
addSearchOption('If statement', () => {});

