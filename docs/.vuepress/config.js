const getConfig = require("vuepress-bar");

const { nav, sidebar } = getConfig({addReadMeToFirstGroup: false});

module.exports = {
	base: '',
	title: 'Notebin',
	description: 'Where my notes filled into',
	themeConfig: { nav, sidebar }
};
