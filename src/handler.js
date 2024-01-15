document.addEventListener('DOMContentLoaded', function() {
console.log('DOM loaded');
////////////////////////////////////////////////////////
let quickMenu = document.getElementById('quickMenu');
let quickMenuSearchBar = document.getElementById('searchBar'); 
let quickMenuSearchResults = document.getElementById('SearchResults');



function updateSearch(input) {
    input = input.toLowerCase();
    //srach for 1/1 match inputs
    let resultFirst = searchBarOptions.filter(option => option.displayName === input);
    //search for partial match inputs
    let resultSecond = searchBarOptions.filter(option => option.displayName.includes(input));
    //Search for most matched letters
    let resultsThird = searchBarOptions.map(option => {
        let matchesCount = 0;
        for (let i = 0; i < input.length; i++) {
            if(option.displayName.length < input.length) {
                break;
            }

            if (option.displayName.split('').includes(input[i])) {
                matchesCount++;
            }
        }

        return {displayName: option.displayName, searchFunction: option.searchFunction, matchesCount: matchesCount};
    }).sort((a, b) => b.matchesCount - a.matchesCount).filter(option => option.matchesCount > 0);

    let results = [...resultFirst, ...resultSecond, ...resultsThird];

    let inListAlready = [];
    results = results.filter(result => {
        if (inListAlready.includes(result.displayName)) {
            return false;
        }
        else {
            inListAlready.push(result.displayName);
            return true;
        }
    });

    //cap 10 results
    results = results.slice(0, 10);

    quickMenuSearchResults.innerHTML = '';
    searchResults = [];

    results.forEach(result => {
        let resultElement = document.createElement('p');
        resultElement.classList.add('searchResult');
        resultElement.innerText = result.displayName;
        resultElement.addEventListener('click', function() {
            result.searchFunction();
            hideQuickMenu();
        });

        quickMenuSearchResults.appendChild(resultElement);
        searchResults.push(resultElement);
    });
}

quickMenuSearchBar.addEventListener('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
    event.stopImmediatePropagation();
});

quickMenuSearchBar.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        hideQuickMenu();
    }
    else if (event.key === 'Enter') {
        searchResults[searchResultsSelectedIndex].click();
        hideQuickMenu();
    }
    else if (event.key === 'ArrowUp') {
        if (searchResultsSelectedIndex > 0) {
            searchResultsSelectedIndex--;
            searchResults[searchResultsSelectedIndex].classList.add('selected');
            searchResults[searchResultsSelectedIndex + 1].classList.remove('selected');
        }
    }
    else if (event.key === 'ArrowDown') {
        if (searchResultsSelectedIndex < searchResults.length - 1) {
            searchResultsSelectedIndex++;
            searchResults[searchResultsSelectedIndex].classList.add('selected');
            searchResults[searchResultsSelectedIndex - 1].classList.remove('selected');
        }
    }
    else {
        updateSearch(quickMenuSearchBar.value);
    }
});

quickMenuSearchResults.addEventListener('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
    event.stopImmediatePropagation();
});

quickMenu.addEventListener('click', function(event) {
    hideQuickMenu();
});

document.addEventListener('keydown', function(event) {
    if (event.altKey && event.key === 'x') {
        showQuickMenu();
        quickMenuSearchBar.focus();
    }
});


document.getElementById('Start', () => {
    let StartEvents = document.querySelectorAll('start-event-block');
    if(StartEvents.length == 0) {
        throw new Error('No start event found');
    }
    else if(StartEvents.length > 1) {
        console.error('Multiple start events found');
    }

    Array.from(StartEvents).forEach(StartEvent => {
        StartEvent.run();
    });
});
////////////////////////////////////////////////////////
});

