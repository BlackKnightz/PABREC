var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("btnUpdate").addEventListener("click",app.editar);
    },

    buscar: function(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var phone = url.searchParams.get("phone");

        var db = firebase.firestore();
        var ag = db.collection("users").where("phone", "==", phone);

        ag.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                document.getElementById("name").value = doc.data().cname;
                document.getElementById("email").value = doc.data().cemail;
                document.getElementById("password").value = doc.data().cpassword;
                document.getElementById("phone").value = doc.data().cphone;
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    },

    editar: function(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var getTelefone = url.searchParams.get("telefone");

        let cname = document.getElementById("name").value;
        let cemail = document.getElementById("email").value;
        let cpassword = document.getElementById("password").value;
        let cphone = document.getElementById("phone").value;

        var db = firebase.firestore();
        var ag = db.collection("user").where("phone", "==", getPhone);

        ag.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var dados = db.collection("agendamentos").doc(doc.id);

                return dados.update({
                    name: cname,
                    email: cemail,
                    password: cpassword,
                    phone: cphone,
                   
                })
                .then(() => {
                    console.log("Document successfully updated!");
                    window.location.href = cordova.file.applicationDirectory + "www/imc.html";
                })
                .catch((error) => {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    }

};

app.initialize();