// Función para registrar un usuario
function registerUser(event) {
    event.preventDefault(); 

    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    if (localStorage.getItem(username)) {
        alert("Este usuario ya se encuentra registrado.");
    } else {
        localStorage.setItem(username, password);
        alert("Usuario registrado con éxito.");
        document.getElementById("registerForm").reset(); 
    }
}

// Función para iniciar sesión
function loginUser(event) {
    event.preventDefault(); 

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const storedPassword = localStorage.getItem(username);

    if (storedPassword && storedPassword === password) {
        alert("Inicio de sesión exitoso.");
        window.location.href = "../pags/productos.html";
        alert("BIENVENIDO " + username);
    } else {
        alert("VERIFIQUE: Usuario o contraseña incorrectos.");
    }
}
    
    // Asignar eventos a los formularios
    document.getElementById("registerForm").addEventListener("submit", registerUser);
    document.getElementById("loginForm").addEventListener("submit", loginUser);
;
