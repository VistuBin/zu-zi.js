# zu-zi.js
網頁擴展字便捷顯示腳本

本腳本利用徧黑體 SVG 庫和 Glyphwiki，實現網頁擴展字的便捷顯示。

[DEMO](https://vistudium.top/1926/08/17/zu-zi/)

# 使用

在 html 中引用 zu-zi.js。

將擴展字用 ⟨⟩ 包起來（你也可以在 zu-zi.js 中查找替換爲其他符號），腳本會將其處理成徧黑體中的字形。徧黑體中未完成的字則會顯示爲國標宋體。返回的圖像帶有「class="plgo"」屬性。<br>
使用如：⟨𩽾⟩ ⟨𩾌⟩

將 IDS 表達式用 ⟨⟩ 包起來，腳本會將其處理成 Glyphwiki 中含有的字形。如果 Glyphwiki 中沒有此字，則會顯示成豆腐。返回的圖像帶有「class="zi"」屬性。<br>
使用如：⟨⿰石㐫⟩

將 IDS 表達式用 ⟨⟩ 包起來，并在 IDS 之前輸入一個半角問號 ?，腳本會使用字統網組字引擎拼合字形。返回的圖像帶有「class="zi"」屬性。<br>
使用如：⟨?⿰石㐫⟩

將 Glyphwiki 字形名用 ⟨[]⟩ 包起來，腳本會將其處理成 Glyphwiki 中含有的同名字形。返回的圖像帶有「class="zi"」屬性。<br>
使用如：⟨[dkw-27743]⟩ ⟨[u24756@12]⟩ ⟨[hulenkius_chujian-ly]⟩

複製以上內容的結果將不會是圖片，而是 ⟨⟩ 中的內容（不含 ⟨⟩ 本身）。

爲了圖片顯示美觀、文本複製方便，可以在網站 css 中加入以下內容：

```
.zi{
	height: 1.1em;
	position: relative;
	top: 0.15em;
	margin: -0.05em;
}
.plgo {
	height: 0.92em;
	position: relative;
	top: .12em;
	margin: 0.042em;
}
.zi, .plgo {
	-moz-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	-khtml-user-select: none;
	-o-user-select: none;
	user-select: none;
}
```

本腳本藉助 ChatGPT 創作。你可以任意處置分發之類。
