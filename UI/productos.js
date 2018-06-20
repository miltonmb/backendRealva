var selectedfile;
var imagen = [];
var imageRef;
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

    /*if (inCode == "") {
        alert("Contraindicación Vacia");
        return false;
    }

    if (inName == "") {
        alert("Nombre Vacio");
        return false;
    }
    if (inDosis == "") {
        alert("Contraindicación Vacia");
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
    if (inCateg == "") {
        alert("Categoría Vacia");
        return false;
    }

    if (inTypeUse == "") {
        alert("Uso Vacio");
        return false;
    }
    if (inUnidTec == "") {
        alert("Técnica Vacia");
        return false;
    }
    if (inSpecies == "") {
        alert("Especie Vacia");
        return false;
    }*/
    /*
    var products = {
        code: inCode,
        name: inName,
        description: inDescription,
        indications: inIndications,
        contraindication: inContraindication,
        dosis: inDosis,
        categ: inCateg,
        typeUse: inTypeUse,
        unidTec: inUnidTec,
        species: inSpecies,
        price: inPrice,
        img: ""
    };

    //'push' (aka add) your order to the existing list
    firebaseOrdersCollection.push(products);*/
    if (selectedfile == null) {

    } else {
        const newProduct = firebase.database().ref('/productos').push();
        newProduct.set({
            imagen: selectedfile,
            //id: newProduct.key,
            code: inCode,
            name: inName,
            description: inDescription,
            indications: inIndications,
            contraindication: inContraindication,
            dosis: inDosis,
            categ: inCateg,
            typeUse: inTypeUse,
            unidTec: inUnidTec,
            species: inSpecies,
            price: inPrice,
        });
        alert("Se agrego con éxito!");
    }
    //'products' is the name of the 'collection' (aka database table)

};

function handleFileInput() {
    var files = document.getElementById('imagenProducto').files;
    console.log("handle");
    if (files.length > 0) {
        getBase64(files[0]);
        console.log("handle if");
    }
}
function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        selectedfile = reader.result;
        //document.getElementById('mostrarimagen').innerHTML = `<img src='${reader.result}' class='imagenesDisplay'>`
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}