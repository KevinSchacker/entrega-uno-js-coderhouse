// Función para registrar un usuario
function registerUser(event) {
    event.preventDefault(); 

    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    const messageElement = document.getElementById("registerMessage");

    if (localStorage.getItem(username)) {
        messageElement.textContent = "Este usuario ya se encuentra registrado.";
        messageElement.style.color = "red";
    } else {
        localStorage.setItem(username, password);
        messageElement.textContent = "Usuario registrado con éxito.";
        messageElement.style.color = "green";
        document.getElementById("registerForm").reset(); 
    }
}

// Función para iniciar sesión
function loginUser(event) {
    event.preventDefault(); 

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const messageElement = document.getElementById("loginMessage");

    const storedPassword = localStorage.getItem(username);

    if (storedPassword && storedPassword === password) {
        messageElement.textContent = "Inicio de sesión exitoso. Bienvenido " + username;
        messageElement.style.color = "green";
        setTimeout(() => {
            window.location.href = "../pags/productos.html";
        }, 2000); // Esperar 2 segundos antes de redirigir
    } else {
        messageElement.textContent = "VERIFIQUE: Usuario o contraseña incorrectos.";
        messageElement.style.color = "red";
    }
}

// Asignar eventos a los formularios
document.getElementById("registerForm").addEventListener("submit", registerUser);
document.getElementById("loginForm").addEventListener("submit", loginUser);
