const webpack = require('webpack')
const path = require('path')
const slsw = require('serverless-webpack')

const entries = {}

Object.keys(slsw.lib.entries).forEach(
  key => (entries[key] = ['./source-map-install.js', slsw.lib.entries[key]])
)

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: entries,
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  target: 'node',
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }]
  },
  externals: ['bufferutil', 'utf-8-validate'],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.LOCAL_PROJECT_DIR': slsw.lib.webpack.isLocal
        ? JSON.stringify(__dirname)
        : JSON.stringify('/tmp')
    })
  ]
}
