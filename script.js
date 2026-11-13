
async function sendMessage(text) {
  const question = text.trim();

  if (!question || busy) return;

  showChat();
  addMessage(question, "user");

  promptInput.value = "";
  promptInput.style.height = "auto";

  setBusy(true);

  const typing = document.createElement("div");
  typing.className = "typing";
  typing.textContent = "TeknoAI réfléchit…";
  chat.appendChild(typing);

  scrollToBottom();

  try {
    const response = await fetch(
      "https://TON-SERVEUR.onrender.com/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: question
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Erreur du serveur");
    }

    typing.remove();
    addMessage(data.reply, "assistant");

  } catch (error) {
    typing.remove();
    addMessage(
      "Désolé, la connexion à TeknoAI a échoué. Vérifie le serveur et réessaie.",
      "assistant"
    );
    console.error(error);

  } finally {
    setBusy(false);
    promptInput.focus();
  }
}
