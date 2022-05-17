const parse = (serializedStr) => {
	const countBytes = serializedStr.charCodeAt(serializedStr.length - 1);

	const buffer = new ArrayBuffer(countBytes);
	const uint8Buffer = new Uint8Array(buffer);

	let pointer = 0;
	for (let i = 0; i < serializedStr.length - 1; i++) {
		const char = serializedStr.charCodeAt(i);
		const left = char >> 8;
		const right = char & 255;
		uint8Buffer[pointer++] = left;
		uint8Buffer[pointer++] = right;
	}

	let resultArr = new Array();

	tmp = 0;
	iteration = 0;
	for (let i = 0; i < uint8Buffer.length; i++) {
		if (iteration === 0) {
			tmp = uint8Buffer[i] << 2;
			iteration += 1;
			continue;
		}
		if (iteration === 1) {
			tmp = tmp | (uint8Buffer[i] >> 6);
			resultArr.push(tmp);
			
			tmp = (uint8Buffer[i] & 63) << 4;
			iteration += 1;
			continue;
		}
		if (iteration === 2) {
			tmp = tmp | (uint8Buffer[i] >> 4)
			resultArr.push(tmp);
			
			tmp = (uint8Buffer[i] & 15) << 6;	// 4 _> 6
			iteration += 1;
			continue;
		}
		if (iteration === 3) {
			tmp = tmp | (uint8Buffer[i] >> 2)
			resultArr.push(tmp);

			tmp = (uint8Buffer[i] & 3) << 8;
			iteration += 1;
			continue;
		}
		if (iteration === 4) {
			tmp = tmp | uint8Buffer[i];
			resultArr.push(tmp);
			iteration = 0;
		}
	}

	return resultArr;
}

module.exports = parse;