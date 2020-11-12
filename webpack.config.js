const path = require('path');

module.exports = {
	entry: './src/App.tsx',
	mode: 'development',
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'App.js',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: '/node_modules/',
				loader: 'ts-loader',
			},
			{
				test: /\.scss?$/,
				use: [
					{
						loader: 'style-loader',
					},
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.css?$/,
				use: [
					'style-loader',
				]
			}
		]
	}
}
