module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'The 4th Life',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
      { hid: 'description', name: 'description', content: 'The gateway to information of the 4th industry' }
    ],
    script: [
      { src: '//www.googletagmanager.com/gtag/js?id=UA-46283958-4', defer: true },
      { src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', defer: true },
      { src: '//widgets.coingecko.com/coingecko-coin-price-marquee-widget.js', body: true },
      { src: '//widgets.coingecko.com/coingecko-coin-list-widget.js', body: true },

      { src: '/bundles/libscripts.bundle.js', body: true },
      { src: '/bundles/vendorscripts.bundle.js', body: true },
      { src: '/bundles/jvectormap.bundle.js', body: true },
      { src: '/bundles/sparkline.bundle.js', body: true },
      { src: '/bundles/c3.bundle.js', body: true },
      { src: '/bundles/mainscripts.bundle.js', body: true },
      { src: '/js/index.js', body: true }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'images/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Rajdhani:300,400,500,600,700%7CRoboto:300,300i,400,400i,500,500i,700,700i,900,900i&amp;subset=cyrillic,cyrillic-ext,latin-ext' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/plugins/bootstrap/css/bootstrap.min.css',
    '~/assets/plugins/jvectormap/jquery-jvectormap-2.0.3.min.css',
    '~/assets/plugins/charts-c3/plugin.css',
    '~/assets/plugins/morrisjs/morris.min.css',
    '~/assets/css/style.min.css',
    '~/static/css/main.css'
  ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  serverMiddleware: [
    // API middleware
    '~/api/index.js'
  ]
}
