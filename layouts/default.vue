<template>
  <div>
    <PageLoader />
    <Overlay />
    <!-- Main Content -->
    <coingecko-coin-price-marquee-widget
      coin-ids="bitcoin,ethereum,eos,ripple,litecoin"
      currency="krw"
      background-color="#ffffff"
      locale="ko"
    />
    <div class="contents-wrapper">
      <TopNav />
      <section class="content">
        <nuxt />
        <BottomNav />
      </section>
    </div>
  </div>
</template>

<script>
import PageLoader from './components/PageLoader.vue'
import Overlay from './components/Overlay.vue'
import TopNav from './components/TopNav.vue'
import BottomNav from './components/BottomNav.vue'
export default {
  components: {
    PageLoader, Overlay, TopNav, BottomNav
  }
}
</script>

<style>
.table { table-layout: fixed; }
.table td, .table th {
    overflow: hidden;height: 40px;
    vertical-align: middle; }
.img-line2-text {
    text-overflow: ellipsis;
    height: 40px;
    overflow: hidden;
    display: inline-flex;
}
</style>
