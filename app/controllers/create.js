const { emitter } = require("@wcm/module-helper");

emitter.on("content.created", require("./upsert"));
