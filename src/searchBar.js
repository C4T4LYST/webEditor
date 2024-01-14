
let searchResults = [];
let searchBarOptions = [];

function addSearchOption(displayName, searchFunction) {
    searchBarOptions.push({displayName: displayName, searchFunction: searchFunction});
}

addSearchOption('Create start point', () => {});