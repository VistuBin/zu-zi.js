// zu-zi.js
// v202309111507
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
      
	// 遍历每个元素节点
	while (elementNodes.nextNode()) {
	  const element = elementNodes.currentNode;
	  let modifiedText = element.innerHTML;
      
	  // 使用正则表达式匹配元素节点中的表达式
	  const matches = element.innerHTML.matchAll(expressionRegex);
      
	  for (const match of matches) {
	    const expression = match[1];
      
	    // 判断表达式中是否包含特定字符
	    const hasSpecialCharacters = /[⿰⿱⿲⿳⿴⿵⿶⿷⿸⿹⿺⿻]/.test(expression);
      
	    // 构建图像地址和 class 名称
	    let imageUrl = '';
	    let className = '';
	    if (hasSpecialCharacters) {
	      const codePoints = Array.from(expression).map(char => char.codePointAt(0).toString(16)).join('-u');
	      imageUrl = `https://glyphwiki.org/glyph/u${codePoints}.svg`;
	      className = 'zi';
	    } else if (expression.includes('[')) {
	      // 移除尖括号和方括号，直接使用内容作为链接
	      const cleanedExpression = expression.replace(/[⟨⟩\[\]]/g, '');
	      imageUrl = `https://glyphwiki.org/glyph/${cleanedExpression}.svg`;
	      className = 'zi';
	    } else {
	      const codePoints = Array.from(expression)
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
	    img.setAttribute('data-original-expression', expression);
      
	    // 将匹配的表达式替换为对应的图像
	    modifiedText = modifiedText.replace(match[0], img.outerHTML);
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
      
	    event.clipboardData.setData('text/plain', container.textContent);
      
	    // 阻止默认复制操作
	    event.preventDefault();
	  }
	});
      })();
      