<template>
  <div class="layout_wrapper">
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
html { height: 100%; }
body { min-height: 100%;position: relative; }
.layout_wrapper { }
section.content { padding-bottom: 115px; }
.footer { position: absolute; right: 0;
    bottom: 0; left: 0; }
.contents-wrapper { min-height: 100%; }
.row h3 { margin: 10px 10px 0 10px; }
.card .body { padding: 10px 10px; }
.media-latest { margin-left: -15px;padding-right: 2px; }
.carousel-inner, .carousel-item { height: 100%; }
.carousel-item { background-size: cover;background-repeat: no-repeat; }
.badge-info { background: white;color: rgb(96, 125, 139);border: 1px solid rgb(96, 125, 139); }
.thumb_article { min-width: 89px;height: 56px;display: list-item;background-size: cover;
    margin-right: 6px;border: 1px solid #444;background-position: center; }
.table { table-layout: fixed; }
.table td, .table th {
    font-size: 17px;overflow: hidden;height: 46px;padding: 0.5rem;vertical-align: top; }
.img-line2-text {
  text-overflow: ellipsis;height: 58px;overflow: hidden;
  display: inline-flex;line-height: 19px;font-weight: 600;padding: 2px;
  background-color: rgba(255,255,255,0.4); }
</style>
