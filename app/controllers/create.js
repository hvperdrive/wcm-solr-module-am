require("rootpath")();
var Emitter = require("@wcm/module-helper").emitter;

Emitter.on("content.created", require("./upsert"));
