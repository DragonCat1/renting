const env = process.env.NODE_ENV
console.log(env)
let configFile
if (env === 'development') {
  configFile = './config/webpack.dev.ts'
}else {
  configFile =  './config/webpack.prod.ts'
}
module.exports = require(configFile)
