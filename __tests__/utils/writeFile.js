const fs = require("fs");
const path = process.env.__PATH__;
const data = process.env.__DATA__;

fs.writeFileSync(path, data);
