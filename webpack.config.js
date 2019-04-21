const Path = require('path');
const PATHS = {
  SRC: Path.resolve('src'),
  DIST: Path.resolve('dist'),
}

module.exports = {
  entry: {
    bundle: `${PATHS.SRC}/expose/index.js`,
  },
  output: {
    path: PATHS.DIST,
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  externals: {
    'react': 'commonjs react'
  }
};
