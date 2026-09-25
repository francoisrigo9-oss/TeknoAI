/* =====================================================
   TEKNOAI - JAVASCRIPT PRINCIPAL
   ===================================================== */


/* ================= ELEMENTS ================= */

const sections = document.querySelectorAll(".section");

const navButtons = document.querySelectorAll(".nav-button");

const menuButton = document.getElementById("menuButton");

const navigation = document.querySelector(".navigation");

const startButton = document.getElementById("startButton");

const aboutButton = document.getElementById("aboutButton");

const featureCards = document.querySelectorAll(".feature-card");

const learningCards = document.querySelectorAll(".learning-card");

const projectButtons = document.querySelectorAll(".project-button");

const searchButton = document.getElementById("searchButton");

const searchInput = document.getElementById("searchInput");

const searchResults = document.getElementById("searchResults");


/* ================= MODAL ================= */

const modal = document.getElementById("modal");

const closeModal = document.getElementById("closeModal");

const modalIcon = document.getElementById("modalIcon");

const modalTitle = document.getElementById("modalTitle");

const modalText = document.getElementById("modalText");

const modalAction = document.getElementById("modalAction");


/* ================= DONNEES ================= */

const searchData = [

    {
        title: "HTML",
        description: "Langage utilisé pour créer la structure d'une page web.",
        section: "apprendre"
    },

    {
        title: "CSS",
        description: "Technologie utilisée pour créer le design d'un site web.",
        section: "apprendre"
    },

    {
        title: "JavaScript",
        description: "Langage permettant de rendre les pages web interactives.",
        section: "apprendre"
    },

    {
        title: "PHP",
        description: "Langage serveur permettant de créer des applications web dynamiques.",
        section: "apprendre"
    },

    {
        title: "MySQL",
        description: "Système de gestion de bases de données relationnelles.",
        section: "apprendre"
    },

    {
        title: "Intelligence artificielle",
        description: "Domaine informatique permettant à des systèmes d'analyser des données et de produire des résultats.",
        section: "ia"
    }

];


/* ================= NAVIGATION ================= */

function showSection(sectionId) {

    sections.forEach(function(section) {

        section.classList.remove("active-section");

    });


    const selectedSection = document.getElementById(sectionId);

    if (selectedSection) {

        selectedSection.classList.add("active-section");

    }


    navButtons.forEach(function(button) {

        button.classList.remove("active");

        if (button.dataset.section === sectionId) {

            button.classList.add("active");

        }

    });


    navigation.classList.remove("show");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ================= NAVIGATION BUTTONS ================= */

navButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const sectionId = button.dataset.section;

        showSection(sectionId);

    });

});


/* ================= MENU MOBILE ================= */

menuButton.addEventListener("click", function() {

    navigation.classList.toggle("show");

});


/* ================= COMMENCER ================= */

startButton.addEventListener("click", function() {

    showSection("apprendre");

});


/* ================= DECOUVRIR ================= */

aboutButton.addEventListener("click", function() {

    openModal(
        "🤖",
        "Bienvenue sur TeknoAI",
        "TeknoAI est ton espace pour apprendre l'informatique, développer des projets et découvrir l'intelligence artificielle."
    );

});


/* ================= CARTES PRINCIPALES ================= */

featureCards.forEach(function(card) {

    card.addEventListener("click", function() {

        const target = card.dataset.target;

        showSection(target);

    });

});


/* ================= APPRENTISSAGE ================= */

learningCards.forEach(function(card) {

    card.addEventListener("click", function() {

        const topic = card.dataset.topic;

        const descriptions = {

            "HTML":
                "HTML permet de créer la structure des pages web.",

            "CSS":
                "CSS permet de créer le design, les couleurs et la mise en page.",

            "JavaScript":
                "JavaScript permet d'ajouter des interactions et des fonctionnalités.",

            "PHP":
                "PHP permet de créer des applications web dynamiques côté serveur.",

            "MySQL":
                "MySQL permet de stocker et gérer les données d'une application.",

            "IA":
                "L'intelligence artificielle permet de créer des systèmes capables d'analyser des données et de produire des résultats."

        };


        openModal(
            "📚",
            topic,
            descriptions[topic]
        );

    });

});


/* ================= PROJETS ================= */

projectButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        openModal(
            "🚀",
            "Nouveau projet",
            "Décris ton idée. TeknoAI pourra ensuite t'aider à organiser ton projet étape par étape."
        );

    });

});


/* ================= MODAL ================= */

function openModal(icon, title, text) {

    modalIcon.textContent = icon;

    modalTitle.textContent = title;

    modalText.textContent = text;

    modal.classList.add("show");

}


function closeModalWindow() {

    modal.classList.remove("show");

}


closeModal.addEventListener("click", closeModalWindow);


modal.addEventListener("click", function(event) {

    if (event.target === modal) {

        closeModalWindow();

    }

});


modalAction.addEventListener("click", function() {

    closeModalWindow();

});


/* ================= RECHERCHE ================= */

function performSearch() {

    const query = searchInput.value.trim().toLowerCase();


    if (query === "") {

        searchResults.innerHTML = `
            <div class="empty-result">
                <span>🔍</span>
                <p>Écris quelque chose pour commencer.</p>
            </div>
        `;

        return;
    }


    const results = searchData.filter(function(item) {

        return (
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        );

    });


    if (results.length === 0) {

        searchResults.innerHTML = `
            <div class="empty-result">
                <span>😕</span>
                <p>Aucun résultat trouvé pour "${query}".</p>
            </div>
        `;

        return;
    }


    searchResults.innerHTML = "";


    results.forEach(function(item) {

        const result = document.createElement("div");

        result.className = "feature-card";

        result.innerHTML = `
            <div class="card-icon">🔎</div>

            <h3>${item.title}</h3>

            <p>${item.description}</p>

            <button class="card-button">
                Ouvrir →
            </button>
        `;


        result.addEventListener("click", function() {

            showSection(item.section);

        });


        searchResults.appendChild(result);

    });

}


searchButton.addEventListener("click", performSearch);


searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        performSearch();

    }

});


/* ================= RACCOURCI ESC ================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeModalWindow();

        navigation.classList.remove("show");

    }

});


/* ================= MESSAGE CONSOLE ================= */

console.log("TeknoAI démarré avec succès.");
