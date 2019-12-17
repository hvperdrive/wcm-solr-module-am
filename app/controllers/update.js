const { emitter } = require("@wcm/module-helper");

emitter.on("content.published", require("./upsert"));
