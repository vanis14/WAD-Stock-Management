// Create a product with the information entered in the web page
var addStock = function () {
  const http = new XMLHttpRequest();

  const product = {
    "productId": parseInt( document.getElementById( "productId" ).value ),
    "name": document.getElementById( "name" ).value,
    "cost": parseFloat( document.getElementById( "cost" ).value ),
	"quantity": parseInt( document.getElementById( "quantity" ).value ),
	"msrp": parseFloat( document.getElementById( "msrp" ).value ),
	"category": document.getElementById( "category" ).value,	
	"unitSold": parseInt( document.getElementById( "unitSold" ).value )
  }

  http.open( "POST", urlCreate );
  http.setRequestHeader( "Content-Type", "application/json;charset=UTF-8" );
  http.send( JSON.stringify( product ) );

  http.onreadystatechange = function () {
    if ( http.readyState === XMLHttpRequest.DONE && http.status === 200 ) {
      alert( http.responseText );
    }
  };
}