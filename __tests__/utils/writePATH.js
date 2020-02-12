const fs = require("fs");
const path = process.env.__PATH__;

fs.writeFileSync(path, process.env.PATH);
