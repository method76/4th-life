<template>
  <!-- Main Content -->
  <div class="body_scroll">
    <div class="row">
      <div class="col-12 bg-slogan">
        <div class="slogan-wrapper">
          <h1>암호화폐 시세<br>프리미엄</h1>
        </div>
      </div>
    </div>
    <div class="row contents-grid">
      <div class="col-lg-6 col-sm-12">
        <TVChartContainer />
      </div>
      <div class="col-lg-6 col-sm-12">
        <h5 class="float-right std-time">기준시: {{ TIME_KR }} UTC+00</h5>
        <table class="w-100 table table-striped table-bordered table-hover">
          <thead class="thead-dark">
          <tr>
            <th>{{ USD_KRW }}/$</th>
            <th><img src="/images/crypto/ic_ubt.svg" height="20"></th>
            <th><img src="/images/crypto/ic_gio.svg" height="25"></th>
            <th><img src="/images/crypto/ic_bfx.svg" height="25"></th>
            <th><img src="/images/crypto/ic_kimchi.png" height="30"></th>
          </tr>
          </thead>
          <tbody id="prices">
          <tr>
            <td class="table-success">BTC</td>
            <td class="price">{{ UBT_BTC }}<br>${{ UBT_BTC_USD }}</td>
            <td class="price">{{ GIO_BTC }}<br>${{ GIO_BTC_USD }}</td>
            <td class="price">{{ BFX_BTC }}<br>${{ BFX_BTC_USD }}</td>
            <td class="table-primary">{{ GAP_BTC }}</td>
          </tr>
          <tr>
            <td class="table-success">ETH</td>
            <td class="price">{{ UBT_ETH }}<br>${{ UBT_ETH_USD }}</td>
            <td class="price">{{ GIO_ETH }}<br>${{ GIO_ETH_USD }}</td>
            <td class="price">{{ BFX_ETH }}<br>${{ BFX_ETH_USD }}</td>
            <td class="table-primary">{{ GAP_ETH }}</td>
          </tr>
          <tr>
            <td class="table-success">XRP</td>
            <td class="price">{{ UBT_XRP }}<br>${{ UBT_XRP_USD }}</td>
            <td class="price">{{ GIO_XRP }}<br>${{ GIO_XRP_USD }}</td>
            <td class="price">{{ BFX_XRP }}<br>${{ BFX_XRP_USD }}</td>
            <td class="table-primary">{{ GAP_XRP }}</td>
          </tr>
          <tr>
            <td class="table-success">XLM</td>
            <td class="price">{{ UBT_XLM }}<br>${{ UBT_XLM_USD }}</td>
            <td class="price">{{ GIO_XLM }}<br>${{ GIO_XLM_USD }}</td>
            <td class="price">{{ BFX_XLM }}<br>${{ BFX_XLM_USD }}</td>
            <td class="table-primary">{{ GAP_XRP }}</td>
          </tr>
          <tr>
            <td class="table-success">EOS</td>
            <td class="price">{{ UBT_EOS }}<br>${{ UBT_EOS_USD }}</td>
            <td class="price">{{ GIO_EOS }}<br>${{ GIO_EOS_USD }}</td>
            <td class="price">{{ BFX_EOS }}<br>${{ BFX_EOS_USD }}</td>
            <td class="table-primary">{{ GAP_EOS }}</td>
          </tr>
          <tr>
            <td class="table-success">LTC</td>
            <td class="price">{{ UBT_LTC }}<br>${{ UBT_LTC_USD }}</td>
            <td class="price">{{ GIO_LTC }}<br>${{ GIO_LTC_USD }}</td>
            <td class="price">{{ BFX_LTC }}<br>${{ BFX_LTC_USD }}</td>
            <td class="table-primary">{{ GAP_LTC }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
td { text-align: right; }
th, td.table-success { text-align: center;line-height: 1.5;vertical-align: middle; }
td.price { font-size: 15px;line-height: 1.5;padding: .3rem .5rem; }
.bg-slogan { background-image: url(/images/price/bg_kimchi.jpg); }
.premium-wrapper h1, .premium-wrapper h5 { margin-bottom: 0; color: white; }
.std-time { padding: 20px 20px 0; }
</style>

<script>
import axios from '../plugins/axios'
import TVChartContainer from '../layouts/components/TVChartContainer.vue'
// import C3AreaChart from '../layouts/components/C3AreaChart'

export default {
  components: {
    TVChartContainer
  },
  head() {
    return {
      title: '포스라이프 - 암호화폐 시세 프리미엄',
      meta: [
        {hid: 'og:title', property: 'og:title', content: '포스라이프 - 암호화폐 시세 프리미엄'},
        {hid: 'twitter:title', name: 'twitter:title', content: '포스라이프 - 암호화폐 시세 프리미엄'},
      ]
    }
  },
  mounted () {
    // to init the graph call:
  },
  async asyncData({params}) {
    return axios.get('/api/arbi').then((res) => {
      // {"exchange":"UBT","symbol":"XRP","price":384,"time":"201904200632"}
      // console.log('res ' + JSON.stringify(res.data));
      let jobj = {};
      const krwPrice = res.data['usd-krw'];
      console.log('timeKr ' + res.data.timeKr);
      jobj['USD_KRW'] = '' + krwPrice;
      jobj['TIME_KR'] = res.data['timeKr'];
      for (let i = 0; i < res.data.result.length; i++) {
        let price = '' + res.data.result[i].arbi.price;
        let priceUsd = parseFloat((res.data.result[i].arbi.priceUsd + '000').substring(0, 6));
        jobj[res.data.result[i].arbi.exchange + '_' + res.data.result[i].arbi.symbol] = price;
        jobj[res.data.result[i].arbi.exchange + '_' + res.data.result[i].arbi.symbol + '_USD'] = priceUsd;
      }
      jobj['GAP_BTC'] = ((jobj['UBT_BTC'] - jobj['BFX_BTC']) * 100 / jobj['BFX_BTC']).toFixed(2);
      jobj['GAP_ETH'] = ((jobj['UBT_ETH'] - jobj['BFX_ETH']) * 100 / jobj['BFX_ETH']).toFixed(2);
      jobj['GAP_XRP'] = ((jobj['UBT_XRP'] - jobj['BFX_XRP']) * 100 / jobj['BFX_XRP']).toFixed(2);
      jobj['GAP_EOS'] = ((jobj['UBT_EOS'] - jobj['BFX_EOS']) * 100 / jobj['BFX_EOS']).toFixed(2);
      jobj['GAP_LTC'] = ((jobj['UBT_LTC'] - jobj['BFX_LTC']) * 100 / jobj['BFX_LTC']).toFixed(2);
      for (let i = 0; i < res.data.result.length; i++) {
        // 원화 단위로 가공
        let price = '' + res.data.result[i].arbi.price.toLocaleString();
        jobj[res.data.result[i].arbi.exchange + '_' + res.data.result[i].arbi.symbol] = price;
      }
      return jobj;
    })
  },
  data: function () {
    return {
    }
  }
}
</script>
