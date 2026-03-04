// script.js atualizado

// === LISTA DE USUÁRIOS FUNCIONAIS ===
let users = [
    { name: "Admin", email: "admin@admin.com", password: "admin" },
    { name: "Júlio", email: "julio@quiz.com", password: "12345" }
];

// === ELEMENTOS DO DOM ===
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const forgotForm = document.getElementById("forgotForm");

const loginMessage = document.getElementById("loginMessage");
const registerMessage = document.getElementById("registerMessage");
const forgotMessage = document.getElementById("forgotMessage");

// LINKS DE NAVEGAÇÃO ENTRE FORMULÁRIOS
document.getElementById("toRegister").addEventListener("click", e => {
    e.preventDefault();
    switchForm(registerForm);
});

document.getElementById("toLoginFromRegister").addEventListener("click", e => {
    e.preventDefault();
    switchForm(loginForm);
});

document.getElementById("toForgot").addEventListener("click", e => {
    e.preventDefault();
    switchForm(forgotForm);
});

document.getElementById("toLoginFromForgot").addEventListener("click", e => {
    e.preventDefault();
    switchForm(loginForm);
});

// FUNÇÃO PARA TROCAR FORMULÁRIO ATIVO
function switchForm(formToShow) {
    [loginForm, registerForm, forgotForm].forEach(f => f.classList.remove("active"));
    formToShow.classList.add("active");
    clearMessages();
}

// LIMPAR MENSAGENS
function clearMessages() {
    [loginMessage, registerMessage, forgotMessage].forEach(msg => {
        msg.textContent = "";
        msg.style.opacity = 0;
    });
}

// === LOGIN FUNCIONAL ===
loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        loginMessage.style.color = "#00ff88";
        loginMessage.textContent = `Login efetuado com sucesso! ✅ Bem-vindo(a), ${user.name}`;
        loginMessage.style.opacity = 1;
        loginForm.classList.remove("shake");

        setTimeout(() => {
            window.location.href = "quiz.html"; // redireciona para quiz
        }, 1000);
    } else {
        loginMessage.style.color = "#ff4d4d";
        loginMessage.textContent = "Email ou senha incorretos ❌";
        loginMessage.style.opacity = 1;

        loginForm.classList.remove("shake");
        void loginForm.offsetWidth; // reinicia animação
        loginForm.classList.add("shake");
    }
});

// === CADASTRO FUNCIONAL ===
registerForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("newName").value.trim();
    const email = document.getElementById("newEmail").value.trim();
    const password = document.getElementById("newPassword").value.trim();

    // Valida campos
    if (!name || !email || !password) {
        registerMessage.style.color = "#ff4d4d";
        registerMessage.textContent = "Preencha todos os campos ❌";
        registerMessage.style.opacity = 1;
        return;
    }

    // Verifica se email já existe
    if (users.some(u => u.email === email)) {
        registerMessage.style.color = "#ff4d4d";
        registerMessage.textContent = "Este email já está cadastrado ❌";
        registerMessage.style.opacity = 1;
        return;
    }

    // Adiciona usuário
    users.push({ name, email, password });
    registerMessage.style.color = "#00ff88";
    registerMessage.textContent = `Conta criada com sucesso para ${name} (${email}) ✅`;
    registerMessage.style.opacity = 1;

    // Limpa campos
    document.getElementById("newName").value = "";
    document.getElementById("newEmail").value = "";
    document.getElementById("newPassword").value = "";
});

// === ESQUECI SENHA SIMULADO ===
forgotForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("emailForgot").value.trim();

    if (!email) {
        forgotMessage.style.color = "#ff4d4d";
        forgotMessage.textContent = "Digite seu email ❌";
        forgotMessage.style.opacity = 1;
        return;
    }

    // Verifica se o email existe
    const userExists = users.some(u => u.email === email);

    forgotMessage.style.color = "#00ff88";
    if (userExists) {
        forgotMessage.textContent = `Se ${email} estiver cadastrado, um email de recuperação foi enviado. ✅`;
    } else {
        forgotMessage.textContent = `Se ${email} estiver cadastrado, um email de recuperação foi enviado. ✅`;
    }
    forgotMessage.style.opacity = 1;

    document.getElementById("emailForgot").value = "";
});