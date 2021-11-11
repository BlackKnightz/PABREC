var cemail = localStorage.getItem('email');
var cpassword = localStorage.getItem('password');

var db = firebase.firestore();
var ag = db.collection("user").where("email", "==", cemail).where("password", "==", cpassword);

ag.get()
.then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var height = doc.data().height
        var weight = doc.data().weight

        var box_imc = document.getElementById('imc-value');
        var register_imc = document.getElementById('register-imc');
        var update_imc = document.getElementById('update-imc');
        var update_user = document.getElementById('update-user');

        if (height != "" && weight != "") {
          var imc = weight/(height * height);
          box_imc.append(imc.toFixed(2));
          update_imc.append("Atualizar Dados");
        } else {
          register_imc.append("Gravar dados");
        }
    });
})
.catch((error) => {
    alert(error);
});