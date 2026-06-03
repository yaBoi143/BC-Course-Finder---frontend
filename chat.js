const chatBox = document.getElementById("msgList");
const input = document.getElementById("userInput");
const sendBtn = document.querySelector(".send-btn");

// ADD MESSAGE FUNCTION
function addMessage(text, type) {
  const row = document.createElement("div");
  row.classList.add("msg-row", type === "user" ? "user-row" : "bot-row");

  const bubble = document.createElement("div");
  bubble.classList.add(type === "user" ? "user-bubble" : "bot-bubble");

  bubble.innerHTML = text
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/\n/g, "<br>");

  if (type === "bot") {
    const avatar = document.createElement("div");
    avatar.classList.add("bot-avatar");
    avatar.innerHTML = "BC<sup>+</sup>";
    row.appendChild(avatar);
  }

  row.appendChild(bubble);
  chatBox.appendChild(row);

  chatBox.scrollTop = chatBox.scrollHeight;
}


     

async function getGeminiResponse(userText) {
  try {
    const response = await fetch("https://bc-course-finder-backend.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: userText
      })
    });

    const data = await response.json();
    return data.reply;

  } catch (error) {
    console.error("FETCH ERROR:", error);
    return "⚠️ Error connecting to server.";
  }
}

// HANDLE FIRST MESSAGE FROM LANDING PAGE
const savedMessage = localStorage.getItem("userMessage");

if (savedMessage) {
  addMessage(savedMessage, "user");

  addMessage("🤖 Thinking...", "bot");

  getGeminiResponse(savedMessage).then(reply => {
    chatBox.lastChild.remove(); // remove thinking
    addMessage(reply, "bot");
  }).catch(error => {
    chatBox.lastChild.textContent = `❌ Error: ${error.message}`;
  });

  localStorage.removeItem("userMessage");
}

//SEND NEW MESSAGE
sendBtn.addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  addMessage("🤖 Thinking...", "bot");

  try {
    const reply = await getGeminiResponse(text);
    chatBox.lastChild.remove();
    addMessage(reply, "bot");
  } catch (error) {
    chatBox.lastChild.textContent = `❌ ${error.message}`;
  }
});

// ENTER KEY
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});