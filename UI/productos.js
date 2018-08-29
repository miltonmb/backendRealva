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
    var inCateg = $('#product_categ').val();
    var inTypeUse = $('#typeUse').val();
    var inUnidTec = $('#product_unidTec').val();
    var inSpecies = $('#product_species_list').val();
    var inPrice = document.forms["myForm"]["product_price"].value;
    var inLab = $('#product_labo').val();

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
            codigo: inCode,
            nombre: inName,
            descripcion: inDescription,
            indicacion: inIndications,
            contraindicacion: inContraindication,
            dosis: inDosis,
            categ: inCateg,
            tipoUso: inTypeUse,
            especie: inSpecies,
            unidTec: inUnidTec,
            precio: inPrice,
            laboratorio: inLab
        });
        alert("Se agrego con éxito!");
    }
    //'products' is the name of the 'collection' (aka database table)
    document.getElementById("btnSubir").reset();
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
        document.getElementById('mostrarimagen').innerHTML = `<img src='${reader.result}' class='imagenesDisplay' height="65%" width="65%">`
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

function addRow() {
    var myTable = document.getElementById("tablaDosis");
    var currentIndex = myTable.rows.length;
    var currentRow = myTable.insertRow(-1);
    currentRow.setAttribute("id", "rowDosis" + currentIndex);

    /*type="text" id="dosis0" name="product_dosis0" class="form-control" required="required"
    placeholder="Presentación" dosis*/
    var dosisBox = document.createElement("input");
    dosisBox.setAttribute("name", "product_dosis" + currentIndex);
    dosisBox.setAttribute("type", "text");
    dosisBox.setAttribute("id", "dosis" + currentIndex);
    dosisBox.setAttribute("class", "form-control");
    dosisBox.setAttribute("required", "required");
    dosisBox.setAttribute("placeholder", "Presentación");

    /*input step="any" min="0" value="0.00" type="number" id="product_price0" class="form-control"
    required="required"> precio */
    var precioBox = document.createElement("input");
    precioBox.setAttribute("step", "any");
    precioBox.setAttribute("type", "number");
    precioBox.setAttribute("id", "product_price" + currentIndex);
    precioBox.setAttribute("class", "form-control");
    precioBox.setAttribute("required", "required");
    precioBox.setAttribute("min", "0");
    precioBox.setAttribute("value", "0.00");

    /*<button id="btnRemoveRow" type="button" class="btn btn-danger" onclick="removeRow()">-</button>*/
    var removeBox = document.createElement("button");
    removeBox.setAttribute("type", "button");
    removeBox.setAttribute("id", "rowDosis" + currentIndex);
    removeBox.setAttribute("class", "btn btn-danger");
    removeBox.setAttribute("onclick", "removeRow(this)");
    removeBox.textContent = "-";


    var currentCell = currentRow.insertCell(-1);
    currentCell.appendChild(dosisBox);

    currentCell = currentRow.insertCell(-1);
    currentCell.appendChild(precioBox);

    currentCell = currentRow.insertCell(-1);
    currentCell.appendChild(removeBox);
}

function removeRow(that) {
    if (confirm("Eliminar?")) {
        console.log(that.id);
        var element = document.getElementById(that.id);
        element.parentNode.removeChild(element);
    }

}

function cargarDatos() {
    console.log("cargarDatos");
    var inCode = document.forms["myForm"]["product_code"].value;
    var inName = document.forms["myForm"]["product_name"].value;
    var inDosis = document.forms["myForm"]["product_dosis"].value;
    console.log(inDosis);
    var inDescription = document.forms["myForm"]["product_description"].value;
    var inIndications = document.forms["myForm"]["product_indications"].value;
    var inContraindication = document.forms["myForm"]["product_contraindication"].value;
    var inCateg = $('#product_categ').val();
    var inTypeUse = $('#typeUse').val();
    console.log(inTypeUse);
    var inUnidTec = $('#product_unidTec').val();
    var inSpecies = $('#product_species_list').val();
    var inPrice = document.forms["myForm"]["product_price"].value;
    var inLab = $('#product_labo').val();

    var files = document.getElementById('imagenProducto').files;
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = function () {
        selectedfile = reader.result;
        document.getElementById('mostrarImg').innerHTML = `<img src='${reader.result}' class='imagenesDisplay' height="65%" width="65%">`
    };

    document.getElementById('code').value = inCode;
    document.getElementById('name').value = inName;
    document.getElementById('description').value = inDescription;
    document.getElementById('indications').value = inIndications;
    document.getElementById('contraindication').value = inContraindication;
    document.getElementById('dosisModal').value = inDosis;
    document.getElementById('categ').value = inCateg;
    document.getElementById('typeUseModal').value = inTypeUse;
    document.getElementById('unidTec').value = inUnidTec;
    document.getElementById('species').value = inSpecies;
    document.getElementById('price').value = inPrice;
    document.getElementById('lab').value = inLab;

}
