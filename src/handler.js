document.addEventListener('DOMContentLoaded', function() {
console.log('DOM loaded');
////////////////////////////////////////////////////////
let quickMenu = document.getElementById('quickMenu');
let quickMenuSearchBar = document.getElementById('searchBar'); 
let quickMenuSearchResults = document.getElementById('SearchResults');

function showQuickMenu() {
    quickMenu.classList.add('show');
}
function hideQuickMenu() {
    quickMenu.classList.remove('show');
}

function updateSearch(input) {
    //srach for 1/1 match inputs
    
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

showQuickMenu();
////////////////////////////////////////////////////////
});