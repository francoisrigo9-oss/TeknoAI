```javascript
const input = document.getElementById("messageInput");
const chatArea = document.getElementById("chatArea");
const welcome = document.getElementById("welcome");


// ==========================================
// ENVOYER UN MESSAGE
// ==========================================

async function sendMessage() {

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

    try {

        const response = await fetch("chat.php", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                message: message,

                conversation_id: 1

            })

        });

        const data = await response.json();

        removeTyping();

        if (data.success) {

            addMessage(
                data.response,
                "ai"
            );

        } else {

            addMessage(
                "Désolé, une erreur est survenue.",
                "ai"
            );
        }

    } catch (error) {

        removeTyping();

        /*
         * Si le véritable serveur IA n'est pas encore connecté,
         * TeknoAI utilise son mode local.
         */

        const response = localTeknoAI(message);

        addMessage(response, "ai");

        console.error(error);
    }
}


// ==========================================
// BOUTONS DE SUGGESTION
// ==========================================

function useSuggestion(text) {

    if (welcome) {
        welcome.style.display = "none";
    }

    input.value = text;

    input.focus();

    sendMessage();
}


// ==========================================
// INTELLIGENCE LOCALE DE TEKNOAI
// ==========================================

function localTeknoAI(message) {

    const text = message.toLowerCase();


    // --------------------------------------
    // EXPLIQUER L'IA
    // --------------------------------------

    if (
        text.includes("intelligence artificielle") ||
        text.includes("explique-moi l'ia") ||
        text.includes("explique moi l'ia")
    ) {

        return `🧠 QU'EST-CE QUE L'INTELLIGENCE ARTIFICIELLE ?

L'intelligence artificielle, ou IA, est une technologie qui permet à un ordinateur de réaliser des tâches qui nécessitent normalement l'intelligence humaine.

Par exemple :

• comprendre un texte
• répondre à des questions
• reconnaître des images
• traduire des langues
• écrire du code
• analyser des données
• générer des images
• apprendre à partir de données

🤖 Exemple :

Quand tu écris une question à TeknoAI, ton message peut être analysé par un modèle d'intelligence artificielle afin de produire une réponse.

📚 Les domaines importants de l'IA comprennent :

1. Machine Learning
2. Deep Learning
3. Traitement du langage naturel
4. Vision par ordinateur
5. Robotique
6. IA générative

TeknoAI est justement conçu pour devenir ton assistant intelligent pour apprendre, créer, programmer et travailler.`;
    }


    // --------------------------------------
    // CREER UN SYSTEME
    // --------------------------------------

    if (
        text.includes("créer un système") ||
        text.includes("creer un systeme") ||
        text.includes("créer un site") ||
        text.includes("creer un site")
    ) {

        return `💻 CRÉATION D'UN SYSTÈME

Très bien ! Je peux t'aider à construire ton système étape par étape.

Nous pouvons travailler avec :

🌐 HTML
🎨 CSS
⚡ JavaScript
🐘 PHP
🗄️ MySQL
📱 PWA
🔐 Système de connexion
👤 Comptes utilisateurs
💬 Messagerie
📊 Tableau de bord

Exemples de systèmes que tu peux créer :

• GestionClub
• boutique en ligne
• réseau social
• application scolaire
• système de gestion d'entreprise
• portfolio professionnel
• application mobile
• plateforme d'intelligence artificielle

👉 Écris simplement le système que tu veux créer.

Exemple :

"Je veux créer un système de gestion d'un club de football."

