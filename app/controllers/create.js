require("rootpath")();
var Emitter = require("app/middleware/emitter");

Emitter.on("contentCreated", require("./upsert"));
