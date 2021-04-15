const longestStr = (text) => {
	let result = '';
	
	for(let i = 0; i < text.length; i++) {
		for(let j = i + 1; j <= text.length; j++) {
			const targetStr = text.slice(i, j);
            if(targetStr === targetStr.split('').reverse().join('')
                && targetStr.length > String.length) {
			   result = targetStr;
			}
		}
    }
    return result;
}

console.log(longestStr('cbbdacdca'));
