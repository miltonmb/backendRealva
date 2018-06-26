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
    if (paginaactual < (producto.length / 10) - 1) {
        paginaactual++;
        for (let i = paginaactual * 10; i < producto.length; i++) {
            if (cont < 10) {
                element = producto[i];
                prueba += `<tr><td onclick="test(this)">${element.codigo}</td><td>${element.nombre}</td><td>${element.descripcion}</td><td>${element.indicacion}</td><td>${element.contraindicacion}</td><td>${element.dosis}</td><td>${element.categ}</td><td>${element.tipoUso}</td><td>${element.unidTec}</td><td>${element.especie}</td><td>${element.precio}</td></tr>`;
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
        if (cont < 10) {
            prueba += `<tr><td onclick="test(this)">${element.codigo}</td><td>${element.nombre}</td><td>${element.descripcion}</td><td>${element.indicacion}</td><td>${element.contraindicacion}</td><td>${element.dosis}</td><td>${element.categ}</td><td>${element.tipoUso}</td><td>${element.unidTec}</td><td>${element.especie}</td><td>${element.precio}</td></tr>`;
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
        for (let i = paginaactual * 10; i < producto.length; i++) {
            if (cont < 10) {
                element = producto[i];
                prueba += `<tr><td onclick="test(this)">${element.codigo}</td><td>${element.nombre}</td><td>${element.descripcion}</td><td>${element.indicacion}</td><td>${element.contraindicacion}</td><td>${element.dosis}</td><td>${element.categ}</td><td>${element.tipoUso}</td><td>${element.unidTec}</td><td>${element.especie}</td><td>${element.precio}</td></tr>`;
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

function test(that) {

    if (confirm("Eliminar?")) {
        console.log(that.innerHTML);
        ref.orderByChild('codigo').equalTo(that.innerHTML)
            .once('value').then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    ref.child(childSnapshot.key).remove();
                });
            });
    }

}