var selectedfile;
var selectedfile2;
var imagen = [];
var imageRef;
var config = {
    apiKey: "AIzaSyDDzZtyfob58UodI-DHwpU7T1qmkT1TJF8",
    authDomain: "induvet-cb00d.firebaseapp.com",
    databaseURL: "https://induvet-cb00d.firebaseio.com",
    projectId: "induvet-cb00d",
    storageBucket: "induvet-cb00d.appspot.com",
    messagingSenderId: "598870481132"
};
firebase.initializeApp(config);

var database = firebase.database();

function submitOrder() {
    var inCode = document.forms["myForm"]["product_code"].value;
    var inName = document.forms["myForm"]["product_name"].value;
    var inDescription = document.forms["myForm"]["product_description"].value;
    var inIndications = document.forms["myForm"]["product_indications"].value;
    var inContraindication = document.forms["myForm"]["product_contraindication"].value;
    var inCateg = $('#product_categ').val();
    var inTypeUse = $('#typeUse').val();
    var inUnidTec = $('#product_unidTec').val();
    var inSpecies = $('#product_species_list').val();
    var inLab = $('#product_labo').val();

    /*'push' (aka add) your order to the existing list 
    firebaseOrdersCollection.push(products);*/

    var oTable = document.getElementById('tablaDosis');
    var rowLength = oTable.rows.length;
    var dosisList = [];
    //  var precioList = [];

    for (i = 1; i < rowLength; i++) {
        var cellVal = $('#dosis' + i).val();
        var cellVal2 = $('#product_price' + i).val();
        let temp = { dosis: cellVal, precio: cellVal2 }
        dosisList.push(temp);
        //    precioList.push(cellVal2);
    }

    const newProduct = firebase.database().ref('/productos').push();
    newProduct.set({
        imagen: selectedfile,
        ficha: selectedfile2,
        codigo: inCode,
        nombre: inName,
        descripcion: inDescription,
        indicacion: inIndications,
        contraindicacion: inContraindication,
        //dosis: inDosis,
        presentacion: dosisList,
        //  precio:precioList,
        categ: inCateg,
        tipoUso: inTypeUse,
        especie: inSpecies,
        unidTec: inUnidTec,
        //precio: inPrice,
        laboratorio: inLab,
        visita: 0
    });
    alert("Se agrego con éxito!");
    cerrarModal();
    clearInputs();
    //'products' is the name of the 'collection' (aka database table)
    document.getElementById("btnSubir").reset();
};

