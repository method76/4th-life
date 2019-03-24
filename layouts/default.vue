<template>
  <div>
    <PageLoader />
    <Overlay />
    <!-- Main Content -->
    <TopNav />
    <div class="contents-wrapper">
        <coingecko-coin-price-marquee-widget
        coin-ids="bitcoin,ethereum,eos,ripple,litecoin"
        currency="krw"
        background-color="#ffffff"
        locale="ko"
        />
      <section class="content">
        <nuxt />
      </section>
    </div>
    <BottomNav />
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
.row h3 { margin: 10px 10px 0 10px; }
.card .body { padding: 10px 10px; }
.media-latest { margin-left: -15px;padding-right: 2px; }
.carousel-inner, .carousel-item { height: 100%; }
.carousel-item { background-size: cover;background-repeat: no-repeat; }
.badge-info { background: white;color: rgb(96, 125, 139);border: 1px solid rgb(96, 125, 139); }
.thumb_article { min-width: 89px;height: 100%;display: list-item;background-size: cover;
    margin-right: 6px;border: 1px solid #444; }
.table { table-layout: fixed; }
.table td, .table th {
    font-size: 18px;
    overflow: hidden;height: 50px;vertical-align: middle;
    border-bottom: 1px dashed #436dc4;border-top: 0; }
.img-line2-text {
    text-overflow: ellipsis;height: 50px;overflow: hidden;
    display: inline-flex;line-height: 24px;font-weight: 600;
}
</style>
