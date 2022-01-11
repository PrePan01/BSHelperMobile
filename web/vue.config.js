module.exports = {
  devServer: {
    proxy: {
      "/playStatsApi": {
        changeOrigin: true,
        target: 'https://cr.is-a.dev',
        pathRewrite: {
          '^/playStatsApi': ''
        }
      }
    }
  }
}