function handleFileInput() {
    var files = document.getElementById('imagenProducto').files;

    if (files.length > 0) {
        getBase64(files[0]);
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
function handleFileInputFi() {
    var files = document.getElementById('fichaProducto').files;
    if (files.length > 0) {
        getBase64Fi(files[0]);
    }
}
function getBase64Fi(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        selectedfile2 = reader.result;
        //document.getElementById('mostrarimagen').innerHTML = `<img src='${reader.result}'>;

    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}
function clearInputs() {
    $('#codigo').val("");
    $('#nombre').val("");
    $('#descripcion').val("");
    $('#indicaciones').val("");
    $('#contraIndicaciones').val("");
    $('#typeUse').val("");

    $("#product_categ").val('default');
    $("#product_categ").selectpicker("refresh");

    $("#product_unidTec").val('default');
    $("#product_unidTec").selectpicker("refresh");

    $("#product_species_list").val('default');
    $("#product_species_list").selectpicker("refresh");

    var oTable = document.getElementById('tablaDosis');
    var rowLength = oTable.rows.length;
    $('#dosis1').val("");
    $('#product_price1').val("0.00");

    for (i = 2; i < rowLength; i++) {
        var element = document.getElementById("rowDosis" + i);
        element.parentNode.removeChild(element);
    }

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
    precioBox.setAttribute("step", "0.01");
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
        var element = document.getElementById(that.id);
        element.parentNode.removeChild(element);
    }

}

function cargarDatos() {
    var inCode = document.forms["myForm"]["product_code"].value;
    var inName = document.forms["myForm"]["product_name"].value;
    //    var inDosis = document.forms["myForm"]["product_dosis"].value;
    var inDescription = document.forms["myForm"]["product_description"].value;
    var inIndications = document.forms["myForm"]["product_indications"].value;
    var inContraindication = document.forms["myForm"]["product_contraindication"].value;
    var inCateg = $('#product_categ').val();
    var inTypeUse = $('#typeUse').val();
    var inUnidTec = $('#product_unidTec').val();
    var inSpecies = $('#product_species_list').val();
    //  var inPrice = document.forms["myForm"]["product_price"].value;
    var inLab = $('#product_labo').val();

    /*    var files = document.getElementById('imagenProducto').files;
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function () {
            selectedfile = reader.result;
            document.getElementById('mostrarImg').innerHTML = `
            <img id="img01" src='${reader.result}' class='imagenesDisplay' style="width:100%;max-width:800px">`
        };*/

    document.getElementById('code').value = inCode;
    document.getElementById('name').value = inName;
    document.getElementById('description').value = inDescription;
    document.getElementById('indications').value = inIndications;
    document.getElementById('contraindication').value = inContraindication;
    // document.getElementById('dosisModal').value = inDosis;
    document.getElementById('categ').value = inCateg;
    document.getElementById('typeUseModal').value = inTypeUse;
    document.getElementById('unidTec').value = inUnidTec;
    document.getElementById('species').value = inSpecies;
    // document.getElementById('price').value = inPrice;
    document.getElementById('lab').value = inLab;
    let newRow = '';
    var oTable = document.getElementById('tablaDosis');
    var rowLength = oTable.rows.length;
    /*
    <tr>
    <th>Presentación(Dosis)</th>
    <th>Precio</th>
    </tr>
    */

    newRow += `<tr>
    <th>Presentación(Dosis)</th>
    <th>Precio(Lps)</th>
    </tr>`;
    for (i = 1; i < rowLength; i++) {
        var cellVal = $('#dosis' + i).val();
        var cellVal2 = $('#product_price' + i).val();
        newRow += `<tr><td>${cellVal}</td><td>${cellVal2}</td></tr>`;
    }
    document.getElementById('tablaDos').innerHTML = newRow;
}

function abrirModal() {
    var inCode = document.forms["myForm"]["product_code"].value;
    var inName = document.forms["myForm"]["product_name"].value;
    var inDescription = document.forms["myForm"]["product_description"].value;
    var inIndications = document.forms["myForm"]["product_indications"].value;
    var inContraindication = document.forms["myForm"]["product_contraindication"].value;
    var inCateg = $('#product_categ').val();
    var inTypeUse = $('#typeUse').val();
    var inUnidTec = $('#product_unidTec').val();
    var inSpecies = $('#product_species_list').val();
    var inLab = $('#product_labo').val();
    var error = false;
    //border: 1px solid #ccc; default
    if (inCode == "") {
        alert("No tiene clave");
        error = true;
    }
    if (inName == "") {
        alert("No tiene nombre");
        error = true;
    }
    if (inDescription == "") {
        alert("No tiene descripción");
        error = true;
    }
    if (inIndications == "") {
        alert("No tiene indicación");
        error = true;
    }
    if (inContraindication == "") {
        alert("No tiene contraindicación");
        error = true;
    }
    if (inCateg == "") {
        alert("No tiene categoría");
        error = true;
    }
    if (inTypeUse == "") {
        alert("No tiene tipo de uso");
        error = true;
    }
    if (inUnidTec == "") {
        alert("No tiene unidad técnica");
        error = true;
    }
    if (inSpecies == "") {
        alert("No tiene especie");
        error = true;
    }
    /*
    if (inLab == "") {
        alert("No tiene laboratorio");
        error = true;
    }*/
    if (selectedfile == null) {
        alert("No hay una fota")
    }
    var oTable = document.getElementById('tablaDosis');
    //rows of table length
    var rowLength = oTable.rows.length;

    //loops rows    
    for (i = 1; i < rowLength; i++) {
        var cellVal = $('#dosis' + i).val();
        var cellVal2 = $('#product_price' + i).val();
        if (cellVal == "") {
            alert("No tiene dosis");
            error = true;
        }
        if (parseFloat(cellVal2) == parseFloat(0)) {
            alert("el precio es 0");
            error = true;
        }
    }
    if (error) {
        return false;
    }

    document.getElementById('id01').style.display = 'block';
    cargarDatos();
}


function cerrarModal() {
    document.getElementById('id01').style.display = 'none';
}

function getTableData() {
    //table
    clearInputs();
}