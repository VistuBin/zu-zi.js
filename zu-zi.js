// zu-zi.js
// v202309132220
// https://github.com/Hulenkius/zu-zi.js

(function () {
	// 使用正则表达式匹配文本中的尖括号 ⟨⟩ 包围的内容
	const expressionRegex = /⟨(.*?)⟩/g;
      
	// 找到页面中的所有元素节点
	const elementNodes = document.createTreeWalker(
	  document.body,
	  NodeFilter.SHOW_ELEMENT,
	  null,
	  false
	);
      
	let hasConvertedText = false; // 用于标记是否有已转换成图片的文本
      
	// 遍历每个元素节点
	while (elementNodes.nextNode()) {
	  const element = elementNodes.currentNode;
	  let modifiedText = element.innerHTML;
      
	  // 使用正则表达式匹配元素节点中的表达式
	  const matches = element.innerHTML.matchAll(expressionRegex);
      
	  for (const match of matches) {
	    const expression = match[0]; // 获取整个匹配项，包括 ⟨⟩
	    const innerExpression = match[1]; // 获取尖括号内的表达式
      
	    // 判断表达式中是否包含特定字符
	    const hasSpecialCharacters = /[⿰⿱⿲⿳⿴⿵⿶⿷⿸⿹⿺⿻⿼⿽⿾⿿㇯]/.test(innerExpression);
      
	    // 构建图像地址和 class 名称
	    let imageUrl = '';
	    let className = '';
	    if (hasSpecialCharacters) {
	      const codePoints = Array.from(innerExpression)
		.map(char => char.codePointAt(0).toString(16).toLowerCase())
		.join('-u');
	      imageUrl = `https://glyphwiki.org/glyph/u${codePoints}.svg`;
	      className = 'zi';
	    } else if (innerExpression.includes('[')) {
	      // 移除尖括号和方括号，直接使用内容作为链接
	      const cleanedExpression = innerExpression.replace(/[\[\]]/g, '');
	      imageUrl = `https://glyphwiki.org/glyph/${cleanedExpression}.svg`;
	      className = 'zi';
	    } else {
	      const codePoints = Array.from(innerExpression)
		.map((char) => char.codePointAt(0).toString(16).toLowerCase())
		.join('-');
	      imageUrl = `https://seeki.vistudium.top/SVG/${codePoints}.svg`;
	      className = 'plgo';
	    }
      
	    // 创建一个新的 <img> 元素
	    const img = document.createElement('img');
	    img.src = imageUrl;
	    img.className = className;
      
	    // 将原始表达式保存为自定义属性
	    img.setAttribute('data-original-expression', innerExpression);
      
	    // 将匹配的表达式替换为对应的图像
	    modifiedText = modifiedText.replace(expression, img.outerHTML);
	    hasConvertedText = true; // 标记为已转换文本
	  }
      
	  // 更新元素节点的内容
	  if (modifiedText !== element.innerHTML) {
	    element.innerHTML = modifiedText;
	  }
	}
      
	// 添加复制事件监听器
	document.addEventListener('copy', function (event) {
	  const selection = window.getSelection();
	  if (selection.rangeCount > 0) {
	    const range = selection.getRangeAt(0);
	    const container = document.createElement('div');
	    container.appendChild(range.cloneContents());
      
	    // 替换复制的内容，将 SVG 图像替换为原始文本
	    const images = container.querySelectorAll('.zi, .plgo');
	    for (const image of images) {
	      const originalExpression = image.getAttribute('data-original-expression');
	      const textNode = document.createTextNode(`⟨${originalExpression}⟩`);
	      image.replaceWith(textNode);
	    }
      
	    // 保留换行信息
	    const brElements = container.querySelectorAll('br');
	    for (const brElement of brElements) {
	      brElement.outerHTML = '\n'; // 用换行符替换<br>
	    }
      
	    event.clipboardData.setData('text/plain', container.textContent);
      
	    // 阻止默认复制操作
	    event.preventDefault();
	  }
	});
      })();
      