import * as webpackMerge from 'webpack-merge';
import webpackCommon from './webpack.common';

const prodConf = webpackMerge(webpackCommon, {
  mode: 'production',
});

export default prodConf;
