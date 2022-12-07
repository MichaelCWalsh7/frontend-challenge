const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const SRC_DIRECTORY = path.resolve(__dirname, '.', 'src');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '.', 'dist'),
  },
  cache: {
    type: 'filesystem',
  },
  mode: 'development',
  devServer: {
    allowedHosts: 'all',
    hot: true,
    port: 3000,
    historyApiFallback: true,
    watchFiles: {
      options: {
        ignored: /node_modules|\.jsx?$|\.d.ts$/,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        include: SRC_DIRECTORY,
        use: {
          loader: 'babel-loader',
          options: {
            cacheCompression: false,
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|pdf|ico|woff(2)?|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@assets': path.resolve(__dirname, SRC_DIRECTORY, 'assets'),
      '@components': path.resolve(__dirname, SRC_DIRECTORY, 'components'),
      '@customizations': path.resolve(__dirname, SRC_DIRECTORY, 'customizations'),
      '@views': path.resolve(__dirname, SRC_DIRECTORY, 'views'),
      '@repositories': path.resolve(__dirname, SRC_DIRECTORY, 'repositories'),
      '@utils': path.resolve(__dirname, SRC_DIRECTORY, 'utils'),
      '@src': path.resolve(__dirname, SRC_DIRECTORY),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      inject: 'body',
      favicon: './src/assets/img/logos/favicon.ico',
    }),
    new Dotenv({
      path: '.env',
      systemvars: true,
    }),
    new CopyPlugin({
      patterns: [{ from: 'public/images', to: '' }, { from: 'public/contentscript.js', to: '' }],
    }),
  ],
};
