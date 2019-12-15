var products = {};

const dropdownEl = document.getElementById( "product-select" );

// Get list of products in the server
const http = new XMLHttpRequest();
http.open( "GET", urlRetrieve );
http.send();

http.onreadystatechange = function () {
  var optionEl, attr, product;

  products = {};

  // Update the dropdown menu with the list of products available
  if ( http.readyState === XMLHttpRequest.DONE && http.status === 200 ) {
    products = JSON.parse( http.responseText );

    Object.keys( products ).forEach( function ( productId ) {
      product = products[ productId ];

      // Create option
      optionEl = document.createElement( "option" );
      optionEl.textContent = product.name;

      // Create value attribute
      attr = document.createAttribute( "value" );
      attr.value = product.productId;

      optionEl.setAttributeNode( attr );

      dropdownEl.appendChild( optionEl );
    } );
  }
};

// Delete the product selected in the dropdown menu
var deleteProduct = function () {
  var product;
  const selectEl = document.getElementById( "product-select" );
  const productId = selectEl.value;

  if ( productId !== "" ) {
    product = products[ productId ];

    http.open( "POST", urlDelete );
    http.setRequestHeader( "Content-Type", "application/json;charset=UTF-8" );
    http.send( JSON.stringify( product ) );

    http.onreadystatechange = function () {
      if ( http.readyState === XMLHttpRequest.DONE && http.status === 200 ) {
        selectEl.remove( selectEl.selectedIndex );
        delete products[ productId ];
        alert( http.responseText );
      }
    };
  }
}