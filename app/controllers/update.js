const { emitter } = require("@wcm/module-helper");

emitter.on("content.updated", require("./upsert"));
