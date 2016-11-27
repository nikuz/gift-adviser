'use strict';

exports = module.exports = function($) {
  let price = $('#priceblock_ourprice').text() ||
    $('#priceblock_dealprice').text();

  return {
    name: $('#productTitle').text(),
    price: price,
    rating: parseFloat($('#reviewStarsLinkedCustomerReviews .a-icon-alt').text())
  };
};
