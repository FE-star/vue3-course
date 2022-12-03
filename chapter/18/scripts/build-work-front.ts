/* eslint-disable no-console */
import webpack from 'webpack';
import type { Configuration } from 'webpack';
import { VueLoaderPlugin } from 'vue-loader';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { resolvePackagePath } from './util';
import { buildSSRCode } from './build-work-front-ssr';

const config: Configuration = {
  mode: 'production',
  entry: {
    'page/manage': resolvePackagePath(
      'work-front',
      'src',
      'pages',
      'manage',
      'index.ts'
    ),
    'page/login': resolvePackagePath(
      'work-front',
      'src',
      'pages',
      'login',
      'index.ts'
    )
  },
  output: {
    clean: true,
    path: resolvePackagePath('work-front', 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      // ts
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // configFile: path.resolve(__dirname, '../tsconfig.json'),
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.(css|less)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: resolvePackagePath(
            'work-front',
            'node_modules',
            'vue',
            'dist',
            'vue.runtime.global.prod.js'
          ),
          to: resolvePackagePath('work-front', 'dist', 'lib', 'vue.js')
        },
        {
          from: resolvePackagePath(
            'work-front',
            'node_modules',
            'vue-router',
            'dist',
            'vue-router.global.prod.js'
          ),
          to: resolvePackagePath('work-front', 'dist', 'lib', 'vue-router.js')
        }
      ]
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
  },
  externals: {
    vue: 'window.Vue',
    'vue-router': 'window.VueRouter'
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  }
};

webpack(config, (err, stats) => {
  buildSSRCode();
  if (err || stats?.hasErrors()) {
    err && console.log(err);
    console.error(stats?.compilation?.errors);
  } else {
    console.log('Webpack 编译成功！');
  }
});
