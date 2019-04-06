const path = require('path');

module.exports = {
  entry: './src/js/app.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/js/')
  },
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
     {
	test: /\.scss$/,
        use: [{	loader: "style-loader"},
	      { loader: "css-loader" },

		{loader:'postcss-loader'},
		{loader: "sass-loader",
      		options: {
                    includePaths: ["absolute/path/a", "absolute/path/b"]
                }
            }]
        }
  ]
}
};
