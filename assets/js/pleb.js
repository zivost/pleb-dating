function onSubmit(){
    let email = document.getElementById("email").value;
    let emailregx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let isValid = false;
    if ( email !== "" ) {
        if(emailregx.test(email)){
            isValid = true
        }
    }
    if(!isValid){
        alert("Enter a valid email!");
    }
    if(email) {
        var data = {
            email: email,
        }

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", "https://us-central1-pleb-app.cloudfunctions.net/earlyAccess", true ); // false for synchronous request
        xmlHttp.setRequestHeader('Content-type','application/json; charset=utf-8');
        xmlHttp.onreadystatechange = function() {
            console.log("asdasdasd", xmlHttp.readyState)
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                document.getElementById("email").value  = ""
                alert("Success!")
            }
        }
        xmlHttp.send(JSON.stringify({"email": email}))
    }
}
