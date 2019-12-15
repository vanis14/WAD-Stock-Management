const bodyParser = require( "body-parser" );
const cors = require( "cors" );
const express = require( "express" );
const fs = require( "fs" );

// List of products
var product = {};

// ExpressJS configuration
const port = 8080;
const app = express();
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

app.use( cors( {
  origin: [ "http://localhost:8080", "http://127.0.0.1:8080" ],
  credentials: true
} ) );

app.use( function ( req, res, next ) {
  res.header( "Access-Control-Allow-Origin", "http://localhost:8080" );
  res.header( "Access-Control-Allow-Headers", true );
  res.header( "Access-Control-Allow-Credentials", true );
  res.header( "Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE" );
  next();
} );

app.get( "/retrieve", ( req, res ) => {
  res.json( product );
} );

app.post( "/create", ( req, res ) => {
  var success = false;

  if ( req.body ) {
    if ( !product[ req.body.productId ] ) {
      product[ req.body.productId ] = {
        "productId": req.body.productId,
        "name": req.body.name,
        "cost": req.body.cost,
        "quantity": req.body.quantity,
        "msrp": req.body.msrp,
        "category": req.body.category,
        "unitSold": req.body.unitSold
      }
      success = true;
    }

    if ( success ) {
      res.send( "Product created" );
    } else {
      res.send( "Error creating product" );
    }
  }
} );

app.post( "/update", ( req, res ) => {
  var product;
  var success = false;

  if ( req.body ) {
    if ( product[ req.body.productId ] ) {
      product = {
        "productId": req.body.productId,
        "name": req.body.name,
        "cost": req.body.cost,
        "quantity": req.body.quantity,
        "msrp": req.body.msrp,
        "category": req.body.category,
        "unitSold": req.body.unitSold
      }
      product[ req.body.productId ] = productId;
      success = true;
    }
  }

  if ( success ) {
    res.send( "Product updated" );
  } else {
    res.send( "Error updating product" );
  }
} );

app.post( "/delete", ( req, res ) => {
  var success = false;

  if ( req.body ) {
    if ( product[ req.body.productId ] ) {
      delete product[ req.body.productId ];
      success = true;
    }
  }

  if ( success ) {
    res.send( "Product deleted" );
  } else {
    res.send( "Error deleting product" );
  }
} );

app.listen( port, () => {
  console.log( `Server listening on port ${port}!` )
} );