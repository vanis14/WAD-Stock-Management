// Show in a table the list of products in the server
const http = new XMLHttpRequest();
http.open( "GET", urlRetrieve );
http.send();

// Create the table with the list of products in the server
http.onreadystatechange = function () {
  var row, cell, table, products, product;

  if ( http.readyState === XMLHttpRequest.DONE && http.status === 200 ) {
    table = document.getElementById( "prodTab" );
    products = JSON.parse( http.responseText );

    Object.keys( products ).forEach( function ( id ) {
      product = products[ id ];

      // Create row
      row = document.createElement( "tr" );

      // Create productId cell
      cell = document.createElement( "td" );
      cell.textContent = product.productId;
      row.appendChild( cell );

      // Create Name cell
      cell = document.createElement( "td" );
      cell.textContent = product.name;
      row.appendChild( cell );

      // Create Cost cell
      cell = document.createElement( "td" );
      cell.textContent = product.cost;
      row.appendChild( cell );
	  
      // Create Quantity cell
      cell = document.createElement( "td" );
      cell.textContent = product.quantity;
      row.appendChild( cell );
	  
      // Create MSRP cell
      cell = document.createElement( "td" );
      cell.textContent = product.msrp;
      row.appendChild( cell );
	  
      // Create Category cell
      cell = document.createElement( "td" );
      cell.textContent = product.category;
      row.appendChild( cell );
	  
      // Create Unit Sold cell
      cell = document.createElement( "td" );
      cell.textContent = product.unitSold;
      row.appendChild( cell );
	  
      // Append
      table.appendChild( row );
    } );
  }
};