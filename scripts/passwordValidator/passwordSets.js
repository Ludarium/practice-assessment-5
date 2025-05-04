'use strict'

function SymbolSet(name, pattern) {
    this.name = name;
    this.pattern = pattern;
};

const smallLatinSet = new SymbolSet('small latin', new RegExp(/[a-z]/g));
const bigLatinSet = new SymbolSet('big latin', new RegExp(/[A-Z]/g));
const numberSet = new SymbolSet('number', new RegExp(/\d/g));
const extraSymbolSet = new SymbolSet('symbols', new RegExp(/[!№;%:_]/g));


export { smallLatinSet, bigLatinSet, numberSet, extraSymbolSet };