import path from 'path'
import { Configuration } from 'webpack'
import htmlWebpackPlugin from 'html-webpack-plugin'

const config: Configuration = {
  entry: {
    app:path.resolve(__dirname, '../src/app.tsx'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename:'app.[hash].js',
  },
  resolve:{
    extensions:['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias:{
      '@':path.resolve(__dirname, '../'),
      '@src':path.resolve(__dirname, '../src'),
      '@config':path.resolve(__dirname, '../config'),
      '@views':path.resolve(__dirname, '../views'),
    },
  },
  module: {
    rules: [
      {
        test:/\.tsx?$/,
        use:['babel-loader', 'awesome-typescript-loader'],
      },
      {
        test:/\.jsx?$/,
        use:'babel-loader',
        exclude:/node_modules/,
      },
    ],
  },
  plugins:[
    new htmlWebpackPlugin({
      template: 'index.html',
    }),
  ],

}

export default config
