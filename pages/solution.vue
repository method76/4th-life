<template>
  <!-- Main Content -->
  <div class="body_scroll">
    <div class="row">
      <div class="col-12 bg-slogan">
        <div class="slogan-wrapper">
          <h5>귀사의 비즈니스를 위한</h5>
          <h1>블록체인<br>기술 서비스</h1>
          <h5>컨설팅, 솔루션 & 서비스</h5>
        </div>
      </div>
    </div>
    <div class="row solutions">
      <div class="col-lg-3 col-12 solution-col">
        <div class="solution-inner">
          <img src="/images/solution/ic_engine.png">
          <div class="title-wrapper">
            <h5>Bitwise Agent</h5>
            <p>다양한 퍼블릿 또는 프라이빗 체인과 공통의 방법으로 동기화 하고 API가 연동되는, 마이크로서비스 기반의 애드온 에이전트입니다</p>
            <p>Bitcoin, BitcoinCash, Litecoin, Dogecoin, Ethereum, ERC-20, Multichain 지원</p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-12 solution-col">
        <div class="solution-inner">
          <img src="/images/solution/ic_mobile_wallet.jpg">
          <div class="title-wrapper">
            <h5>Bitwise Mobile</h5>
            <p>Bitwise Agent, 또는 귀사에서 운용하고 있는 블록체인(암호화폐 웹지갑) 서비스와 연결되는 모바일 지갑입니다 (안드로이드)</p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-12 solution-col">
        <div class="solution-inner">
          <img src="/images/solution/ic_private_chain.png">
          <div class="title-wrapper">
            <h5>사설체인 구축</h5>
            <p>멀티체인, 이더리움, 하이퍼레저, Exonum 등 오픈소스 블록체인을 이용하여 공개형 또는 사설 블록체인을 구축합니다</p>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-12 solution-col">
        <div class="solution-inner">
          <img src="/images/solution/ic_token.jpg">
          <div class="title-wrapper">
            <h5>ERC-20 토큰 발행</h5>
            <p>이더리움 네트워크에서 발행되는 ERC0-20 토큰을 발행합니다</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-slogan { background-image: url(/images/solution/bg_solutions.jpg); }
.solutions { padding: 0 20px; }
.solution-col { padding: 0; margin-top: 20px; }
.solution-col h5 { margin-bottom: 0; color: white; }
.solution-inner img { width: 100%; }
.title-wrapper p { color: white; }
</style>

<script>
export default {
  components: {
  },
  head() {
    return {
      title: '포스라이프 - 블록체인 기술 서비스',
      meta: [
        {hid: 'og:title', property: 'og:title', content: '포스라이프 - 블록체인 기술 서비스'},
        {hid: 'twitter:title', name: 'twitter:title', content: '포스라이프 - 블록체인 기술 서비스'},
      ]
    }
  },
}
</script>
