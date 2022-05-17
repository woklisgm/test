const serilize = (arr) => {
	const main = Math.trunc(arr.length * 10 / 8);	
	const remainder = (arr.length * 10) - (main * 8);
	const remainderBytes = Math.ceil(remainder / 8);

	// + 1 байт для хранения arr.length т.к. возможны добавочные биты
	const buffer = new ArrayBuffer(main + remainderBytes);
	const uint8Buffer = new Uint8Array(buffer);

	let arrPoint = 0
	let iteration = 0;

	for (let i = 0; i < uint8Buffer.length; i++) { 
		if (iteration === 0) {
			uint8Buffer[i] = (arr[arrPoint] >> 2);
			iteration += 1;
			arrPoint += 1;
			continue;
		}
		if (iteration === 1) {
			let leftPart = (arr[arrPoint - 1] & 3) << 6; 
			let rightPart = (arr[arrPoint] >>> 4);
			uint8Buffer[i] = leftPart | rightPart;
			iteration += 1;
			continue;
		}
		if (iteration === 2) {
			let leftPart = (arr[arrPoint] & 15) << 4; // 
			let rightPart =  (arr[arrPoint + 1] >>> 6);

			uint8Buffer[i] = leftPart | rightPart;
			iteration += 1;
			arrPoint += 1;
			continue;
		}
		if (iteration === 3) {
			let leftPart = (arr[arrPoint] & 63) << 2; 
			let rightPart =  (arr[arrPoint + 1] >>> 8);
			uint8Buffer[i] = leftPart | rightPart;
			iteration += 1;
			arrPoint += 1;
			continue;
		}
		if (iteration === 4) {
			uint8Buffer[i] = arr[arrPoint];
			arrPoint += 1;
			iteration = 0;
		}
	}

	let serializedString = '';
	for (let i = 0; i < uint8Buffer.length;) {
		const left = uint8Buffer[i] << 8;
		const right = (i + 1 < uint8Buffer.length) 
			? uint8Buffer[i + 1]
			: 0;
		const code = left + right;

		i = (i + 1 < uint8Buffer.length) ? i + 2 : i + 1;
		serializedString = serializedString.concat(String.fromCharCode(code));
	}

	// последний символ длина массива
	serializedString = serializedString.concat(String.fromCharCode(uint8Buffer.length))

	return serializedString;
}

module.exports = serilize;