const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

exports.indexTemplate = function(options){
  return {
    plugins: [
      new HtmlWebpackPlugin({
        template: require('html-webpack-template'),
        title : options.title,
        appMountId : options.appMountId,
        inject : false
      })
    ]
  };
}

exports.loadJSX = function(include){
  return {
    module : {
      loaders : [
        {
          test : /\.(js|jsx)$/,
          loaders : ['babel?cacheDirectory'],
          include : include
        }
      ]
    }
  };
}

exports.loadIsparta = function(include){
  return {
    module: {
      preLoaders : [
        {
          test : /\.(js|jsx)$/,
          loaders : ['isparta'],
          include : include
        }
      ]
    }
  };
}

exports.lintJSX = function(include){
  return {
    module : {
      preLoaders : [
        {
          test : /\.(js|jsx)$/,
          loaders : ['eslint'],
          include : include
        }
      ]
    }
  };
}

exports.enableReactPerformanceTools = function(){
  return {
    module : {
      loaders : [
        {
          test : require.resolve('react'),
          loader : 'expose?react'
        }
      ]
    }
  };
}

exports.devServer = function(options){
  const ret = {
    devServer : {
      historyApiFallback : true,
      hot : true,
      inline : true,
      stats : 'errors-only',
      host : options.host,
      port : options.port
    },
    plugins : [
      new webpack.HotModuleReplacementPlugin({
        multiStep : true
      })
    ]
  };

  if(options.poll){
    ret.watchOptions = {
      aggregateTimeout : 300,
      poll : 1000
    }
  }

  return ret;
}

exports.setupCSS = function(paths){
  return {
    module : {
      loaders : [
        {
          test : /\.css$/,
          loaders : ['style','css'],
          include : paths
        }
      ]
    }
  };
}

exports.minify = function(){
  return {
    plugins : [
      new webpack.optimize.UglifyJsPlugin({
        compress : {
          warnings : false
        }
      })
    ]
  };
}

exports.setFreeVariable = function(key,value){
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
}

exports.extractBundle = function(options){
  const entry = {};
  entry[options.name] = options.entries;

  return {
    entry : entry,
    plugins : [
      new webpack.optimizeCommonsChunkPlugin({
        names : [option.name, 'manifest'],
        minChunks : Infinity
      })
    ]
  }
}

exports.clean = function(path){
  return {
    plugins : [
      new CleanWebpackPlugin([path],{
        root : process.cwd()
      })
    ]
  };
}

exports.extractCSS = function(paths){
  return {
    module : {
      loaders : [
        {
          test: /\.css$/,
          loader : ExtractTextPlugin.extract('style','css'),
          include : paths
        }
      ]
    },
    plugins : [
      //output extracted css to a file
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
  };
}

exports.npmInstall = function(options){
  options = options || {};

  return {
    plugins : [
      new NpmInstallPlugin(options)
    ]
  };
}
