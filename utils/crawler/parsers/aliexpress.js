'use strict';

exports = module.exports = function($) {
  let priceCurrency = $('.p-price-content .p-symbol').text().replace(/^[^\$]*/, ''),
    price = parseFloat($('#j-sku-price').text());

  return {
    name: $('h1.product-name').text(),
    price: `${priceCurrency}${price}`,
    rating: parseFloat($('.product-customer-reviews .percent-num').text())
  };
};