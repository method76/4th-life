<template>
    <div class="component-wrapper">
        <div class="row">
            <ul class="col-12">
                <li><a href="#"><img src="https://s2.coinmarketcap.com/static/img/exchanges/32x32/351.png"></a></li>
                <li><a href="#"><img src="https://s2.coinmarketcap.com/static/img/exchanges/32x32/37.png" alt="bitfinex"></a></li>
            </ul>
        </div>
        <div class="row">
            <div class="col-12">
                <table class="uk-table uk-table-hover gap-comparison">
                    <thead>
                    <tr>
                        <th>Currency / Gap</th><th><span>Price Range</span></th><th>Min <i class='uk-icon-arrow-right'></i> Max</th><th>More..</th>
                    </tr>
                    </thead>
                    <tbody id="ticker_body">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style>
</style>

<script>
export default {
  components: {
  }
}
</script>
