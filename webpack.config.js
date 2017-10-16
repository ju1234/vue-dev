"use strict";
var os = require('os');
var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
// var Visualizer = require('webpack-visualizer-plugin');
var UglifyJsParallelPlugin = require('webpack-uglify-parallel');


var STATIC_SRC = require("./env")["static-src"];
var DIST_PATH = require('./env').dist;
var HTML_PATH = require('./env').output;
var PUBLIC_PATH = require('./env').urlPrefix;
// var PUBLIC_PATH = require('./f2eci').urlPrefix + STATIC_SRC + '/';

var loadRules = require('./config/loadRules');
var postConfig = require('./postcss.config');

var alias = {
  vue: 'vue/dist/vue.min.js',
  vuex: 'vuex/dist/vuex.min.js',
  'vue-router': 'vue-router/dist/vue-router.min.js',
  '@libs': path.join(__dirname, './src/libs'),
  '@components': path.join(__dirname, './src/components'),
}

var isProd = process.env.NODE_ENV === 'production';
var isProxy = process.env.NODE_ENV === 'proxy';
if (isProxy) {
  PUBLIC_PATH = `.${PUBLIC_PATH}` ;
}
var plugins = [];
if (isProd) {
  // plugins.push(new webpack.optimize.UglifyJsPlugin({
  //     exclude:/\.min\.js$/,
  //     sourceMap: 'source-map',
	// 		compress: {
  //       warnings: false,
  //       screw_ie8: true,
  //       conditionals: true,
  //       unused: true,
  //       comparisons: true,
  //       sequences: true,
  //       dead_code: true,
  //       evaluate: true,
  //       if_return: true,
  //       join_vars: true,
  //       drop_debugger: true,
  //       drop_console: true,
  //     },
  //     output: {
  //       comments: false
  //     },
  //     except:['exports', 'require']
  // }));
  plugins.push(new UglifyJsParallelPlugin({
      workers: os.cpus().length,
      exclude:/\.min\.js$/,
      // sourceMap: 'source-map',
      sourceMap: false,
      mangle: true,
      compressor: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        drop_debugger: true,
        drop_console: true,
      },
      output: {
        comments: false
      },
  }));

  // plugins.push(new Visualizer());
  plugins.push(new webpack.optimize.AggressiveMergingPlugin());
  plugins.push(new InlineManifestWebpackPlugin());
  // plugins.push(new HtmlWebpackInlineSourcePlugin());
  plugins.push(new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }));
  // 使打包公共文件，在没有改变的时候hash值不变
  // plugins.push(new webpack.HashedModuleIdsPlugin());
  // plugins.push(new WebpackMd5Hash());
  // new webpack.HashedModuleIdsPlugin(),
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new webpack.NamedModulesPlugin());
  // plugins.push(new webpack.DllReferencePlugin({
  //     context: __dirname,
  //     manifest: path.join(__dirname, 'dll/libs_manifest.json'),
  //     sourceType: 'umd'
  // }));
  // plugins.push(new webpack.DllReferencePlugin({
  //     context: __dirname,
  //     manifest: require(path.join(__dirname, 'dll/vendor_manifest.json')),
  //     sourceType: 'umd'
  // }));
}

var htmlPlugins = [];
var htmlMinify = isProd ? {
  minifyJS: true,
  minifyCSS: true,
  collapseWhitespace: true,
  removeComments: true
} : false;
var htmlPath = (isProd || isProxy) ? '../' : '';

var htmlPath = '';
var list = '*';
var entry = glob.sync('./src/' + list + '/index.js').reduce(function (prev, curr) {
    var key = curr.slice(6, -9);
    var chunks = ['manifest', 'libs', 'vendor', key];
    htmlPlugins.push(new HtmlWebpackPlugin({
      // template: `./html/errinfo.html`,
      template: `./html/${key}.html`,
      filename: `${htmlPath}${key}.html`,
      chunks,
      // chunksSortMode: 'dependency',
      minify: htmlMinify
    }));
    prev[key] = [path.resolve(__dirname, curr)];
    return prev;
}, {});

entry.libs = ['vue', 'vue-router'];
entry.vendor = ['fastclick', 'promise', 'whatwg-fetch', './src/libs/api'];

var suffix = isProd ? '.[hash:8]' : '';

module.exports = {
    entry: entry,
    output: {
        filename: `[name]${suffix}.js`,
        path: path.join(__dirname, DIST_PATH),
        publicPath: PUBLIC_PATH,
    },
    devtool: isProd ? false : 'eval',
    resolve: {
        alias: alias,
        modules: [path.resolve(__dirname, 'node_modules')],
        extensions: ['.js', '.es6', '.json', '.jsx', '.vue']
    },
    module: {
        rules: loadRules,
        // noParse: [/vue/, /vuex/, /vue-router/]
    },
    target: "web",
    plugins: [
      new CleanWebpackPlugin(['dist'], {
          root: path.join(__dirname),
          verbose: true,
          dry: false
      }),
      new webpack.ProgressPlugin(),
      new webpack.LoaderOptionsPlugin({
          minimize: isProd,
          options: {
            context: __dirname,
            // postcss: function() {
            //   return [
            //     require('autoprefixer')(postConfig.plugins.autoprefixer),
            //     require('postcss-px2rem')(postConfig.plugins['postcss-px2rem'])
            //   ];
            // }
          }
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      }),
      new ExtractTextPlugin({
          filename: `[name]${suffix}.css`,
          disable: false,
          allChunks: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['manifest', 'libs', 'vendor'].reverse(),
        filename: `[name]${suffix}.js`
      }),
    ].concat(plugins).concat(htmlPlugins),
    bail: isProd,
    devServer: {
      contentBase: false,
      historyApiFallback: false,
      hot: false,
      inline: true,
      // watchContentBase: true,
      port: 7000,
      publicPath: PUBLIC_PATH,
      noInfo: false,
      compress: false,
      proxy: {
        '/api/**': {
          target: 'http://m.51ping.com',
          // target: 'https://api.paidian.wpt.dev.sankuai.com/openapi/',
          changeOrigin: true,
          secure: false,
          pathRewrite: {'^/api' : ''}
        }
      },
      https: true,
      stats: {
        assets: true,
        children: false,
        chunks: false,
        hash: false,
        modules: false,
        publicPath: false,
        timings: true,
        version: false,
        warnings: true,
        colors: {
          green: '\u001b[32m',
        }
      },
    },
};
