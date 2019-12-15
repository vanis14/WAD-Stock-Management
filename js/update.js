var products = {};

const dropdownEl = document.getElementById( "product-select" );

// Update the web page fields with the change in the dropdown menu
dropdownEl.addEventListener( "change", ( event ) => {
  var idEl, nameEl, costEl, msrpEl, categoryEl, quantityEl, soldEl product;
  var id = event.target.value;

  if ( id !== "" ) {
    idEl = document.getElementById( "productId" );
    nameEl = document.getElementById( "name" );
    costEl = document.getElementById( "cost" );
	soldEl = document.getElementById( "unitSold" );
	categoryEl = document.getElementById( "category" );
	msrpEl = document.getElementById( "msrp" );
	quantityEl = document.getElementById( "quantity" );

    product = product[ id ];
    idEl.value = id;
    nameEl.value = product.name;
    costEl.value = product.cost;
	soldEl.value = product.unitSold;
	categoryEl.value = product.category;
	msrpEl.value = product.msrp;
	quantityEl.value = product.quantity;
  } else {
     idEl = document.getElementById( "productId" );
    nameEl = document.getElementById( "name" );
    costEl = document.getElementById( "cost" );
	soldEl = document.getElementById( "unitSold" );
	categoryEl = document.getElementById( "category" );
	msrpEl = document.getElementById( "msrp" );
	quantityEl = document.getElementById( "quantity" );
	
	idEl = "";
    nameEl = "";
    costEl = "";
	soldEl = "";
	categoryEl = "";
	msrpEl = "";
	quantityEl = "";
  }
} );

// Get list of products in the server
const http = new XMLHttpRequest();
http.open( "GET", urlRetrieve );
http.send();

http.onreadystatechange = function () {
  var optionEl, attr, product;

  product = {};

  if ( http.readyState === XMLHttpRequest.DONE && http.status === 200 ) {
    product = JSON.parse( http.responseText );

    Object.keys( product ).forEach( function ( id ) {
      product = product[ id ];

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

// Update the product with the content available on the web page
var updateProduct = function () {
  const productId = parseInt( document.getElementById( "productId" ).value ),
  const quantity = parseInt( document.getElementById( "quantity" ).value ),
  const unitSold = parseInt( document.getElementById( "unitSold" ).value ),
  const name = document.getElementById( "name" ).value,
  const category = document.getElementById( "category" ).value,	
  const cost = parseFloat( document.getElementById( "cost" ).value )
  const msrp = parseFloat( document.getElementById( "msrp" ).value )
  const product = {
    "productId": id,
    "name": name,
    "cost": cost,
	"quantity": quantity,
	"msrp": msrp,
	"unitSold": unitSold,
	"category": category
  }
  const optionEl = document.querySelector( "select > option[value='" + id + "']" );

  if ( id !== "" ) {
    http.open( "POST", urlUpdate );
    http.setRequestHeader( "Content-Type", "application/json;charset=UTF-8" );
    http.send( JSON.stringify( product ) );

    http.onreadystatechange = function () {
      if ( http.readyState === XMLHttpRequest.DONE && http.status === 200 ) {
        optionEl.textContent = product.name;
        product[ id ] = product;
        alert( http.responseText );
      }
    };
  }
};