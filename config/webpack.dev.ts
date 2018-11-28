import * as webpackMerge from 'webpack-merge'
import webpackCommon from './webpack.common'

const devConf = webpackMerge(webpackCommon, {
  mode: 'development',
  devtool: 'source-map',
})

export default devConf
