'use strict'
import handlePassword from "./passwordValidator/passwordHandler.js";

export function init() {

    // Automatically checks first set of symbols;
    const symbolSets = document.getElementsByName('symbolSet');
    symbolSets[0].checked = true;
    
    const inputField = document.getElementById('passwordInput');
    const submitButton = document.getElementById('submitButton');
    const resultDisplay = document.querySelector('.result-display');

    function renderResultMessage(parentElement, statusObject) {
        const {success, reason = null} = statusObject;

        const container = document.createElement('div');
        container.classList.add('result-display__container');

        const heading = document.createElement('h1');
        heading.classList.add('font-medium');

        const description = document.createElement('p');
        description.classList.add('font-regular');

        const style = success ? 'success' : 'failure';
        const title = success ? 'Success!' : "We've got an error!";
        const desc = success ? 'Well done, pal' : reason;
        container.classList.add(style);

        heading.innerText = title;
        description.innerText = desc;
        container.append(heading, description);

        parentElement.appendChild(container);
    } 

    function setResultVisibility(element) {
        element.classList.remove('show');
        void element.offsetWidth;  // force styles reload ??? 
        element.classList.add('show');
    }

    function renderResult(element, statusObject) {
        
        const isResultDisplayed = element.children.length > 0;
        if(isResultDisplayed) {
            element.innerHTML = '';
        }
        setResultVisibility(element)
        renderResultMessage(element, statusObject);
    }
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();

        const password = inputField.value;
        const selectedSet = document.querySelector('input[name="symbolSet"]:checked');

        inputField.value = '';
        const passwordResult = handlePassword(selectedSet.value, password);

        renderResult(resultDisplay, passwordResult);
        
    })
}