function join() {

    alert("Welcome to EliteFit Gym!");

}

function calculateBMI() {

    let h = document.getElementById("height").value / 100;

    let w = document.getElementById("weight").value;

    let bmi = w / (h * h);

    document.getElementById("result").innerText =
        "Your BMI is " + bmi.toFixed(2);

}

function register() {

    let email = document.getElementById("regEmail").value;

    let pass = document.getElementById("regPassword").value;

    localStorage.setItem("email", email);

    localStorage.setItem("password", pass);

    alert("Registration Successful");

    window.location = "login.html";

}

function login() {

    let email = document.getElementById("email").value;

    let pass = document.getElementById("password").value;

    let storedEmail = localStorage.getItem("email");

    let storedPass = localStorage.getItem("password");

    if (email === storedEmail && pass === storedPass) {

        alert("Login Successful");

        window.location = "index.html";

    }

    else {

        alert("Invalid Login");

    }

}