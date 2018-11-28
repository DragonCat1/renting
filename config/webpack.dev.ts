import webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import webpackCommon from './webpack.common'

const devConf = webpackMerge(webpackCommon, {
  mode: 'development',
  devtool: 'source-map',
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer:{
    hot:true,
  },
})

export default devConf
