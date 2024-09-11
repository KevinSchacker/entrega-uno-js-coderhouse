function validateInput(input, fieldName) {
    if (!input || input.trim() === "") {
        throw new Error(`${fieldName} no puede estar vacío.`);
    }
    if (input.length < 3) {
        throw new Error(`${fieldName} debe tener al menos 3 caracteres.`);
    }
}
async function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    try {
        validateInput(username, "Usuario");
        validateInput(password, "Contraseña");

        // Comprobar si el usuario ya existe en localStorage
        if (localStorage.getItem(username)) {
            throw new Error("Este usuario ya se encuentra registrado.");
        }
        const response = await fakeFetchRegister(username, password);
        if (!response.ok) {
            throw new Error('Error al registrar el usuario en el servidor.');
        }
        // Almacenamiento de datos en localStorage
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
// Función para iniciar sesión
async function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    try {
        // Validación defensiva de los inputs
        validateInput(username, "Usuario");
        validateInput(password, "Contraseña");

        const response = await fakeFetchLogin(username, password);
        if (!response.ok) {
            throw new Error('Error al verificar el usuario en el servidor.');
        }
        const storedPassword = localStorage.getItem(username);
        if (storedPassword && storedPassword === password) {
            Swal.fire({
                title: '¡Bienvenido!',
                text: `Inicio de sesión exitoso. Bienvenido ${username}`,
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
async function fakeFetchRegister(username, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ ok: true });
        }, 1000);
    });
}
async function fakeFetchLogin(username, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ ok: true });
        }, 1000);
    });
}


document.getElementById("registerForm").addEventListener("submit", registerUser);
document.getElementById("loginForm").addEventListener("submit", loginUser);
