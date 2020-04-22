"use strict";

Vue.filter('currency', function (value) {
  return '$' + value.toFixed(2);
});
var order = new Vue({
  el: '#main',
  data: {
    services: [{
      name: 'Web Development',
      price: 300,
      active: true
    }, {
      name: 'Design',
      price: 400,
      active: false
    }, {
      name: 'Integration',
      price: 250,
      active: false
    }, {
      name: 'Training',
      price: 220,
      active: false
    }]
  },
  methods: {
    toggleActive: function toggleActive(s) {
      s.active = !s.active;
    },
    total: function total() {
      var total = 0;
      this.services.forEach(function (s) {
        if (s.active) {
          total += s.price;
        }
      });
      return total;
    }
  }
});