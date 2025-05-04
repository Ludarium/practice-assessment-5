'use strict'
import * as passwordSet from './passwordSets.js';

/* 
Keep in mind that there are 4 symbol groups:
numbers, small latin, big latin, !№;%:_.
The minimum length of password is 12
The minimum number of correct symbols per password is 4 
*/

const passwordRequirements = {
    minLength: 12,
    minNumberOfSetSymbols: 4,
};

function handlePassword(choosenSet, password) {
    const setToHandle = passwordSet[choosenSet];
    if (!setToHandle) {
        throw new Error(`Set "${choosenSet}" is not found in passwordSet`);
    }

    const filteredPassword = password.trim();
    const matchedSymbols = filteredPassword.match(setToHandle.pattern) || [];

    const isLengthValid = filteredPassword.length >= passwordRequirements.minLength;
    if(!isLengthValid) return {
        success: false,
        reason: `Minimum password length is ${passwordRequirements.minLength} symbols.`
    };

    const hasEnoughSymbols = matchedSymbols.length >= passwordRequirements.minNumberOfSetSymbols;
    if(!hasEnoughSymbols) return {
        success: false,
        reason: `Minimum quantity of symbols from set is ${passwordRequirements.minNumberOfSetSymbols} symbols.`
    };

    return { success: true };
    
}

export {handlePassword as default};

