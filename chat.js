const chatBox = document.getElementById("chatBox");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// ADD MESSAGE FUNCTION
function addMessage(text, type) {
  const message = document.createElement("div");
  message.classList.add("message", type);
 message.innerHTML = text
  .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
  .replace(/\n/g, "<br>");

  chatBox.appendChild(message);
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