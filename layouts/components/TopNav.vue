<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link
      to="/"
      class="navbar-brand"
    >
      <img
        src="/images/logo.png"
        alt="4th"
        class="d-md-block"
      >
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div
      id="navbarSupportedContent"
      class="collapse navbar-collapse"
    >
      <ul class="navbar-nav mr-auto">
        <router-link
          to="/explorer"
          active-class="active"
          class="nav-item"
          tag="li"
        >
          <a class="nav-link">
            블록탐색
          </a>
        </router-link>
        <router-link
          to="/solution"
          active-class="active"
          class="nav-item"
          tag="li"
        >
          <a class="nav-link">
            서비스
          </a>
        </router-link>
        <!--
        <router-link
          to="/compare"
          active-class="active"
          class="nav-item"
          tag="li"
        >
          <a class="nav-link">
            가격비교
          </a>
        </router-link>
        -->
        <router-link
          to="/souvenir"
          active-class="active"
          class="nav-item"
          tag="li"
        >
          <a class="nav-link">
            기념품샵
          </a>
        </router-link>
      </ul>
      <form class="form-inline my-2 my-lg-0">
      </form>
    </div>
  </nav>
</template>

<style>
.navbar { box-shadow: 0 0.46875rem 2.1875rem rgba(4,9,20,.03), 0 0.9375rem 1.40625rem rgba(4,9,20,.03),
    0 0.25rem 0.53125rem rgba(4,9,20,.05), 0 0.125rem 0.1875rem rgba(4,9,20,.03);
    padding: 0 24px !important; }
.btn-primary:not(:disabled):not(.disabled):active { margin-right: -70px; }
.btn.mobile_menu { color: #fff;background-color: #ddd;border: 1px solid #666;color: #888; }
#navbarSupportedContent > ul { margin: 0 auto; }
.navbar .navbar-nav .nav-link:not(.btn) { font-size: 1.33em; }
</style>
