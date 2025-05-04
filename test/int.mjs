'use strict';

import { expect } from 'chai';
import handlePassword from '../scripts/passwordValidator/passwordHandler.js';
import * as passwordSet from '../scripts/passwordValidator/passwordSets.js';

describe('Integration Tests', () => {

    it('should successfully validate passwords against all available symbol sets', () => {
      const testCases = [
        {
          setName: 'smallLatinSet',
          password: 'abcdefghijklmnopqrst',
          expectedResult: { success: true }
        },
        {
          setName: 'bigLatinSet',
          password: 'ABCDEFGHIJKLMNOPQRST',
          expectedResult: { success: true }
        },
        {
          setName: 'numberSet',
          password: '12345678901234567890',
          expectedResult: { success: true }
        },
        {
          setName: 'extraSymbolSet',
          password: '!№;%:_!№;%:_!№;%:_',
          expectedResult: { success: true }
        }
      ];
      
      expect(passwordSet).to.have.property('smallLatinSet');
      expect(passwordSet).to.have.property('bigLatinSet');
      expect(passwordSet).to.have.property('numberSet');
      expect(passwordSet).to.have.property('extraSymbolSet');
      testCases.forEach(testCase => {
        const result = handlePassword(testCase.setName, testCase.password);
        expect(result).to.deep.equal(testCase.expectedResult);
      });
    });
  
    it('should correctly match symbols according to set definitions', () => {
      const complexPassword = 'abcDEF123!№;%:_';

      const smallLatinMatches = complexPassword.match(passwordSet.smallLatinSet.pattern) || [];
      expect(smallLatinMatches).to.have.lengthOf(3); // a, b, c
      
      const bigLatinMatches = complexPassword.match(passwordSet.bigLatinSet.pattern) || [];
      expect(bigLatinMatches).to.have.lengthOf(3); // D, E, F
      
      const numberMatches = complexPassword.match(passwordSet.numberSet.pattern) || [];
      expect(numberMatches).to.have.lengthOf(3); // 1, 2, 3
      
      const symbolMatches = complexPassword.match(passwordSet.extraSymbolSet.pattern) || [];
      expect(symbolMatches).to.have.lengthOf(6); // !, №, ;, %, :, _
      
      expect(handlePassword('smallLatinSet', complexPassword).success).to.be.false; // 3 small latin chars
      expect(handlePassword('bigLatinSet', complexPassword).success).to.be.false; // 3 big latin chars
      expect(handlePassword('numberSet', complexPassword).success).to.be.false; // 3 numbers
      expect(handlePassword('extraSymbolSet', complexPassword).success).to.be.true; // 6 special symbols, which is > 4
    });
  
    // Check error handling when providing invalid set name
    it('should throw an error when using non-existent symbol set', () => {
      const password = 'test12345678';
      expect(() => handlePassword('nonExistentSet', password)).to.throw(Error);
      expect(() => handlePassword('smallLatinSet', password)).to.not.throw();
      expect(() => handlePassword('bigLatinSet', password)).to.not.throw();
      expect(() => handlePassword('numberSet', password)).to.not.throw();
      expect(() => handlePassword('extraSymbolSet', password)).to.not.throw();
    });
  });