<template>
  <!-- Main Content -->
  <div class="body_scroll">
    <div class="block-header">
      <div class="row">
        <div class="col-12">
          <h2>가격비교</h2>&nbsp;
        </div>
      </div>
    </div>
    <div class="container-fluid product-grid">
      <div class="row clearfix">
        <div class="col-lg-6 col-sm-12">
        </div>
        <div class="col-lg-6 col-sm-12">
            <table class="w-100 table table-striped table-bordered table-hover">
                <thead class="thead-dark">
                <tr>
                    <th>$1 = {{ USD_KRW }}원</th>
                    <th><img src="/images/crypto/ic_ubt.svg" height="20"></th>
                    <th><img src="/images/crypto/ic_bfx.svg" height="25"></th>
                    <th>김치프리미엄</th>
                </tr>
                </thead>
                <tbody id="prices">
                <tr>
                    <td class="table-success">BTC</td>
                    <td>{{ UBT_BTC }}</td>
                    <td>{{ BFX_BTC }}</td>
                    <td class="table-primary">{{ GAP_BTC }}</td>
                </tr>
                <tr>
                    <td class="table-success">ETH</td>
                    <td>{{ UBT_ETH }}</td>
                    <td>{{ BFX_ETH }}</td>
                    <td class="table-primary">{{ GAP_ETH }}</td>
                </tr>
                <tr>
                    <td class="table-success">XRP</td>
                    <td>{{ UBT_XRP }}</td>
                    <td>{{ BFX_XRP }}</td>
                    <td class="table-primary">{{ GAP_XRP }}</td>
                </tr>
                <tr>
                    <td class="table-success">EOS</td>
                    <td>{{ UBT_EOS }}</td>
                    <td>{{ BFX_EOS }}</td>
                    <td class="table-primary">{{ GAP_EOS }}</td>
                </tr>
                <tr>
                    <td class="table-success">LTC</td>
                    <td>{{ UBT_LTC }}</td>
                    <td>{{ BFX_LTC }}</td>
                    <td class="table-primary">{{ GAP_LTC }}</td>
                </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
th, td.table-success { text-align: center; }
td { text-align: right; }
</style>

<script>
import axios from '../plugins/axios'

export default {
  components: {
  },
  mounted () {
    // to init the graph call:
  },
  async asyncData({params}) {
    return axios.get('/api/arbi').then((res) => {
      // {"exchange":"UBT","symbol":"XRP","price":384,"time":"201904200632"}
      let jobj = {};
      const krwPrice = res.data['usd-krw'];
      console.log('usd-krw ' + krwPrice);
      jobj['USD_KRW'] = '' + krwPrice;
      for (let i = 0; i < res.data.result.length; i++) {
        let price = '' + res.data.result[i].arbi.price;
        jobj[res.data.result[i].arbi.exchange + '_' + res.data.result[i].arbi.symbol] = price;
      }
      jobj['GAP_BTC'] = ((jobj['UBT_BTC'] - jobj['BFX_BTC']) * 100 / jobj['BFX_BTC']).toFixed(2) + '%';
      jobj['GAP_ETH'] = ((jobj['UBT_ETH'] - jobj['BFX_ETH']) * 100 / jobj['BFX_ETH']).toFixed(2) + '%';
      jobj['GAP_XRP'] = ((jobj['UBT_XRP'] - jobj['BFX_XRP']) * 100 / jobj['BFX_XRP']).toFixed(2) + '%';
      jobj['GAP_EOS'] = ((jobj['UBT_EOS'] - jobj['BFX_EOS']) * 100 / jobj['BFX_EOS']).toFixed(2) + '%';
      jobj['GAP_LTC'] = ((jobj['UBT_LTC'] - jobj['BFX_LTC']) * 100 / jobj['BFX_LTC']).toFixed(2) + '%';
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
      usdKrw: '',
      'UBT_BTC': '',
      'UBT_ETH': '',
      'UBT_XRP': '',
      'UBT_EOS': '',
      'UBT_LTC': '',
      'BFX_BTC': '',
      'BFX_ETH': '',
      'BFX_XRP': '',
      'BFX_EOS': '',
      'BFX_LTC': '',
      'GAP_BTC': '',
      'GAP_ETH': '',
      'GAP_XRP': '',
      'GAP_EOS': '',
      'GAP_LTC': ''
    }
  }
}
</script>
