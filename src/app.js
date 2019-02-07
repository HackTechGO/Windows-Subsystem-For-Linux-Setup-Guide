'use strict';

/*
    This has 2 primary functions:
        1. Allow the user to click on either a check box, or the 
            label ( the words ) for that check box
        
        2. Manages local storage. Some what hacky implementation, but reduces a 
            for loop cycle.
*/


//Setup LocalStorage Caching to store progress.
var state = {};
var fLocalStorage = false;
var labels = document.getElementsByTagName('label');

// Changes the state object, and updates the value in localStorage.
function changeState(label, status){
    state[label] = status;
    localStorage.state = JSON.stringify(state)
};


// If there is a local storage, reassign the previous state to the checkboxes.
if(localStorage.state){
    state = JSON.parse(localStorage.state);
    fLocalStorage = true;
    
    let boxes = document.getElementsByTagName('input')
    
    // When assiging each box, use the boxes name as the key
    // to retrieve the value from the state object
    for(let i = 0; i < boxes.length; i++){
        boxes[i].checked = state[boxes[i].name];    
    }
} 

// Sets handler to enable the user to click on the words or the box in order to check it. 
// Also initializes the first state if it hasn't already been sent to local storage.
for( let i = 0; i < labels.length; i++){

    // If no local storage yet, initialize a state object with keys matching the label names.
    if(!fLocalStorage) state[labels[i].htmlFor] = false;

    labels[i].addEventListener('click', e => {
        if(e.target.tagName === 'LABEL'){
            
            // Grab the input tag off the target.
            let checkbox = e.target.children[0];
            
            //Toggle check box when you click on any part of the .
            checkbox.checked = !checkbox.checked;
            changeState(labels[i].htmlFor, checkbox.checked)
        }
    });
};