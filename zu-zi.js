// zu-zi.js
// v202411121249
// https://github.com/Hulenkius/zu-zi.js

(function () {
	// 使用正则表达式匹配文本中的尖括号 ⟨⟩ 包围的内容
	const expressionRegex = /⟨(.*?)⟩/g;
	const specialCharRegex = /[⿰⿱⿲⿳⿴⿵⿶⿷⿸⿹⿺⿻⿼⿽⿾⿿㇯]/;
	const elementNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null, false);
	let hasConvertedText = false;

	while (elementNodes.nextNode()) {
		const element = elementNodes.currentNode;
		let modifiedText = element.innerHTML;
		const matches = element.innerHTML.matchAll(expressionRegex);

		for (const match of matches) {
			const expression = match[1];
			let imageUrl = '';
			let className = 'zi';

			if (expression.includes('?')) {
				imageUrl = `http://zu.zi.tools/${expression.replace(/[‹›\?]/g, '')}.svg`;
			} else if (specialCharRegex.test(expression)) {
				imageUrl = `https://glyphwiki.org/glyph/u${Array.from(expression).map(char => char.codePointAt(0).toString(16).toLowerCase()).join('-u')}.svg`;
			} else if (expression.includes('#')) {
				imageUrl = `https://seeki.vistudium.top/SEAL/${Array.from(expression.replace(/[‹›\#]/g, '')).map(char => char.codePointAt(0).toString(16).toLowerCase())}.svg`;
				className = 'zi-zhuan';
			} else if (expression.includes('[')) {
				imageUrl = `https://glyphwiki.org/glyph/${expression.replace(/[‹›\[\]]/g, '')}.svg`;
			} else {
				imageUrl = `https://seeki.vistudium.top/SVG/${Array.from(expression).map(char => char.codePointAt(0).toString(16).toLowerCase()).join('-')}.svg`;
				className = 'plgo';
			}

			const img = document.createElement('img');
			img.src = imageUrl;
			img.className = className;
			img.setAttribute('data-original-expression', expression);

			const transparentSpan = `<span style="opacity: 0; width: 1em; font-size:0px">${expression}</span>`;
			modifiedText = modifiedText.replace(match[0], img.outerHTML + transparentSpan);
			hasConvertedText = true;
		}

		if (modifiedText !== element.innerHTML) {
			element.innerHTML = modifiedText;
		}
	}
})();
