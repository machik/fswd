console.log('\n\n1.');
function isString(str) {
	return typeof str === 'string';
}
console.log(isString('hello')); // => true
console.log(isString(['hello'])); // => false
console.log(isString('this is a long sentence')); // => true
console.log(isString({ a: 2 })); // => false

console.log('\n\n2.');
function isArray(arr) {
	return Array.isArray(arr);
}
console.log(isArray('hello')); // => false
console.log(isArray(['hello'])); // => true
console.log(isArray([2, {}, 10])); // => true
console.log(isArray({ a: 2 })); // => false

console.log('\n\n3.');
function areSameType(arr) {
	const getType = value => {
		if(typeof value === 'object' && isArray(value)) 
			return 'array';
		return typeof value;
	};
	const firstElementType = getType(arr[0]);
	for(let i=1; i<arr.length; i++) {
		if(getType(arr[i]) !== firstElementType)
			return false;
	}
	return true;
}

console.log(areSameType(['hello', 'world', 'long sentence'])); // => true
console.log(areSameType([1, 2, 9, 10])); // => true
console.log(areSameType([['hello'], 'hello', ['bye']])); // => false
console.log(areSameType([['hello'], [1, 2, 3], [{ a: 2 }]])); // => true


console.log('\n\n4. ');
function longest(st1, st2) {
	const joinedSt = (st1 + st2).split('').sort((a, b) => a > b ? 1 : -1);
	
	return joinedSt.reduce((acc, v) => {
		if(acc.indexOf(v) === -1)
			acc += v;
		return acc;
	});
}

a = 'xyaabbbccccdefww'
b = 'xxxxyyyyabklmopq'
console.log(longest(a, b)); // => 'abcdefklmopqwxy'

a = 'abcdefghijklmnopqrstuvwxyz'
console.log(longest(a, a)); // => 'abcdefghijklmnopqrstuvwxyz'

console.log('\n\n5. ');
function convert(num) {
	const numbers = num.toString().split('');
	return numbers.sort((a, b) => a > b ? -1 : 1);
}

console.log(convert(429563)); // => [9, 6, 5, 4, 3, 2]
console.log(convert(324)); // => [4, 3, 2]

console.log('\n\n6.');
function countReps(arr) {
	let output = {};
	arr.forEach(v => {
		if(!output[v])
			output[v] = 1;
		else
			output[v]++;
	});
	return output;
}

console.log(countReps(['kerouac', 'fante', 'fante', 'buk', 'hemingway', 'hornby', 'kerouac', 'buk', 'fante']));

console.log('\n\n7. ');
function isCaught(str) {
	let input = str.toLowerCase();
	return input.indexOf('m') - input.indexOf('c') <= 3;
}

console.log(isCaught('C.....m')); // => false
console.log(isCaught('C..m')); // => true
console.log(isCaught('..C..m')); // => true

console.log('\n\n8.');

function splitTheBill(obj) {
	let output = {};
	const average = Object.values(obj).reduce((a, b) => a+b)/Object.values(obj).length;
	Object.keys(obj).forEach(key => output[key] = average - obj[key]);
	return output;
}
//  var avg = Object.values(group).reduce(function(acc, val, index, values) {
//     return acc + (val / values.length);
//   }, 0);

var group = {
    Amy: 20,
    Bill: 15,
    Chris: 10
}

console.log(splitTheBill(group));		// => { Amy: -5, Bill: 0, Chris: 5 }


console.log('\n\n9. ');

function exp(b, e) {
	if(e === 0)
		return 1;
	return b * exp(b, e-1);
}

console.log(exp(5, 3)); // => 125
console.log(exp(2, 4)); // => 16
console.log(exp(5, 1)); // => 5
console.log(exp(6, 0)); // => 1


console.log('\n\n10.');
function factorial(num) {
	if(num === 0)
		return 1;
	return num * factorial(num-1);
}

console.log(factorial(5)); // => 120
console.log(factorial(4)); // => 24
console.log(factorial(0)); // => 1

console.log('\n\n11.');
function fibs(n) { 
	if(n === 1)
		return [0];
	let arr = [0, 1];
	while(arr.length < n)
		arr.push(arr[arr.length-1] + arr[arr.length-2])
	
	return arr;
}


function fibsRec(n) {
  if (n === 1)
    return [0];
  if (n === 2)
    return [0, 1];

  var prevFibs = fibs(n - 1);
  var lastIndex = prevFibs.length - 1;

  return prevFibs.concat([prevFibs[lastIndex] + prevFibs[lastIndex - 1]]);
}

console.log(fibs(3)); // => [0, 1, 1]
console.log(fibs(7)); // => [0, 1, 1, 2, 3, 5, 8]
console.log(fibs(1)); // => [0

console.log('\n\n12.');
function zeroSum(arr) {
	let output = [];
	// it takes an integer number 3/2 ==> 1
	for(let i=0; i < arr.length/2; i++) {
		if(arr[i] !== 0 && arr.indexOf(-arr[i]) > -1) 			
			output.push([i, arr.indexOf(-arr[i])]);
	}
	return output;
}

console.log(zeroSum([1, 5, 0, -5, 3, -1])); // => [[0, 5], [1, 3]]
console.log(zeroSum([1, -1])); // => [[0, 1]]
console.log(zeroSum([0, 4, 3, 5])); // => []