var ExtractTextPlugin = require('extract-text-webpack-plugin');

var postConfig = require('../postcss.config.js');

var cssOption = {
    use: [
        'css-loader',
        'postcss-loader',
        // 'resolve-url-loader',
    ],
    fallback: 'vue-style-loader'
};
var lessOption = {
    use: [
        'css-loader',
        'postcss-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: {
              autoprefixer: { browsers:  ['last 3 versions', '> 1%'] },
            }
          }
        },
        'less-loader'
    ],
    fallback: 'vue-style-loader'
};

var scssOption = {
	use: [
	  'css-loader',
	  // 'postcss-loader',
    {
      loader: 'postcss-loader',
      options: postConfig,
    },
    // 'resolve-url-loader',
	  'sass-loader?outputStyle=expanded'
	],
	fallback: 'vue-style-loader'
};
var sassOption = {
	use: [
	  'css-loader',
	  'postcss-loader',
    // 'resolve-url-loader',
	  'sass-loader?indentedSyntax'
	],
	fallback: 'vue-style-loader'
};

var excludePath = /node_modules\/(?!@(hfe|dp))/;
var isDev = process.env.NODE_ENV !== 'production';
var vueloadRule;
if (isDev) {
  vueloadRule = {
      test: /\.vue$/,
      loader: 'vue-loader',
      exclude: excludePath,
      options: {
          loaders: {
              // 'css': "vue-style-loader!css-loader!postcss-loader",
              // 'less': "vue-style-loader!css-loader!postcss-loader!less-loader",
              'scss': "vue-style-loader!css-loader!postcss-loader!sass-loader",
              'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          }
      }
  };
} else {
  vueloadRule = {
      test: /\.vue$/,
      loader: 'vue-loader',
      exclude: excludePath,
      options: {
          extractCSS: true,
          loaders: {
              'scss': ExtractTextPlugin.extract(scssOption),
              'sass': ExtractTextPlugin.extract(sassOption),
          }
      }
  };
}


var cssloadRule = {
   test: /\.css$/,
   use: ExtractTextPlugin.extract(cssOption)
};
var lessloadRule = {
   test: /\.less$/,
   use: ExtractTextPlugin.extract(lessOption)
};
var scssloadRule = {
   test: /\.scss$/,
   use: ExtractTextPlugin.extract(scssOption)
};

var jsloadRule = {
    test: /\.(es6|js)$/,
    use: [{
        loader: 'babel-loader',
        options: {
            cacheDirectory: isDev
        }
    }],
    exclude: /node_modules\/(?!@(hfe|dp))/
};

var isProd = process.env.NODE_ENV === 'production';
// var suffix = isProd ? '.[hash:8]' : '';
var suffix = '';

var imgloadRule = {
    test: /\.(jpe?g|png|gif|svg)$/i,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 25000,
            name: `images/[name]${suffix}.[ext]`
        }
    }]
}

var fontloadRule = {
    test: /\.woff|ttf|woff2|eot|swf$/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 100000,
            name: `fonts/[name]${suffix}.[ext]`
        }
    }]
};

module.exports = [ vueloadRule, jsloadRule, scssloadRule, imgloadRule, fontloadRule ];
