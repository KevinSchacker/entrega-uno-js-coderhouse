async function registerUser(event) {
    event.preventDefault(); 
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    try {
        if (localStorage.getItem(username)) {
            throw new Error("Este usuario ya se encuentra registrado.");
        }
        localStorage.setItem(username, password);
        Swal.fire({
            title: '¡Éxito!',
            text: 'Usuario registrado con éxito.',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            document.getElementById("registerForm").reset(); 
        });

    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: error.message || 'Hubo un problema al registrar el usuario.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

async function loginUser(event) {
    event.preventDefault(); 

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    try {
        const storedPassword = localStorage.getItem(username);
        if (storedPassword && storedPassword === password) {
            Swal.fire({
                title: '¡Bienvenido!',
                text: 'Inicio de sesión exitoso. Bienvenido ' + username,
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 2000,
                timerProgressBar: true
            }).then(() => {
                window.location.href = "../pags/productos.html";
            });
        } else {
            throw new Error("VERIFIQUE: Usuario o contraseña incorrectos.");
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: error.message || 'Hubo un problema al iniciar sesión.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}
document.getElementById("registerForm").addEventListener("submit", registerUser);
document.getElementById("loginForm").addEventListener("submit", loginUser);
