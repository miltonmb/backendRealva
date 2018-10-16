var selectedfile;
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
    getImage();
}
function chargeImage() {
    let prueba = '';
    document.getElementById('listaimagenes').innerHTML = prueba;
    let element;
    for (let i = 0; i < imagen.length; i++) {
        element = imagen[i];
        prueba += `<div class='card'><a href='${imagen[i].imagen}' download><img src='https://image.flaticon.com/icons/png/512/259/259607.png' class='imagenesDisplay'></a> <div class='container'><i class='fa fa-trash icon' id='${imagen[i].id}' onclick=onDelete(this.id)></i></div></div>`;
    }
    document.getElementById('listaimagenes').innerHTML = prueba;
}
function uploadFile() {
    if (selectedfile == null) {

    } else {
        var fileInput = document.getElementById('archivosDescarga');   
        var filename = fileInput.files[0].name;
        const newImage = firebase.database().ref('/descargas').push();
        newImage.set({
            id: newImage.key,
            imagen: selectedfile,
            nombre: filename
        });
        getImage();
        alert("Se agrego con éxito!");
    }
    
}
function getImage() {
    imagen = [];
    firebase.database().ref('descargas').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            imagen.push(childSnapshot.val());
        });
        chargeImage();
    });
}
function handleFileInput() {
    var files = document.getElementById('archivosDescarga').files;
    if (files.length > 0) {
        getBase64(files[0]);
    }
}
function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        selectedfile = reader.result;
        //document.getElementById('mostrarimagen').innerHTML = `<img src='${reader.result}'>;

    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

function onDelete(id){
    console.log(id);
    firebase.database().ref('/descargas/'+id).remove();
    getImage();
    alert("Se elimino con éxito!");
}
