import * as path from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  entry: './foo.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {

      },
    ],
  },
};

export default config;
