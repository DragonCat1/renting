const {BUILD_TARGET} = process.env
const configs = {
  'electron-main':{
    outputDir:'./electron/main',
    chainWebpack(config){
      config.target('electron-main').watch(true).watchOptions({ignored: ['node_modules','src']})
      .node.set('__dirname',true).set('__filename',true).end()
      .entryPoints.delete('app').end()
      .entry('index').add('./electron/index.js').end()
      .output.filename('[name].js').end()
      .plugins.delete('html').delete('preload').delete('prefetch').delete('copy').delete('hmr').end()
      if(config.optimization.get('splitChunks')){
        config.optimization.get('splitChunks').cacheGroups.vendors = false
      }
    },
  },
  'electron-renderer':{
    outputDir:'./electron/renderer',
    chainWebpack(config){
      config.target('electron-renderer').watch(true).watchOptions({ignored: ['node_modules','electron']})
      .output.filename('[name].js').end()
      .plugins.delete('html').delete('preload').delete('prefetch').delete('copy').delete('hmr')
    },
  }
}

if(BUILD_TARGET){
  console.log(BUILD_TARGET)
  module.exports = configs[BUILD_TARGET]
}else{
  module.exports = {}
}
