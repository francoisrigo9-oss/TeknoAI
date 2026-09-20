<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "config.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || empty($data["message"])) {

    echo json_encode([
        "success" => false,
        "error" => "Message vide"
    ]);

    exit;
}

$message = trim($data["message"]);

$conversationId = isset($data["conversation_id"])
    ? intval($data["conversation_id"])
    : 1;


/*
========================================
ENREGISTRER LE MESSAGE UTILISATEUR
========================================
*/

$stmt = $pdo->prepare("
    INSERT INTO messages
    (conversation_id, role, message)
    VALUES (?, 'user', ?)
");

$stmt->execute([
    $conversationId,
    $message
]);


/*
========================================
TEKNOAI
========================================
*/

$text = strtolower($message);

$response = "";


/* IA */

if (
    strpos($text, "explique-moi l'ia") !== false ||
    strpos($text, "explique moi l'ia") !== false ||
    strpos($text, "intelligence artificielle") !== false
) {

    $response = "🧠 INTELLIGENCE ARTIFICIELLE\n\n";

    $response .= "L'intelligence artificielle est une technologie qui permet aux ordinateurs d'effectuer certaines tâches qui nécessitent normalement l'intelligence humaine.\n\n";

    $response .= "Elle peut notamment :\n\n";
    $response .= "• comprendre des textes\n";
    $response .= "• répondre aux questions\n";
    $response .= "• analyser des images\n";
    $response .= "• traduire des langues\n";
    $response .= "• écrire du code\n";
    $response .= "• analyser des données\n";
    $response .= "• générer du contenu\n\n";

    $response .= "TeknoAI est conçu pour devenir ton assistant intelligent pour apprendre, créer, programmer et travailler.";
}


/* CREER UN SYSTEME */

elseif (
    strpos($text, "créer un système") !== false ||
    strpos($text, "creer un systeme") !== false ||
    strpos($text, "créer un site") !== false ||
    strpos($text, "creer un site") !== false
) {

    $response = "💻 CRÉER UN SYSTÈME\n\n";

    $response .= "Je peux t'aider à créer un système complet avec :\n\n";

    $response .= "🌐 HTML\n";
    $response .= "🎨 CSS\n";
    $response .= "⚡ JavaScript\n";
    $response .= "🐘 PHP\n";
    $response .= "🗄️ MySQL\n\n";

    $response .= "Exemples :\n\n";

    $response .= "• GestionClub\n";
    $response .= "• boutique en ligne\n";
    $response .= "• réseau social\n";
    $response .= "• application scolaire\n";
    $response .= "• portfolio\n";
    $response .= "• application mobile\n";
    $response .= "• intelligence artificielle\n\n";

    $response .= "Écris-moi simplement le système que tu veux construire.";
}


/* IDEES */

elseif (
    strpos($text, "idées de projets") !== false ||
    strpos($text, "idees de projets") !== false ||
    strpos($text, "idée de projet") !== false ||
    strpos($text, "idee de projet") !== false
) {

    $response = "💡 IDÉES DE PROJETS\n\n";

    $response .= "Voici quelques projets que tu peux développer :\n\n";

    $response .= "1️⃣ TeknoAI — plateforme d'intelligence artificielle\n\n";
    $response .= "2️⃣ GestionClub — gestion complète d'un club de football\n\n";
    $response .= "3️⃣ TeknoShop — boutique en ligne\n\n";
    $response .= "4️⃣ TeknoSchool — gestion scolaire\n\n";
    $response .= "5️⃣ TeknoSocial — réseau social\n\n";
    $response .= "6️⃣ TeknoAcademy — plateforme d'apprentissage\n\n";
    $response .= "7️⃣ TeknoJob — plateforme d'emploi\n\n";

    $response .= "Choisis un projet et je peux t'aider à construire son code.";
}


/* APPRENDRE */

elseif (
    strpos($text, "apprendre") !== false ||
    strpos($text, "apprends") !== false ||
    strpos($text, "cours") !== false
) {

    $response = "📚 APPRENDRE AVEC TEKNOAI\n\n";

    $response .= "Je peux t'aider à apprendre :\n\n";

    $response .= "💻 Programmation\n";
    $response .= "🌐 HTML / CSS\n";
    $response .= "⚡ JavaScript\n";
    $response .= "🐘 PHP\n";
    $response .= "🗄️ MySQL\n";
    $response .= "🌐 Réseaux informatiques\n";
    $response .= "📡 Réseaux mobiles\n";
    $response .= "🤖 Intelligence artificielle\n";
    $response .= "🔐 Cybersécurité\n\n";

    $response .= "Tu peux écrire par exemple :\n\n";

    $response .= "\"Apprends-moi HTML depuis zéro.\"\n\n";

    $response .= "Et nous commencerons le cours étape par étape.";
}


/* BONJOUR */

elseif (
    strpos($text, "bonjour") !== false ||
    strpos($text, "salut") !== false ||
    strpos($text, "hello") !== false
) {

    $response = "Bonjour 👋\n\n";

    $response .= "Je suis TeknoAI.\n\n";

    $response .= "Je peux t'aider à :\n";
    $response .= "🧠 apprendre\n";
    $response .= "💻 programmer\n";
    $response .= "🌐 créer des sites\n";
    $response .= "💡 trouver des idées\n";
    $response .= "📚 étudier\n";
    $response .= "🔧 construire des systèmes";
}


/* REPONSE GENERALE */

else {

    $response = "🤖 TeknoAI a reçu ton message :\n\n";

    $response .= $message;

    $response .= "\n\nJe suis actuellement dans ma version de démonstration.";

    $response .= "\n\nTu peux essayer :";

    $response .= "\n• Explique-moi l'IA";
    $response .= "\n• Créer un système";
    $response .= "\n• Idées de projets";
    $response .= "\n• Apprendre";
}


/*
========================================
ENREGISTRER LA REPONSE
========================================
*/

$stmt = $pdo->prepare("
    INSERT INTO messages
    (conversation_id, role, message)
    VALUES (?, 'assistant', ?)
");

$stmt->execute([
    $conversationId,
    $response
]);


/*
========================================
ENVOYER LA REPONSE
========================================
*/

echo json_encode([
    "success" => true,
    "response" => $response,
    "conversation_id" => $conversationId
], JSON_UNESCAPED_UNICODE);

?>
