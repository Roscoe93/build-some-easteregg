const request = require("request-promise");
const sizeOf = require("image-size");
const path = require("path");
const fs = require("fs");

module.exports = async (link, name, scale) => {
	console.log(`request: ${link}`);
	let buffer = await request(link, {
		encoding: null
	});
	let { width, height, type } = sizeOf(buffer);
	let base64 = buffer.toString("base64");
	console.log(`generating style`);
	let style = `padding-left:${width * scale}px;line-height:${height *
		scale}px;background:url(data:image/${type};base64,${base64}) center center no-repeat;background-size:cover`;

	let code = `module.exports = function() {
    console.log('%c ','${style}');
  }`;
	console.log(`writing to pics/${name}.js`);
	fs.writeFileSync(path.resolve(__dirname, `./pics/${name}.js`), code);
	console.log(`done`);
};
