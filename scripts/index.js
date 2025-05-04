'use strict'

const scriptsToLoad = {
    "home": "homePage.js",
    "verifying": "verifyingPage.js",
};

const currentPage = document.body.dataset.page;
import(`./${scriptsToLoad[currentPage]}`).then(script => script.init());

