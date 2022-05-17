const parse = require('./parse');
const serilize = require('./serialize');

const getRandom = (min, max) => {
	return Math.trunc(Math.random() * (max - min) + min);
}

// тестовый массив массивов
const testArr = new Array(50).fill(0).map(e => new Array(199).fill(0));
for (let i = 0; i < testArr.length; i++) {
	testArr[i] = testArr[i].map(e => getRandom(1, 999));
}

// проверка
for (let i = 0; i < testArr.length; i++) {
	const serializedStr = serilize(testArr[i]);
	const result = parse(serializedStr);

	console.log(JSON.stringify(testArr[i]) === JSON.stringify(result));
}

// const arr = new Array(200).fill(999);
// const serializedStr = serilize(arr);
// const result = parse(serializedStr);

// console.log(serializedStr.length);


