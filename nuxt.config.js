module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'The 4th Life',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
      { hid: 'description', name: 'description', content: 'The gateway to the information of the 4th industry' }
    ],
    script: [
      { src: '//www.googletagmanager.com/gtag/js?id=UA-139212564-1', async: true },
      { innerHTML: "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-139212564-1');"
        , type: "text/javascript", charset: "utf-8" },
      { src: '//widgets.coingecko.com/coingecko-coin-price-marquee-widget.js', body: true },
      { src: '/bundles/libscripts.bundle.js', body: true },
      { src: '/bundles/vendorscripts.bundle.js', body: true },
      { src: '/bundles/jvectormap.bundle.js', body: true },
      { src: '/bundles/sparkline.bundle.js', body: true },
      { src: '/bundles/c3.bundle.js', body: true },
      { src: '/bundles/mainscripts.bundle.js', body: true },
      { src: '/js/index.js', body: true }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '~/assets/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/fa/css/all.css',
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
    '~/api/app.js'
  ],
  plugins: [
  ],
  modules: [
    ['@nuxtjs/google-adsense']
  ],
  'google-adsense': {
    id: 'ca-pub-2532632006378314'
  }
}
