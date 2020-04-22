"use strict";

var web = new Vue({
  // A DOM element to mount our view model.
  el: '#main',
  // This is the model.
  // Define properties and give them initial values.
  data: {
    active: 'home'
  },
  // Functions we will be using.
  methods: {
    makeActive: function makeActive(item) {
      // When a model is changed, the view will be automatically updated.
      this.active = item;
    }
  }
});