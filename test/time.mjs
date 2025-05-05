'use strict';

import { expect } from 'chai';
import handlePassword from '../scripts/passwordValidator/passwordHandler.js';

const passwordLengths = [12, 20, 50, 100, 250, 500, 1000, 5000];

function generatePassword(length, type = 'small') {
  let chars = '';
  switch(type) {
    case 'small':
      chars = 'abcdefghijklmnopqrstuvwxyz';
      break;
    case 'big':
      chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      break;
    case 'numbers':
      chars = '0123456789';
      break;
    case 'symbols':
      chars = '!№;%:_';
      break;
    default:
      chars = 'abcdefghijklmnopqrstuvwxyz';
  }
  
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function measureExecutionTime(func) {
    const start = performance.now();
    func();
    return performance.now() - start;
}

describe('Performance Tests for small latin set', () => {
    it('should measure performance of small latin set for different password lengths', () => {
      const setToTest = 'smallLatinSet';
      const results = {};
      
      console.log('\nSmall Latin Set:');
      console.log('-------------------------------');
      console.log('Password Length | Execution Time (ms)');
      console.log('-------------------------------');
      
      passwordLengths.forEach(length => {
        const password = generatePassword(length);
        const iterations = 50;
        let totalTime = 0;
        
        for (let i = 0; i < iterations; i++) {
          totalTime += measureExecutionTime(() => {
            handlePassword(setToTest, password);
          });
        }
        const avgTime = totalTime / iterations;
        results[length] = avgTime;
        console.log(`${length.toString().padEnd(15)} | ${avgTime.toFixed(6)}`);
      });
      console.log('-------------------------------');
    });
    
});

describe('Performance Tests for big latin set', () => {
    it('should measure performance of big latin set for different password lengths', () => {
      const setToTest = 'bigLatinSet';
      const results = {};
      
      console.log('\nBig Latin Set:');
      console.log('-------------------------------');
      console.log('Password Length | Execution Time (ms)');
      console.log('-------------------------------');
      
      passwordLengths.forEach(length => {
        const password = generatePassword(length, 'big');
        const iterations = 50;
        let totalTime = 0;
        
        for (let i = 0; i < iterations; i++) {
          totalTime += measureExecutionTime(() => {
            handlePassword(setToTest, password);
          });
        }
        const avgTime = totalTime / iterations;
        results[length] = avgTime;
        console.log(`${length.toString().padEnd(15)} | ${avgTime.toFixed(6)}`);
      });
      console.log('-------------------------------');
    });
    
});