var cliente;
var paginaactual = 0;
var selectedfile;
var tempcliente;
var config = {
    apiKey: "AIzaSyBZAKqZfYiuQDTF-pDtZsxlO5X72wNFA1Q",
    authDomain: "realva-54c4a.firebaseapp.com",
    databaseURL: "https://realva-54c4a.firebaseio.com",
    projectId: "realva-54c4a",
    storageBucket: "realva-54c4a.appspot.com",
    messagingSenderId: "233461489484"
};
firebase.initializeApp(config);
window.onload = function () {
    chargeClientes();
    updatePaginaActual();
}
function chargeClientes() {
    cliente = [];
    firebase.database().ref('clientes').on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            cliente.push(childSnapshot.val());
        });
        console.log();
        chargeFirstPage();
    });
}
function chargeNextPage() {
    let prueba = '';
    let cont = 0;
    let element;
    if (paginaactual < (cliente.length / 10) - 1) {
        paginaactual++;
        for (let i = paginaactual * 10; i < cliente.length; i++) {
            if (cont < 10) {
                element = cliente[i];
                prueba += `<tr ><td>${element.ClaveCliente}</td><td>${element.NombreEmpresa}</td><td>${element.NombreRepresentante}</td><td>${element.RTN}</td><td><button id='${element.id}' onclick="document.getElementById('id01').style.display='block';cargarDatos(id)" class="w3-button w3-green w3-large">Ver Mas</button>`;
                cont++;
            }
        }
        document.getElementById('clientRows').innerHTML = prueba;
        updatePaginaActual();
    }
}
function chargeFirstPage() {
    let prueba = '';
    let cont = 0;
    cliente.forEach(element => {
        if (cont < 10) {
            prueba += `<tr ><td>${element.ClaveCliente}</td><td>${element.NombreEmpresa}</td><td>${element.NombreRepresentante}</td><td>${element.RTN}</td><td><button id='${element.id}' onclick="document.getElementById('id01').style.display='block';cargarDatos(id)" class="w3-button w3-green w3-large">Ver Mas</button>`;
            cont++;
        }
    });
    paginaactual = 0;
    document.getElementById('clientRows').innerHTML = prueba;
}
function chargePrevPage() {
    let prueba = '';
    let cont = 0;
    let element;
    if (paginaactual > 0) {
        paginaactual--;
        for (let i = paginaactual * 10; i < cliente.length; i++) {
            if (cont < 10) {
                element = cliente[i];
                prueba += `<tr class='row' ><td>${element.ClaveCliente}</td><td>${element.NombreEmpresa}</td><td>${element.NombreRepresentante}</td><td>${element.RTN}</td><td><button onclick=onAcept(this.id)>Aceptar</button></td><td><button>Modificar</button></td></tr>`;
                cont++;
            }
        }
        document.getElementById('clientRows').innerHTML = prueba;
        updatePaginaActual();
    }
}
function updatePaginaActual() {
    prueba = 'Página Actual: ' + paginaactual;
    document.getElementById('htmlPaginaActual').innerHTML = prueba;
}

function onAcept(identificador){
    console.log(identificador);
    var updates = {};
    updates['/clientes/'+identificador+'/Estatus'] = 'Activo'; 
    firebase.database().ref().update(updates);
    document.getElementById('Estatus').value = 'Activo';
}

function cargarDatos(id){
    let element;
    for (let i = paginaactual * 10; i < cliente.length; i++) {
        if (cliente[i].id === id) {
            element = cliente[i];
        }
    }
    tempcliente = element;
    console.log(element.Correo);
    document.getElementById('ClaveCliente').value = element.ClaveCliente;
    document.getElementById('Clasificacion').value = element.Clasificacion;
    document.getElementById('Correo').value = element.Correo;
    document.getElementById('Direccion').value = element.Direccion;
    document.getElementById('Estatus').value = element.Estatus;
    document.getElementById('NombreEmpresa').value = element.NombreEmpresa;
    document.getElementById('NombreRepresentante').value = element.NombreRepresentante;
    document.getElementById('RTN').value = element.RTN;
    document.getElementById('Saldo').value = element.Saldo;
    document.getElementById('Telefono1').value = element.Telefono1;
    document.getElementById('Telefono2').value = element.Telefono2;
}

