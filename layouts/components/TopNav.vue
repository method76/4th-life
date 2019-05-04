<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <nuxt-link to="/" class="navbar-brand">
      <img src="/images/layout/ic_4th_life.png" alt="4th Life Logo" class="d-md-block">
    </nuxt-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div id="navbarSupportedContent" class="collapse navbar-collapse">
      <img class="m-menu-img mr-auto" src="/images/layout/ic_4th.png">
      <ul class="navbar-nav mr-auto">
        <nuxt-link to="/" active-class="active" class="nav-item" tag="li" exact>
          <a class="nav-link">미디어포탈</a>
        </nuxt-link>
        <nuxt-link to="/price" active-class="active" class="nav-item" tag="li">
          <a class="nav-link">김치프리미엄</a>
        </nuxt-link>
        <nuxt-link to="/souvenir" active-class="active" class="nav-item" tag="li">
          <a class="nav-link">암호화폐스티커</a>
        </nuxt-link>
        <nuxt-link to="/solution" active-class="active" class="nav-item" tag="li">
          <a class="nav-link">기술서비스</a>
        </nuxt-link>
      </ul>
    </div>
  </nav>
</template>

<style>
.navbar { box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,.03), 0 0.9375rem 1.40625rem rgba(4,9,20,.03),
    0 0.25rem 0.53125rem rgba(4,9,20,.05), 0 0.125rem 0.1875rem rgba(4,9,20,.03);
    padding: 0 24px !important; }
.btn-primary:not(:disabled):not(.disabled):active { margin-right: -70px; }
.btn.mobile_menu { color: #fff;background-color: #ddd;border: 1px solid #666;color: #888; }
#navbarSupportedContent > ul { margin-top: 10px; margin-left: 150px; padding-bottom: 10px;
  float: right; }
#navbarSupportedContent > ul > li { max-width: 150px; }
.navbar .navbar-nav .nav-link:not(.btn) { font-size: 1em;background-color: inherit; }
.m-menu-img { width: 120px; float: left; opacity: .11; margin-top: 30px; margin-left: 6px; }
</style>
