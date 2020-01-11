// Roman Numeral Conversion
// Create a function that will either receive a string or integer as input.
// Given a string, return the integer value of the roman numeral
// Given an integer, return the equivalent roman numeral
// Roman Numeral values: 
// I ➞ 1
// V ➞ 5
// X ➞ 10
// L ➞ 50
// C ➞ 100
// D ➞ 500
// M ➞ 1000

"use strict";

let input = "IV";
let input1 = 45;
let input2 = "CLXXXII";
let input3 = 1666;

function romanNumerals(input) {
    // 2 sections of the code: number input, string input
    if (typeof(input) === 'number') {
        return decodeNumber(input);
    } else {
        return decodeString(input);
    }
}

// Number input: take each digit and convert to roman numerals, then concatenate all numerals
function decodeNumber(input) {
    const romanNumeralMap = {
        // thousands
        '1000': 'M',
        // hundreds
        '900': 'CM',
        '800': 'DCCC',
        '700': 'DCC',
        '600': 'DC',
        '500': 'D',
        '400': 'CD',
        '300': 'CCC',
        '200': 'CC',
        '100': 'C',
        // tens
        '90': 'XC',
        '80': 'LXXX',
        '70': 'LXX',
        '60': 'LX',
        '50': 'L',
        '40': 'XL',
        '30': 'XXX',
        '20': 'XX',
        '10': 'X',
        // units
        '9': 'IX',
        '8': 'VIII',
        '7': 'VII',
        '6': 'VI',
        '5': 'V',
        '4': 'IV',
        '3': 'III',
        '2': 'II',
        '1': 'I'
    }
    // take the input and decompose e.g. 45 => [40, 5]
    let numInArray = [];
    // string the input so it can be iterated through like an array
    const stringedInput = input.toString();
    for (let i in stringedInput) {
        // convert each digit by multiplying by the correct power of 10
        numInArray.push(stringedInput[i] * 10 ** (stringedInput.length - i - 1));
    }
    // loop through numInArray and get the numerals that correspond to the number
    let result = '';
    for (let num of numInArray) {
        result += romanNumeralMap[num];
    }
    return result;
}

// String input: determine cluster of numerals, then decode
function decodeString(input) {
    const romanNumeralMap = {
        // hundreds
        'CM': 900,
        'DCCC': 800,
        'DCC': 700,
        'DC': 600,
        'D': 500,
        'DC': 400,
        'CCC': 300,
        'CC': 200,
        'C': 100,
        // tens
        'XC': 90,
        'LXXX': 80,
        'LXX': 70,
        'LX': 60,
        'L': 50,
        'XL': 40,
        'XXX': 30,
        'XX': 20,
        'X': 10,
        // units
        'IX': 9,
        'VIII': 8,
        'VII': 7,
        'VI': 6,
        'V': 5,
        'IV': 4,
        'III': 3,
        'II': 2,
        'I': 1
    }
    const thousandsRegex = /M+/;
    const hundredsRegex = /[CD][CM]*((?=[ILVX])|$)/;
    const tensRegex = /[XL][CLX]*((?=[IV])|$)/;
    const unitsRegex = /[IV][IVX]*$/;
    
    let answer = 0;
    // get the thousands cluster
    if (thousandsRegex.test(input)) {
        // the match for thousands can be 'M', 'MM', 'MMM' etc
        // we simply need to multiply the length of the match by 1000
        answer += input.match(thousandsRegex)[0].length * 1000;
    }
    if (hundredsRegex.test(input)) {
        // look up the match in the map and add it to the answer
        answer += romanNumeralMap[input.match(hundredsRegex)[0]];
    }
    if (tensRegex.test(input)) {
        // look up the match in the map and add it to the answer
        answer += romanNumeralMap[input.match(tensRegex)[0]];
    }
    if (unitsRegex.test(input)) {
        // look up the match in the map and add it to the answer
        answer += romanNumeralMap[input.match(unitsRegex)[0]];
    }

    return answer;
}

console.log(romanNumerals(input));
// 4;

console.log(romanNumerals(input1));
// "XLV";

console.log(romanNumerals(input2));
// 182;

console.log(romanNumerals(input3));
// "MDCLXVI";