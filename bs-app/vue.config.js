module.exports = {
    publicPath:'./',
	outputDir: 'dist',
	assetsDir: 'static',
	devServer: {
		proxy: {
			"/playStatsApi": {
				changeOrigin: true,
				target: 'https://cr.is-a.dev',
				pathRewrite: {
					'^/playStatsApi': ''
				}
			},
			"/brawlapi": {
				changeOrigin: true,
				target: 'https://api.brawlapi.com/',
				pathRewrite: {
					'^/brawlapi': ''
				}
			}
		}
	}
}
