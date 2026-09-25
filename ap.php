<?php

header("Content-Type: application/json; charset=UTF-8");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");


if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    echo json_encode([
        "success" => false,
        "error" => "Méthode non autorisée."
    ]);

    exit;
}


$input = json_decode(
    file_get_contents("php://input"),
    true
);


$message = trim($input["message"] ?? "");

$mode = trim($input["mode"] ?? "chat");


if ($message === "") {

    echo json_encode([
        "success" => false,
        "error" => "Message vide."
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| CONFIGURATION
|--------------------------------------------------------------------------
|
| Mets ta clé API dans une variable d'environnement.
|
| Exemple serveur :
|
| OPENAI_API_KEY=ta_cle
|
*/

$apiKey = getenv("OPENAI_API_KEY");


if (!$apiKey) {

    /*
    | Mode démonstration.
    | Cela permet de tester TeknoAI avant de connecter
    | une vraie API.
    */

    $reply = demoResponse($message, $mode);

    echo json_encode([
        "success" => true,
        "reply" => $reply
    ], JSON_UNESCAPED_UNICODE);

    exit;
}


/*
|--------------------------------------------------------------------------
| PROMPT
|--------------------------------------------------------------------------
*/

$systemPrompt = "

Tu es TeknoAI, un assistant intelligent francophone.

Tu aides l'utilisateur à :

- apprendre l'informatique
- programmer
- créer des sites web
- créer des applications
- comprendre l'intelligence artificielle
- développer des projets
- analyser des problèmes techniques

Tu dois répondre en français.

Sois clair, pédagogique et pratique.

Si l'utilisateur demande du code,
donne du code complet et explique où le placer.

Mode actuel : $mode

";


/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
*/

$url = "https://api.openai.com/v1/responses";


$payload = [

    "model" => "gpt-5.6-luna",

    "input" => [

        [
            "role" => "system",

            "content" => [
                [
                    "type" => "input_text",
                    "text" => $systemPrompt
                ]
            ]
        ],

        [
            "role" => "user",

            "content" => [
                [
                    "type" => "input_text",
                    "text" => $message
                ]
            ]
        ]

    ]

];


$ch = curl_init($url);


curl_setopt_array($ch, [

    CURLOPT_RETURNTRANSFER => true,

    CURLOPT_POST => true,

    CURLOPT_HTTPHEADER => [

        "Content-Type: application/json",

        "Authorization: Bearer " . $apiKey

    ],

    CURLOPT_POSTFIELDS =>
        json_encode($payload)

]);


$result =
    curl_exec($ch);


if ($result === false) {

    echo json_encode([
        "success" => false,
        "error" => "Erreur de connexion à l'API."
    ]);

    curl_close($ch);

    exit;
}


$httpCode =
    curl_getinfo(
        $ch,
        CURLINFO_HTTP_CODE
    );


curl_close($ch);


$data =
    json_decode(
        $result,
        true
    );


if ($httpCode >= 400) {

    echo json_encode([
        "success" => false,
        "error" =>
            $data["error"]["message"]
            ?? "Erreur API."
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| EXTRACTION REPONSE
|--------------------------------------------------------------------------
*/

$reply = "";


if (
    isset($data["output"])
    && is_array($data["output"])
) {

    foreach ($data["output"] as $item) {

        if (
            isset($item["content"])
            && is_array($item["content"])
        ) {

            foreach ($item["content"] as $content) {

                if (
                    isset($content["text"])
                ) {

                    $reply .=
                        $content["text"];
                }

            }

        }

    }

}


if ($reply === "") {

    $reply =
        "Je n'ai pas reçu de réponse exploitable.";

}


echo json_encode([

    "success" => true,

    "reply" => $reply

], JSON_UNESCAPED_UNICODE);


/*
|--------------------------------------------------------------------------
| MODE DEMONSTRATION
|--------------------------------------------------------------------------
*/

function demoResponse($message, $mode)
{

    switch ($mode) {

        case "ai":

            return
                "🤖 L'intelligence artificielle est "
                . "un ensemble de techniques permettant "
                . "à des machines d'effectuer des tâches "
                . "qui nécessitent normalement certaines "
                . "capacités humaines, comme comprendre "
                . "du texte, reconnaître des images ou "
                . "générer du contenu.\n\n"
                . "Tu peux demander à TeknoAI de t'expliquer "
                . "le machine learning, les réseaux neuronaux "
                . "ou les modèles de langage.";

        case "system":

            return
                "⚙️ Pour créer ton système, commence par "
                . "définir :\n\n"
                . "1. Le nom du projet\n"
                . "2. Les utilisateurs\n"
                . "3. Les fonctionnalités\n"
                . "4. La base de données\n"
                . "5. L'interface\n"
                . "6. Le serveur\n\n"
                . "Décris-moi maintenant le système que tu veux créer.";

        case "ideas":

            return
                "💡 Voici quelques idées :\n\n"
                . "• Gestion de club sportif\n"
                . "• Boutique en ligne\n"
                . "• Application éducative\n"
                . "• Réseau social\n"
                . "• Plateforme de réservation\n"
                . "• Application de gestion scolaire\n\n"
                . "Je peux ensuite transformer une idée en projet réel.";

        case "learn":

            return
                "📚 Nous pouvons apprendre progressivement.\n\n"
                . "Choisis par exemple : HTML, CSS, JavaScript, "
                . "PHP, MySQL, Python, réseaux, cybersécurité "
                . "ou intelligence artificielle.";

        case "code":

            return
                "💻 Mode programmation activé.\n\n"
                . "Envoie-moi ton code ou explique-moi ce que "
                . "tu veux créer. Je pourrai t'aider à construire "
                . "les fichiers étape par étape.";

        case "search":

            return
                "🔎 Mode recherche activé.\n\n"
                . "Donne-moi le sujet que tu souhaites étudier "
                . "et je peux t'aider à organiser la recherche.";

        default:

            return
                "Bonjour 👋 Je suis TeknoAI.\n\n"
                . "Je peux t'aider à apprendre, programmer, "
                . "créer des systèmes et développer tes projets.\n\n"
                . "Ton message : " . $message;
    }

}

?>
