const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = (env, argv) => {
	const isProd = argv.mode === "production"

	return {
		entry: {
			main: path.resolve(__dirname, "scripts", "script.js"),
		},
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: isProd ? "[name].[contenthash].js" : "[name].js",
			assetModuleFilename: "assets/[hash][ext][query]",
		},
		devtool: isProd ? false : "source-map",
		devServer: {
			static: {
				directory: path.join(__dirname, "dist"),
			},
			compress: true,
			port: 3000,
			open: true,
			hot: true,
		},
		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
					},
				},
				{
					test: /\.s[ac]ss$/i,
					use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
				},
				{
					test: /\.(png|jpe?g|gif|svg)$/i,
					type: "asset/resource",
				},
			],
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, "index.html"),
			}),
			new MiniCssExtractPlugin({
				filename: isProd ? "[name].[contenthash].css" : "[name].css",
			}),
		],
		optimization: {
			splitChunks: {
				chunks: "all",
			},
		},
	}
}
