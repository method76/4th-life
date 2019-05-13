<template>
  <div id="chart-area"></div>
</template>

<script>
import axios from '../../plugins/axios'

export default {
  async asyncData({params}) {
    return axios.get('/api/graph').then((res) => {

      var chart = c3.generate({
        bindto: '#chart-area', // id of chart wrapper
        data: {
          columns: [
            // each columns data
            ['data1', 11, 8, 15, 18, 19, 17],
            ['data2', 7, 7, 5, 7, 9, 12]
          ],
          type: 'area', // default type of chart
          colors: {
            'data1': Aero.colors["blue"],
            'data2': Aero.colors["cyan"]
          },
          names: {
            // name of each serie
            'data1': 'KR',
            'data2': 'US'
          }
        },
        axis: {
          x: {
            type: 'category',
            // name of each category
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
          },
        },
        legend: {
          show: true, //hide legend
        },
        padding: {
          bottom: 0,
          top: 0
        },
      });
    });
  },
  mounted: function () {
  },
  beforeDestroy: function () {
  }
}
</script>