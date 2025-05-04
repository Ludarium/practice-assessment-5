'use strict';

import { expect } from 'chai';
import handlePassword from '../scripts/passwordValidator/passwordHandler.js';
import * as passwordSet from '../scripts/passwordValidator/passwordSets.js';

describe('Unit Tests', () => {
  // positive case with a password containing enough small latin letters
  it('should return success for valid password with enough small latin letters', () => {
    const password = 'abcdefghijklmnop'; // 16 characters, all small latin
    const result = handlePassword('smallLatinSet', password);
    
    expect(result).to.be.an('object');
    expect(result.success).to.be.true;
    expect(result).to.not.have.property('reason');
  });

  // positive case with a password containing enough capital latin letters
  it('should return success for valid password with enough capital latin letters', () => {
    const password = 'ABCDEFGHIJKLmnop'; // 16 characters, 12 capital latin
    const result = handlePassword('bigLatinSet', password);
    
    expect(result).to.be.an('object');
    expect(result.success).to.be.true;
    expect(result).to.not.have.property('reason');
  });

  // positive case with a password containing enough numbers
  it('should return success for valid password with enough numbers', () => {
    const password = '1234567890ABcd'; // 14 characters, 10 numbers
    const result = handlePassword('numberSet', password);
    
    expect(result).to.be.an('object');
    expect(result.success).to.be.true;
    expect(result).to.not.have.property('reason');
  });

  // positive case with a password containing enough special symbols
  it('should return success for valid password with enough special symbols', () => {
    const password = '!№;%:_!№;%:_abc'; // 14 characters, 10 special symbols
    const result = handlePassword('extraSymbolSet', password);
    
    expect(result).to.be.an('object');
    expect(result.success).to.be.true;
    expect(result).to.not.have.property('reason');
  });

  // negative case with a password of insufficient length
  it('should return failure for password with insufficient length', () => {
    const password = 'abc123'; // Only 6 characters, less than minimum 12
    const result = handlePassword('smallLatinSet', password);
    
    expect(result).to.be.an('object');
    expect(result.success).to.be.false;
    expect(result.reason).to.equal('Minimum password length is 12 symbols.');
  });

  // negative case with a password containing insufficient symbols from selected set
  it('should return failure when password has insufficient symbols from selected set', () => {
    const password = 'ABCabc123!№;%'; // 12 characters, but only 3 capital latin (ABC)
    const result = handlePassword('bigLatinSet', password);
    
    expect(result).to.be.an('object');
    expect(result.success).to.be.false;
    expect(result.reason).to.equal('Minimum quantity of symbols from set is 4 symbols.');
  });

  // edge case properly handling whitespace in password by trimming it
  it('should properly handle whitespace in password by trimming it', () => {
    const password = '   1234567890!№   '; // trimming: 12 characters, 10 numbers
    const result = handlePassword('numberSet', password);
    
    expect(result).to.be.an('object');
    expect(result.success).to.be.true;
    expect(result).to.not.have.property('reason');
  });
});