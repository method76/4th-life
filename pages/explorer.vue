<template>
  <!-- Main Content -->
  <div class="body_scroll">
    <div class="block-header">
      <div class="row">
        <div class="col-12">
          <h2>블록 익스플로러</h2>
        </div>
      </div>
    </div>

    <!-- 가로 광고 Start -->
    <div class="row">
      <div class="col-12">
      </div>
    </div>
    <!-- 가로 광고 End -->

    <!-- BTC -->
    <div class="container-fluid product-grid">
      <div class="row clearfix">
        <div class="col-4">
          <!-- https://www.blockchain.com/ko/explorer -->
          <select class="selectpicker">
            <option>메인넷</option>
            <option>테스트넷</option>
          </select>
        </div>
        <!-- https://explorer.bitcoin.com/btc/tx/ -->
        <div class="col-8">
          <div class="input-group mb-4">
            <input
              type="text"
              class="form-control"
              placeholder="트랜잭션 해시 값 입력"
            >
            <div class="input-group-append">
              <button class="btn btn-outline-secondary"
                type="button" :click="searchTx(0)">검색</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid product-grid">
      <div class="row clearfix">
          <div class="col user-info">
            <img src="/images/crypto/ic_BTC.png" alt="Bitcoin Icon">
            <p>비트코인</p>
          </div>
          <div class="col user-info">
              <img src="/images/crypto/ic_ETH.png" alt="Ethereum Icon">
              <p>이더리움</p>
          </div>
          <div class="col user-info">
              <img src="/images/crypto/ic_EOS.png" alt="EOS Icon">
              <p>EOS</p>
          </div>
          <div class="col user-info">
              <img src="/images/crypto/ic_XRP.png" alt="EOS Icon">
              <p>리플</p>
          </div>
      </div>
    </div>
  </div>
      <!--<select class="selectpicker">-->
      <!--<option>etherscan.io</option>-->
      <!--<option>ethplorer.io</option>-->
      <!--<option>etherchain.org</option>-->
      <!--<option>blockchair.com</option>-->
      <!--<option>gastracker.io</option>-->
      <!--<option>blockchair.com</option>-->
      <!--<option>cryptoid.info</option>-->
      <!--</select>-->
      <!--<select class="selectpicker">-->
      <!--<option>bloks.io</option>-->
      <!--<option>eospark.com</option>-->
      <!--<option>eostracker.io</option>-->
      <!--<option>eosflare.io</option>-->
      <!--<option>eosflare.io</option>-->
      <!--<option>explorer.eosvibes.io</option>-->
      <!--<option>explorer.eosvibes.io</option>-->
      <!--</select>-->
      <!--<select class="selectpicker">-->
      <!--<option>etherscan.io</option>-->
      <!--<option>ethplorer.io</option>-->
      <!--<option>etherchain.org</option>-->
      <!--<option>blockchair.com</option>-->
      <!--<option>gastracker.io</option>-->
      <!--<option>blockchair.com</option>-->
      <!--<option>cryptoid.info</option>-->
      <!--</select>-->
</template>

<style scope>
input[type=text].form-control { border: 3px solid #e47297;height: 46px; }
.user-info img { width: auto;height: 80px; }
</style>

<script>
export default {
  components: {
  },
  methods: {
    searchTx(idx) {
      window.open("https://www.blockchain.com/ko/explorer", "_blank");
    }
  }
}
</script>
