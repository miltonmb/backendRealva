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
                    <button onclick="eliminar(this)" id =${element.codigo}>Eliminar</button>
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
                <button onclick="eliminar(this)" id =${element.codigo}>Eliminar</button>
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
                prueba += `<div class="card col-md">
                <div class="card-body">
                    <h5 class="card-title">${element.nombre}</h5>
                    <p id="bigtext" class="card-text"><b>Descripción: </b>${element.descripcion}</p>
                    <p class="card-text"><b>Dosis:</b> ${element.dosis}</p>
                    <p class="card-text"><b>Tipo de uso:</b> ${element.tipoUso}</p>
                    <p class="card-text"><b>Unidad técnica:</b> ${element.unidTec}</p>
                    <button onclick="eliminar(this)" id =${element.codigo}>Eliminar</button>
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
function updatePaginaActual() {
    prueba = 'Página Actual: ' + paginaactual;
    document.getElementById('htmlPaginaActual').innerHTML = prueba;
}

function eliminar(that) {
    if (confirm("Eliminar?")) {
        ref.orderByChild('codigo').equalTo(that.id)
            .once('value').then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    ref.child(childSnapshot.key).remove();
                });
            });
            updatePaginaActual();
    }

}