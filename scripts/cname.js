var fs = require("fs")
fs.writeFile("./build/CNAME", "qi.byeguo.cn", function (err) {
  if (err) {
    throw err
  }
})
