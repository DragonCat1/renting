import path from 'path'
import webpack from 'webpack'

const config:webpack.Configuration = {
  entry: './foo.ts',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
}

export default config
