<template>
  <!-- Main Content -->
  <div class="body_scroll">
    <div class="block-header">
      <div class="row">
        <div class="col-12">
          <h2>가격비교</h2>
        </div>
      </div>
    </div>
    <div class="container-fluid product-grid">
      <div class="row clearfix">
        <div class="col-lg-6 col-sm-12">
          <vue-c3 :handler="handler"></vue-c3>
        </div>
        <div class="col-lg-6 col-sm-12">
            <table class="w-100 table table-striped table-bordered table-hover">
                <thead>
                <tr>
                    <th>암호화폐</th>
                    <th>업비트</th>
                    <th>비트파이넥스</th>
                    <th>김치프리미엄</th>
                </tr>
                </thead>
                <tbody id="prices">
                <tr>
                    <td>BTC</td>
                    <td>{{ UBT_BTC }}</td>
                    <td>{{ BFX_BTC }}</td>
                    <td>{{ GAP_BTC }}</td>
                </tr>
                <tr>
                    <td>ETH</td>
                    <td>{{ UBT_ETH }}</td>
                    <td>{{ BFX_ETH }}</td>
                    <td>{{ GAP_ETH }}</td>
                </tr>
                <tr>
                    <td>XRP</td>
                    <td>{{ UBT_XRP }}</td>
                    <td>{{ BFX_XRP }}</td>
                    <td>{{ GAP_XRP }}</td>
                </tr>
                <tr>
                    <td>EOS</td>
                    <td>{{ UBT_EOS }}</td>
                    <td>{{ BFX_EOS }}</td>
                    <td>{{ GAP_EOS }}</td>
                </tr>
                <tr>
                    <td>LTC</td>
                    <td>{{ UBT_LTC }}</td>
                    <td>{{ BFX_LTC }}</td>
                    <td>{{ GAP_LTC }}</td>
                </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scope>
</style>

<script>
import axios from '../plugins/axios'
import Vue from 'vue'
import VueC3 from 'vue-c3'

export default {
  components: {
    VueC3
  },
  mounted () {
    // to init the graph call:
    const options = {
      data: {
        columns: [
          ['data1', 2, 4, 1, 5, 2, 1],
          ['data2', 7, 2, 4, 6, 10, 1]
        ]
      }
    }
    this.handler.$emit('init', options)
  },
  async asyncData({params}) {
    return axios.get('/api/arbi').then((res) => {
      // {"exchange":"UBT","symbol":"XRP","price":384,"time":"201904200632"}
      let jobj = {};
      for (let i = 0; i < res.data.length; i++) {
        let price = '' + res.data[i].arbi.price;
        jobj[res.data[i].arbi.exchange + '_' + res.data[i].arbi.symbol] = price;
      }
      jobj['GAP_BTC'] = ((jobj['UBT_BTC'] - jobj['BFX_BTC']) * 100 / jobj['BFX_BTC']).toFixed(2) + '%';
      jobj['GAP_ETH'] = ((jobj['UBT_ETH'] - jobj['BFX_ETH']) * 100 / jobj['BFX_ETH']).toFixed(2) + '%';
      jobj['GAP_XRP'] = ((jobj['UBT_XRP'] - jobj['BFX_XRP']) * 100 / jobj['BFX_XRP']).toFixed(2) + '%';
      jobj['GAP_EOS'] = ((jobj['UBT_EOS'] - jobj['BFX_EOS']) * 100 / jobj['BFX_EOS']).toFixed(2) + '%';
      jobj['GAP_LTC'] = ((jobj['UBT_LTC'] - jobj['BFX_LTC']) * 100 / jobj['BFX_LTC']).toFixed(2) + '%';
      for (let i = 0; i < res.data.length; i++) {
        // 원화 단위로 가공
        let price = '' + res.data[i].arbi.price.toLocaleString();
        jobj[res.data[i].arbi.exchange + '_' + res.data[i].arbi.symbol] = price;
      }
      return jobj;
    })
  },
  data: function () {
    return {
      handler: new Vue(),
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
