var producto;
var paginaactual = 0;
var selectedfile;

window.onload = function () {
    chargeproductos();
    updatePaginaActual();
}

var ref = firebase.database().ref('productos');
function chargeproductos() {
    producto = [];
    firebase.database().ref('productos').on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            producto.push(childSnapshot.val());
        });
        console.log();
        chargeFirstPage();
    });
}
function chargeNextPage() {
    let prueba = '';
    let cont = 0;
    let element;
    if (paginaactual < (producto.length / 8) - 1) {
        paginaactual++;
        for (let i = paginaactual * 8; i < producto.length; i++) {
            if (cont < 8) {
                element = producto[i];
                prueba += `<div class="card col-md">
                <div class="card-body">
                    <h5 class="card-title">${element.nombre}</h5>
                    <p id="bigtext" class="card-text"><b>Descripción:</b> ${element.descripcion}</p>
                    <p class="card-text"><b>Dosis: </b>${element.dosis}</p>
                    <p class="card-text"><b>Tipo de uso:</b> ${element.tipoUso}</p>
                    <p class="card-text"><b>Unidad técnica:</b> ${element.unidTec}</p>
                    <button onclick="eliminar(this)" id =${element.codigo} type="button"  class="w3-button w3-red w3-medium">Eliminar</button>
                    <button id='${element.codigo}' onclick="document.getElementById('id01').style.display='block';cargarDatos(id)" class="w3-button w3-blue w3-medium">Ver Mas</button>
                </div>
            </div>
            `;
                cont++;
            }
        }
        document.getElementById('productRows').innerHTML = prueba;
        updatePaginaActual();
    }
}
function chargeFirstPage() {
    let prueba = '';
    let cont = 0;
    producto.forEach(element => {
        if (cont < 8) {
            prueba += `<div class="card col-md">
            <div class="card-body">
                <h5 class="card-title">${element.nombre}</h5>
                <p id="bigtext" class="card-text"><b>Descripción:</b> ${element.descripcion}</p>
                <p class="card-text"><b>Dosis:</b> ${element.dosis}</p>
                <p class="card-text"><b>Tipo de uso: </b>${element.tipoUso}</p>
                <p class="card-text"><b>Unidad técnica: </b>${element.unidTec}</p>
                <button onclick="eliminar(this)" id =${element.codigo} type="button"  class="w3-button w3-red w3-medium">Eliminar</button>
                <button id='${element.codigo}' onclick="document.getElementById('id01').style.display='block';cargarDatos(id)" class="w3-button w3-blue w3-medium">Ver Mas</button>
            </div>
        </div>
        `;
            cont++;
        }
    });
    paginaactual = 0;
    document.getElementById('productRows').innerHTML = prueba;
}

function chargePrevPage() {
    let prueba = '';
    let cont = 0;
    let element;
    if (paginaactual > 0) {
        paginaactual--;
        for (let i = paginaactual * 8; i < producto.length; i++) {
            if (cont < 8) {
                element = producto[i];
                prueba += 
                        `<div class="card col-md">
                            <div class="card-body">
                                <h5 class="card-title">${element.nombre}</h5>
                                <p id="bigtext" class="card-text"><b>Descripción: </b>${element.descripcion}</p>
                                <p class="card-text"><b>Dosis:</b> ${element.dosis}</p>
                                <p class="card-text"><b>Tipo de uso:</b> ${element.tipoUso}</p>
                                <p class="card-text"><b>Unidad técnica:</b> ${element.unidTec}</p>
                                <button onclick="eliminar(this)" id =${element.codigo} type="button"  class="w3-button w3-red w3-medium">Eliminar</button>
                                <button id='${element.codigo}' onclick="document.getElementById('id01').style.display='block';cargarDatos(id)" class="w3-button w3-blue w3-medium">Ver Mas</button>
                            </div>
                        </div>`;
                cont++;
            }
        }
        document.getElementById('productRows').innerHTML = prueba;
        updatePaginaActual();
    }
}
function updatePaginaActual() {
    prueba = 'Página Actual: ' + paginaactual;
    document.getElementById('htmlPaginaActual').innerHTML = prueba;
}

function cargarDatos(inInfo){
    let element;
    for (let i = paginaactual * 8; i < producto.length; i++) {
        if (producto[i].codigo === inInfo) {
            element = producto[i];
        }
    }
    document.getElementById('mostrarImg').innerHTML = `<img src='${element.imagen}' class='imagenesDisplay' height="65%" width="65%">`;
    document.getElementById('code').value = element.codigo;
    document.getElementById('name').value = element.nombre;
    document.getElementById('description').value = element.descripcion;
    document.getElementById('indications').value = element.indicacion;
    document.getElementById('contraindication').value = element.contraindicacion;
    document.getElementById('dosis').value = element.dosis;
    document.getElementById('categ').value = element.categ;
    document.getElementById('typeUse').value = element.tipoUso;
    document.getElementById('unidTec').value = element.unidTec;
    document.getElementById('species').value = element.especie;
    document.getElementById('price').value = element.precio;
}

function eliminar(that) {
    if (confirm("Eliminar?")) {
        ref.orderByChild('codigo').equalTo(that.id)
            .once('value').then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    ref.child(childSnapshot.key).remove();
            });
        });
        location.reload();
    }

}