Et TeknoAI pourra t'aider à construire les fichiers et la base de données.`;
    }


    // --------------------------------------
    // IDEES DE PROJETS
    // --------------------------------------

    if (
        text.includes("idées de projets") ||
        text.includes("idees de projets") ||
        text.includes("idée de projet") ||
        text.includes("idee de projet")
    ) {

        return `💡 IDÉES DE PROJETS

Voici plusieurs projets que tu peux développer :

1️⃣ TeknoAI
Une plateforme d'intelligence artificielle.

2️⃣ GestionClub
Un système complet de gestion d'un club de football.

3️⃣ TeknoShop
Une boutique en ligne pour vendre des produits.

4️⃣ TeknoSchool
Une plateforme de gestion scolaire.

5️⃣ TeknoSport
Une plateforme consacrée au football et aux statistiques.

6️⃣ TeknoSocial
Un réseau social avec publications, amis, commentaires et messages.

7️⃣ TeknoAcademy
Une plateforme pour apprendre l'informatique.

8️⃣ TeknoPortfolio
Un portfolio professionnel pour présenter tes projets.

9️⃣ TeknoJob
Une plateforme de recherche d'emploi.

🔟 TeknoDrive
Un système de stockage et partage de fichiers.

👉 Si tu choisis un projet, je peux t'aider à construire son architecture, ses pages, sa base de données et son code.`;
    }


    // --------------------------------------
    // APPRENDRE
    // --------------------------------------

    if (
        text.includes("apprendre") ||
        text.includes("cours") ||
        text.includes("apprends")
    ) {

        return `📚 MODE APPRENTISSAGE

Bienvenue dans le mode apprentissage de TeknoAI.

Je peux t'aider à apprendre :

💻 Programmation
🌐 HTML / CSS
⚡ JavaScript
🐘 PHP
🗄️ MySQL
🌐 Réseaux informatiques
📡 Réseaux mobiles
🤖 Intelligence artificielle
🔐 Cybersécurité
📱 Développement mobile

Nous pouvons travailler comme dans un cours :

📖 1. Explication
💡 2. Exemple
⌨️ 3. Pratique
📝 4. Exercice
✅ 5. Correction

Exemple :

"Apprends-moi HTML depuis zéro."

Je commencerai par les bases et nous progresserons étape par étape.`;
    }


    // --------------------------------------
    // SALUTATION
    // --------------------------------------

    if (
        text.includes("bonjour") ||
        text.includes("salut") ||
        text.includes("hello")
    ) {

        return `Bonjour 👋

Je suis TeknoAI.

Je peux t'aider à :

🧠 apprendre
💻 programmer
🌐 créer des sites
💡 trouver des idées
📚 étudier
🔧 construire des systèmes

Que veux-tu faire aujourd'hui ?`;
    }


    // --------------------------------------
    // CODE
    // --------------------------------------

    if (
        text.includes("code") ||
        text.includes("programmation") ||
        text.includes("programmer")
    ) {

        return `💻 PROGRAMMATION

Je peux t'aider à programmer avec :

HTML
CSS
JavaScript
PHP
MySQL

Tu peux me demander par exemple :

"Donne-moi le code d'une page de connexion."

ou

"Crée-moi une base de données pour un club de football."

Je pourrai ensuite construire le système étape par étape.`;
    }


    // --------------------------------------
    // REPONSE GENERALE
    // --------------------------------------

    return `🤖 TeknoAI a bien reçu ton message.

Pour le moment, je suis en mode démonstration.

Tu peux me demander par exemple :

• Explique-moi l'intelligence artificielle
• Crée un système de gestion
• Donne-moi des idées de projets
• Apprends-moi PHP
• Apprends-moi HTML
• Aide-moi à créer une application
• Donne-moi du code

Écris simplement ce que tu veux faire.`;
}


// ==========================================
// AFFICHER UN MESSAGE
// ==========================================

function addMessage(text, type) {

    const message = document.createElement("div");

    message.className = "message " + type;

    message.innerHTML = `
        <div class="message-content">
            ${escapeHTML(text)}
        </div>
    `;

    chatArea.appendChild(message);

    chatArea.scrollTop = chatArea.scrollHeight;
}


// ==========================================
// INDICATEUR "TEKNOAI REFLECHIT"
// ==========================================

function showTyping() {

    const typing = document.createElement("div");

    typing.className = "message ai";

    typing.id = "typing";

    typing.innerHTML = `
        <div class="message-content">
            TeknoAI réfléchit... 🤔
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


// ==========================================
// NOUVELLE CONVERSATION
// ==========================================

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


// ==========================================
// MENU MOBILE
// ==========================================

function toggleSidebar() {

    document
        .querySelector(".sidebar")
        .classList.toggle("open");
}


// ==========================================
// TOUCHE ENTREE
// ==========================================

function handleEnter(event) {

    if (
        event.key === "Enter" &&
        !event.shiftKey
    ) {

        event.preventDefault();

        sendMessage();
    }
}


// ==========================================
// SECURITE HTML
// ==========================================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}
```
