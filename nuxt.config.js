module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'The 4th Life',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
      { hid: 'description', name: 'description', content: '최신 블록체인 뉴스들을 모아봤어.. - 포스라이프' },
      { property: 'og:title', content: '최신 블록체인 뉴스들을 모아봤어.. - 포스라이프' },
      { property: 'og:site_name', content: 'The 4th Life' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://4th.life' },
      { property: 'og:image', content: 'https://4th.life/4th_rep.png' },
      { property: 'og:description', content: '최신 블록체인 뉴스들을 모아봤어.. - 포스라이프' },
      { name: 'twitter:card', content: 'The 4th Life' },
      { name: 'twitter:site', content: 'https://4th.life' },
      { name: 'twitter:title', content: '따끈따끈한 블록체인 산업 뉴스 포탈 - 포스라이프' },
      { name: 'twitter:description', content: '최신 블록체인 뉴스들을 모아봤어.. - 포스라이프' },
      { name: 'twitter:creator', content: '@KittychainI' },
      { name: 'twitter:image:src', content: 'https://4th.life/4th_rep.png' }
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'canonical', href: 'https://4th.life' }
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
