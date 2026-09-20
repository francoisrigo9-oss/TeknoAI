```javascript
const input = document.getElementById("messageInput");
const chatArea = document.getElementById("chatArea");
const welcome = document.getElementById("welcome");


function handleEnter(event) {

    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}


function sendMessage() {

    const message = input.value.trim();

    if (!message) {
        return;
    }

    if (welcome) {
        welcome.style.display = "none";
    }

    addMessage(message, "user");

    input.value = "";

    showTyping();

    setTimeout(() => {

        removeTyping();

        /*
         * Pour le moment, cette réponse est une simulation.
         *
         * Plus tard, cette partie sera remplacée par
         * l'appel à ton véritable moteur IA.
         */

        const response = generateDemoResponse(message);

        addMessage(response, "ai");

    }, 900);
}


function addMessage(text, type) {

    const message = document.createElement("div");

    message.className = "message " + type;

    message.innerHTML = `
        <div class="message-content">${escapeHTML(text)}</div>
    `;

    chatArea.appendChild(message);

    chatArea.scrollTop = chatArea.scrollHeight;
}


function showTyping() {

    const typing = document.createElement("div");

    typing.className = "message ai";
    typing.id = "typing";

    typing.innerHTML = `
        <div class="message-content">
            TeknoAI réfléchit...
        </div>
    `;

    chatArea.appendChild(typing);

    chatArea.scrollTop = chatArea.scrollHeight;
}


function removeTyping() {

    const typing = document.getElementById("typing");

    if (typing) {
        typing.remove();
    }
}


function generateDemoResponse(message) {

    const text = message.toLowerCase();

    if (text.includes("bonjour") ||
        text.includes("salut")) {

        return "Bonjour 👋 Je suis TeknoAI. Comment puis-je vous aider aujourd'hui ?";
    }

    if (text.includes("qui es-tu") ||
        text.includes("qui es tu")) {

        return "Je suis TeknoAI, votre assistant intelligent. Cette première version possède déjà l'interface de conversation. Le véritable moteur IA sera connecté dans la prochaine étape.";
    }

    if (text.includes("site web") ||
        text.includes("html")) {

        return "Je peux vous aider à créer un site web avec HTML, CSS, JavaScript, PHP et MySQL. Décrivez simplement votre projet.";
    }

    if (text.includes("merci")) {

        return "Avec plaisir 😊";
    }

    return "J'ai bien reçu votre message. Pour l'instant, TeknoAI utilise une réponse de démonstration. La prochaine étape consiste à connecter un véritable modèle d'intelligence artificielle.";
}


function useSuggestion(text) {

    input.value = text;

    input.focus();

    sendMessage();
}


function newChat() {

    chatArea.innerHTML = "";

    const newWelcome = document.createElement("div");

    newWelcome.className = "welcome";

    newWelcome.innerHTML = `
        <div class="big-logo">T</div>

        <h1>Nouvelle conversation 👋</h1>

        <h2>Je suis <span>TeknoAI</span></h2>

        <p>
            Que voulez-vous faire aujourd'hui ?
        </p>
    `;

    chatArea.appendChild(newWelcome);

    input.focus();
}


function toggleSidebar() {

    document
        .querySelector(".sidebar")
        .classList.toggle("open");
}


function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}
```
