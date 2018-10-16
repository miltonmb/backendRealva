var cliente;
var paginaactual = 0;
var selectedfile;
var tempcliente;
var config = {
    apiKey: "AIzaSyDDzZtyfob58UodI-DHwpU7T1qmkT1TJF8",
    authDomain: "induvet-cb00d.firebaseapp.com",
    databaseURL: "https://induvet-cb00d.firebaseio.com",
    projectId: "induvet-cb00d",
    storageBucket: "induvet-cb00d.appspot.com",
    messagingSenderId: "598870481132"
};
firebase.initializeApp(config);
window.onload = function () {
    chargeClientes(2);
    updatePaginaActual();
}
function chargeClientes(option) {
    cliente = [];
    if(option == 1){
        firebase.database().ref('clientes').on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                cliente.push(childSnapshot.val());
            });
            chargeActualPage();
        });
    }else{
        firebase.database().ref('clientes').on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                cliente.push(childSnapshot.val());
            });
            chargeFirstPage();
        });
    }
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
                prueba += `<tr class='row' ><td>${element.ClaveCliente}</td><td>${element.NombreEmpresa}</td><td>${element.NombreRepresentante}</td><td>${element.RTN}</td><td><button id='${element.id}' onclick="document.getElementById('id01').style.display='block';cargarDatos(id)" class="w3-button w3-green w3-large">Ver Mas</button>`;
                cont++;
            }
        }
        document.getElementById('clientRows').innerHTML = prueba;
        updatePaginaActual();
    }
}
function chargeActualPage() {
    let prueba = '';
    let cont = 0;
    let element;
    for (let i = paginaactual * 10; i < cliente.length; i++) {
        if (cont < 10) {
            element = cliente[i];
            prueba += `<tr class='row' ><td>${element.ClaveCliente}</td><td>${element.NombreEmpresa}</td><td>${element.NombreRepresentante}</td><td>${element.RTN}</td><td><button id='${element.id}' onclick="document.getElementById('id01').style.display='block';cargarDatos(id)" class="w3-button w3-green w3-large">Ver Mas</button>`;
            cont++;
        }
    }
    document.getElementById('clientRows').innerHTML = prueba;
    updatePaginaActual();
}
function updatePaginaActual() {
    prueba = 'Página Actual: ' + paginaactual;
    document.getElementById('htmlPaginaActual').innerHTML = prueba;
}

function onAcept(identificador) {
    console.log(identificador);
    var updates = {};
    updates['/clientes/' + identificador + '/Estatus'] = 'Activo';
    firebase.database().ref().update(updates);
    document.getElementById('Estatus').value = 'Activo';
    chargeClientes(1);
}

function cargarDatos(id) {
    let element;
    for (let i = paginaactual * 10; i < cliente.length; i++) {
        if (cliente[i].id === id) {
            element = cliente[i];
        }
    }
    tempcliente = element;
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
function onModificar(id) {
    var updates = {};
    updates['/clientes/' + id + '/ClaveCliente'] = document.getElementById('ClaveCliente').value;
    updates['/clientes/' + id + '/Clasificacion'] = document.getElementById('Clasificacion').value;
    updates['/clientes/' + id + '/Correo'] = document.getElementById('Correo').value;
    updates['/clientes/' + id + '/Direccion'] = document.getElementById('Direccion').value;
    updates['/clientes/' + id + '/Estatus'] = document.getElementById('Estatus').value;
    updates['/clientes/' + id + '/NombreEmpresa'] = document.getElementById('NombreEmpresa').value;
    updates['/clientes/' + id + '/NombreRepresentante'] = document.getElementById('NombreRepresentante').value;
    updates['/clientes/' + id + '/RTN'] = document.getElementById('RTN').value;
    updates['/clientes/' + id + '/Telefono1'] = document.getElementById('Telefono1').value;
    updates['/clientes/' + id + '/Telefono2'] = document.getElementById('Telefono2').value;
    firebase.database().ref().update(updates);
    document.getElementById('Estatus').value = 'Activo';
    chargeClientes(1);
}
function buscarCliente(elemento){
    let element = null;
    for (let i = paginaactual * 10; i < cliente.length; i++) {
        if (cliente[i].id === elemento) {
            element = cliente[i];
        }
        if (cliente[i].NombreEmpresa === elemento) {
            element = cliente[i];
        }
        if (cliente[i].NombreRepresentante === elemento) {
            element = cliente[i];
        }
        if (cliente[i].RTN === elemento) {
            element = cliente[i];
        } 
    }
    if(element !=null){
        tempcliente = element;
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
        document.getElementById('id01').style.display='block';
    }else{
        document.getElementById('id03').style.display='block';
    }
}
function buscar(){
    var textobuscar = document.getElementById('busqueda').value;
    buscarCliente(textobuscar);
}