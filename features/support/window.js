// this file needs loaded after require js
// I don't know why

document = require('jsdom').jsdom('<html><head></head><body><div id="omega"></div></body></html>');
window = document.createWindow();
