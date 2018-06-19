function openSlideMenu() {
    document.getElementById('side-menu').style.width = '250px';
    document.getElementById('main').style.marginLeft = '250px';
}

function closeSlideMenu() {
    document.getElementById('side-menu').style.width = '0px';
    document.getElementById('main').style.marginLeft = '0px';
}
var config = {
    apiKey: "AIzaSyBZAKqZfYiuQDTF-pDtZsxlO5X72wNFA1Q",
    authDomain: "realva-54c4a.firebaseapp.com",
    databaseURL: "https://realva-54c4a.firebaseio.com",
    projectId: "realva-54c4a",
    storageBucket: "realva-54c4a.appspot.com",
    messagingSenderId: "233461489484"
};
firebase.initializeApp(config);
var database = firebase.database();

var firebaseOrdersCollection = database.ref().child('products');

function submitOrder() {
    //Grab order data from the form
    var inCode = document.forms["myForm"]["product_code"].value;
    var inName = document.forms["myForm"]["product_name"].value;
    var inDosis = document.forms["myForm"]["product_dosis"].value;
    var inDescription = document.forms["myForm"]["product_description"].value;
    var inIndications = document.forms["myForm"]["product_indications"].value;
    var inContraindication = document.forms["myForm"]["product_contraindication"].value;
    var inCateg = document.forms["myForm"]["product_categ"].value;
    var inTypeUse = document.forms["myForm"]["product_type_use"].value;
    var inUnidTec = document.forms["myForm"]["product_unidTec"].value;
    var inSpecies = document.forms["myForm"]["product_species"].value;
    var inPrice = document.forms["myForm"]["product_price"].value;
  
    if (inName == "") {
        alert("Nombre Vacio");
        return false;
    }
    if (inDescription == "") {
        alert("Descripción Vacia");
        return false;
    }
    if (inIndications == "") {
        alert("Indicación Vacia");
        return false;
    }
    if (inContraindication == "") {
        alert("Contraindicación Vacia");
        return false;
    }
    var products = {
        code:inCode,
        name: inName,
        description: inDescription,
        indications: inproductindications,
        contraindication: inproductcontraindication,
        dosis: inDosis,
        categ: inCateg,
        typeUse: inTypeUse,
        unidTec: inUnidTec,
        species: inSpecies,
        price: inPrice,
        img: ""
    };

    //'push' (aka add) your order to the existing list
    firebaseOrdersCollection.push(products); //'products' is the name of the 'collection' (aka database table)

};


function validateForm() {
    var inName = document.forms["myForm"]["product_name"].value;
    var inDescription = document.forms["myForm"]["product_description"].value;
    if (inName == "") {
        alert("Name must be filled out");
        return false;
    }
    if (inDescription == "") {
        alert("Descripción Vacia");
        return false;
    }

}