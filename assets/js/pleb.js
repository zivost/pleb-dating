function onSubmit(){
    let email = document.getElementById("email").value;
    let emailregx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let btnId =  document.getElementById("submit");
    let btnDis = document.getElementById("upper");
    let isValid = false;
    ga('send', 'event', "GetEarlyAccessButton", "Clicked", "GetEarlyAccess", 1);
    if ( email !== "" ) {
        if(emailregx.test(email)){
            isValid = true
        }
    }
    if(!isValid){
        alert("Enter a valid email!");
    }
    if(email) {
        btnDis.style.backgroundColor = "#000000a6"
        btnId.disabled = true;
        var data = {
            email: email,
        }

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", "https://us-central1-pleb-app.cloudfunctions.net/earlyAccess", true ); // false for synchronous request
        xmlHttp.setRequestHeader('Content-type','application/json; charset=utf-8');
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                document.getElementById("email").value  = ""
                alert("Success!")
                btnId.disabled = false;
                btnDis.style.backgroundColor = "#000000"
                ga('send', 'event', "GetEarlyAccessButton", "Submitted", "GetEarlyAccess", 1);
            }
        }
        xmlHttp.send(JSON.stringify({"email": email}))
    }
}

var el = document.getElementsByClassName("cookieConsent")[0];
function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}
ready(function(){
    var policyShow = localStorage.getItem("cookie_policy_accepted") === "yes";
    if(!policyShow){
        setTimeout(function () {
            el.classList.add("cookieConsentVisible");
        }, 7000);
    }
})

function agree(){
    ga('send', 'event', "CookiePolicyButton", "Clicked", "CookiePolicyAgreeEvent", 1);
    localStorage.setItem("cookie_policy_accepted","yes");
    el.classList.remove("cookieConsentVisible");
}
