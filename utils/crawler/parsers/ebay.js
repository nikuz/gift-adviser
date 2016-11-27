'use strict';

exports = module.exports = function($) {
  return {
    name: $('#itemTitle').text(),
    price: $('#prcIsum').text().replace(/^[^\$]*/, ''),
    rating: 5 / 100 * parseFloat($('#si-fb').text())
  };
};
