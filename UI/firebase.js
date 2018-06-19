var cliente;
var paginaactual = 0;
var selectedfile;
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
                prueba += `<tr><td>${element.ClaveCliente}</td><td>${element.NombreEmpresa}</td><td>${element.NombreRepresetante}</td><td>${element.RTN}</td><td>${element.Estatus}</td><td>${element.Telefono1}</td><td>${element.Telefono2}</td><td>${element.Correo}</td><td>${element.Contraseña}</td><td>${element.Clasifiacion}</td><td>${element.Saldo}</td><td>${element.Direccion}</td><td><button>Aceptar</button></td><td><button>Modificar</button></td></tr>`;
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
            prueba += `<tr><td>${element.ClaveCliente}</td><td>${element.NombreEmpresa}</td><td>${element.NombreRepresetante}</td><td>${element.RTN}</td><td>${element.Estatus}</td><td>${element.Telefono1}</td><td>${element.Telefono2}</td><td>${element.Correo}</td><td>${element.Contraseña}</td><td>${element.Clasifiacion}</td><td>${element.Saldo}</td><td>${element.Direccion}</td><td><button>Aceptar</button></td><td><button>Modificar</button></td></tr>`;
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
                prueba += `<tr><td>${element.ClaveCliente}</td><td>${element.NombreEmpresa}</td><td>${element.NombreRepresentante}</td><td>${element.RTN}</td><td>${element.Estatus}</td><td>${element.Telefono1}</td><td>${element.Telefono2}</td><td>${element.Correo}</td><td>${element.Contraseña}</td><td>${element.Clasificacion}</td><td>${element.Saldo}</td><td>${element.Direccion}</td><td><button>Aceptar</button></td><td><button>Modificar</button></td></tr>`;
                cont++;
            }
        }
        document.getElementById('clientRows').innerHTML = prueba;
        updatePaginaActual();
    }
}
function updatePaginaActual() {
    prueba = 'Pagina Actual: ' + paginaactual;
    document.getElementById('htmlPaginaActual').innerHTML = prueba;
}

function uploadFile(){
    const newImage = firebase.database().ref('/imagenes').push();
    newImage.set({
      id: newImage.key,
      imagen: selectedfile
    });
}
function getImage(){
    let imagen=[];
    firebase.database().ref('imagenes').on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            console.log(childSnapshot.val());
            imagen.push(childSnapshot.val());
        });
        document.getElementById('mostrarimagen').innerHTML = `<img src='${imagen[1].imagen}'>`
    });
}
function handleFileInput(){
    var files = document.getElementById('imagen').files;
    if (files.length > 0) {
      getBase64(files[0]);
    }
}
function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        selectedfile = reader.result;
        document.getElementById('mostrarimagen').innerHTML = `<img src='${reader.result}'>`
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
