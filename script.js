let currentMode = "chat";

const modes = {

    chat: {
        title: "Discussion avec TeknoAI",
        description: "Pose-moi une question.",
        suggestions: [
            "Présente-toi",
            "Que peux-tu faire ?",
            "Aide-moi à créer un projet"
        ]
    },

    ai: {
        title: "Explique-moi l'IA",
        description: "Apprends l'intelligence artificielle avec TeknoAI.",
        suggestions: [
            "Qu'est-ce que l'intelligence artificielle ?",
            "Explique-moi le machine learning",
            "Quelle est la différence entre IA et robot ?"
        ]
    },

    system: {
        title: "Créer un système",
        description: "Décris le système ou l'application que tu veux construire.",
        suggestions: [
            "Créer un site de gestion d'un club",
            "Créer une boutique en ligne",
            "Créer une application mobile"
        ]
    },

    ideas: {
        title: "Idées de projets",
        description: "Trouve de nouveaux projets à développer.",
        suggestions: [
            "Donne-moi 10 idées de projets web",
            "Donne-moi une idée d'application",
            "Quel projet puis-je créer avec PHP ?"
        ]
    },

    learn: {
        title: "Apprendre",
        description: "Choisis une matière et commence ton apprentissage.",
        suggestions: [
            "Apprends-moi HTML",
            "Apprends-moi PHP",
            "Explique-moi les réseaux informatiques"
        ]
    },

    code: {
        title: "Programmer",
        description: "Écris ou corrige ton code avec TeknoAI.",
        suggestions: [
            "Crée une page HTML",
            "Explique-moi JavaScript",
            "Corrige mon code PHP"
        ]
    },

    search: {
        title: "Recherche",
        description: "Pose une question pour préparer une recherche.",
        suggestions: [
            "Fais une recherche sur l'intelligence artificielle",
            "Explique-moi la fibre optique",
            "Quels sont les langages web ?"
        ]
    }

};


document.addEventListener("DOMContentLoaded", () => {

    setupTextarea();

    showSuggestions();

});


function openMode(mode, clickedButton = null) {

    currentMode = mode;

    document.getElementById("home").classList.add("hidden");

    document
        .getElementById("chatSection")
        .classList.remove("hidden");

    const data = modes[mode];

    document.getElementById("modeTitle").textContent = data.title;

    document.getElementById("modeDescription").textContent =
        data.description;

    document.querySelectorAll(".menu").forEach(button => {
        button.classList.remove("active");
    });

    if (clickedButton) {
        clickedButton.classList.add("active");
    }

    showSuggestions();

}


function showSuggestions() {

    const container =
        document.getElementById("suggestions");

    container.innerHTML = "";

    const list = modes[currentMode].suggestions;

    list.forEach(text => {

        const button = document.createElement("button");

        button.className = "suggestion";

        button.textContent = text;

        button.onclick = () => {

            document.getElementById("userInput").value = text;

            document.getElementById("userInput").focus();

        };

        container.appendChild(button);

    });

}


function addMessage(text, type) {

    const messages =
        document.getElementById("messages");

    const message =
        document.createElement("div");

    message.className =
        "message " + type;

    const avatar =
        type === "assistant" ? "T" : "👤";

    const name =
        type === "assistant" ? "TeknoAI" : "Vous";

    message.innerHTML = `
        <div class="avatar">${avatar}</div>

        <div class="bubble">

            <strong>${name}</strong>

            <p>${escapeHTML(text)}</p>

        </div>
    `;

    messages.appendChild(message);

    messages.scrollTop =
        messages.scrollHeight;

}


async function sendMessage() {

    const input =
        document.getElementById("userInput");

    const text =
        input.value.trim();

    if (!text) return;

    addMessage(text, "user");

    input.value = "";

    input.style.height = "auto";

    const button =
        document.getElementById("sendBtn");

    button.disabled = true;

    addMessage("TeknoAI réfléchit...", "assistant");

    const loadingMessage =
        document.querySelector(
            "#messages .message:last-child"
        );

    try {

        const response =
            await fetch("api.php", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    message: text,

                    mode: currentMode

                })

            });


        const data =
            await response.json();


        loadingMessage.remove();


        if (data.success) {

            addMessage(
                data.reply,
                "assistant"
            );

        } else {

            addMessage(
                data.error ||
                "Une erreur est survenue.",
                "assistant"
            );

        }

    } catch (error) {

        loadingMessage.remove();

        addMessage(
            "TeknoAI n'arrive pas à contacter le serveur. Vérifie que PHP fonctionne.",
            "assistant"
        );

        console.error(error);

    }

    button.disabled = false;

}


function handleEnter(event) {

    if (
        event.key === "Enter" &&
        !event.shiftKey
    ) {

        event.preventDefault();

        sendMessage();

    }

}


function setupTextarea() {

    const textarea =
        document.getElementById("userInput");

    textarea.addEventListener("input", () => {

        textarea.style.height = "auto";

        textarea.style.height =
            Math.min(
                textarea.scrollHeight,
                150
            ) + "px";

    });

}


function newChat() {

    document.getElementById("messages").innerHTML = `

        <div class="message assistant">

            <div class="avatar">
                T
            </div>

            <div class="bubble">

                <strong>TeknoAI</strong>

                <p>
                    Nouvelle discussion créée.
                    Que veux-tu faire ?
                </p>

            </div>

        </div>
    `;

}


function showAbout() {

    document
        .getElementById("aboutModal")
        .classList.remove("hidden");

}


function closeAbout() {

    document
        .getElementById("aboutModal")
        .classList.add("hidden");

}


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}
