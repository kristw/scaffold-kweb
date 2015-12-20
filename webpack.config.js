var paths = {
  src:   __dirname + '/src',
  bower: __dirname + '/src/bower_components'
};

module.exports = {
  output: {
    filename: 'bundle.js',
    sourceMapFilename: '[file].map'
  },
  module:{
    loaders: [{
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  resolve: {
    alias: {
      'd3':                    paths.bower + '/d3/d3.min.js',
      'd3Kit':                 paths.bower + '/d3kit/dist/d3kit.min.js',
      'jquery':                paths.bower + '/jquery/dist/jquery.min.js',
      'moment':                paths.bower + '/moment/min/moment.min.js',
      'moment-timezone':       paths.bower + '/moment-timezone/builds/moment-timezone-with-data-2010-2020.min.js'
    }
  }
};