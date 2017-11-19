require("rootpath")();
var Emitter = require("@wcm/module-helper").emitter;

Emitter.on("contentCreated", require("./upsert"));
