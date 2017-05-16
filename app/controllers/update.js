require("rootpath")();
var Emitter = require("app/middleware/emitter");

Emitter.on("contentUpdated", require("./upsert"));
