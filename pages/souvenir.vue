<template>
  <!-- Main Content -->
  <div class="body_scroll">
    <div class="row">
      <div class="col-12 bg-slogan">
        <div class="slogan-wrapper">
          <h5>프로그래머, 암호화폐 애호가를 위한</h5>
          <h1>암호화폐 스티커</h1>
          <h5>저렴하게 데려가세요~</h5>
        </div>
      </div>
    </div>
    <div class="row contents-grid">
      <div class="col-xl-3 col-lg-4 col-sm-6">
        <div class="card">
          <div class="body product_item">
            <img src="/images/crypto/ic_laptop_sticker_1.png"
              alt="Product" class="img-fluid cp_img">
            <div class="product_details">
              <a href="#">프로그래머 노트북 스티커</a>
              <ul class="product_price list-unstyled">
                <li class="old_price">7,700원</li>
                <li class="new_price">5,900원</li>
              </ul>
            </div>
            <div class="action float-right">
              <a href="https://smartstore.naver.com/kchain/products/4351415497"
                class="btn btn-success waves-effect">네이버구매</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-lg-4 col-sm-6">
        <div class="card">
          <div class="body product_item">
            <img
              src="/images/crypto/a-title.jpg"
              alt="Product"
              class="img-fluid cp_img"
            >
            <div class="product_details">
              <a href="https://smartstore.naver.com/kchain/products/3994514502">
                암호화폐(가상화폐) 스티커셋 A
              </a>
              <ul class="product_price list-unstyled">
                <li class="old_price">6,800원</li>
                <li class="new_price">5,900원</li>
              </ul>
            </div>
            <div class="action float-right">
              <a href="javascript:openPopup('https://smartstore.naver.com/kchain/products/3994514502', 'shopPop');"
                class="btn btn-success waves-effect">네이버구매</a>
              <a href="javascript:openPopup('http://itempage3.auction.co.kr/DetailView.aspx?itemno=B639421647', 'shopPop');"
                class="btn btn-danger waves-effect">옥션구매</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-lg-4 col-sm-6">
        <div class="card">
          <div class="body product_item">
            <img src="/images/crypto/b-title.jpg" alt="Product" class="img-fluid cp_img">
            <div class="product_details">
              <a href="https://smartstore.naver.com/kchain/products/3994524965">
                암호화폐(가상화폐) 스티커셋 B
              </a>
              <ul class="product_price list-unstyled">
                <li class="old_price">6,800원</li>
                <li class="new_price">5,900원</li>
              </ul>
            </div>
            <div class="action float-right">
              <a href="javascript:openPopup('https://smartstore.naver.com/kchain/products/3994524965', 'shopPop');"
                class="btn btn-success waves-effect">네이버구매</a>
              <a href="javascript:openPopup('http://itempage3.auction.co.kr/DetailView.aspx?ItemNo=B624641629', 'shopPop');"
                class="btn btn-danger waves-effect">옥션구매</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-lg-4 col-sm-6">
        <div class="card">
          <div class="body product_item">
            <img src="/images/crypto/c-title.jpg" alt="Product" class="img-fluid cp_img">
            <div class="product_details">
              <a href="https://smartstore.naver.com/kchain/products/3994538537">
                암호화폐(가상화폐) 스티커셋 C
              </a>
              <ul class="product_price list-unstyled">
                <li class="old_price">6,800원</li>
                <li class="new_price">5,900원</li>
              </ul>
            </div>
            <div class="action float-right">
              <a href="javascript:openPopup('https://smartstore.naver.com/kchain/products/3994538537', 'shopPop');"
                class="btn btn-success waves-effect">네이버구매</a>
              <a href="javascript:openPopup('http://itempage3.auction.co.kr/DetailView.aspx?ItemNo=B624644157', 'shopPop');"
                class="btn btn-danger waves-effect">옥션구매</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-slogan { background-image: url(/images/souvenir/bg_laptop.jpg); }
.btn { font-weight: 600;font-size: 1.2em; }
.btn-success {
  color: #333;text-shadow: none;background-color: #fff;border: .05rem solid #888; }
.naver-buy-button {
  display: inline-block;
  overflow: hidden;
  height: 45px;
  background: url(https://img-shop.pstatic.net/smartstore/pc/dist/renew/img/auto-gen/20190227/164534/sp_skin_png24_180222.png) no-repeat;
}
.old_price { text-decoration-line: line-through; }
.contents-grid { padding: 20px; }
.contents-grid > div { padding: 0 10px 10px 10px; }
.card { border: 1px solid #bbb; padding-bottom: 10px; }
.product_item .product_details { margin-top: 10px; padding-top: 10px; border-top: 1px dashed #aaa; }
</style>

<script>
export default {
  components: {
  },
  head() {
    return {
      title: '포스라이프 - 암호화폐 스티커',
      meta: [
        {hid: 'og:title', property: 'og:title', content: '포스라이프 - 암호화폐 스티커'},
        {hid: 'twitter:title', name: 'twitter:title', content: '포스라이프 - 암호화폐 스티커'},
      ]
    }
  },
}
</script>
