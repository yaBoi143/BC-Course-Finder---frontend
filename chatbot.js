// HELPERS
function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Set greeting timestamp on load
document.getElementById('greetTime').textContent = now();

// Scroll chat to bottom
function scrollDown() {
  const area = document.getElementById('chatArea');
  area.scrollTop = area.scrollHeight;
}

// RENDER HELPERS

// Adds a user message bubble to the chat
function addUserMsg(text) {
  const list = document.getElementById('msgList');
  list.innerHTML += `
    <div class="msg-row user-row">
      <div class="user-bubble">
        ${text}
        <div class="timestamp">${now()} ✓✓</div>
      </div>
    </div>`;
  scrollDown();
}

// Adds a bot message bubble to the chat
function addBotMsg(html) {
  const list = document.getElementById('msgList');
  list.innerHTML += `
    <div class="msg-row bot-row">
      <div class="bot-avatar">BC<sup>+</sup></div>
      <div class="msg-bubble bot-bubble">
        <div class="bot-name">BC CourseFinder</div>
        ${html}
        <div class="timestamp">${now()}</div>
      </div>
    </div>`;
  scrollDown();
}

// KEYWORD RESPONSES
// Local keyword matching used until the backend API is connected.
// TO CONNECT API: replace getLocalReply() calls in sendMessage() with
// an API fetch (see the commented block at the bottom of this file).

function getLocalReply(text) {
  const t = text.toLowerCase();

  if (t.match(/maths?|science|physical/)) {
    return {
      text: `<p>Great choice! If you did Maths or Physical Science, these IT careers suit you well:</p>`,
      cards: [
        { icon: '💻', title: 'Software Engineer', desc: 'Build systems using algorithms & logic.', link: 'career_software.html' },
        { icon: '📊', title: 'Data Scientist', desc: 'Use stats & ML to find patterns.', link: 'career_data.html' },
        { icon: '🌐', title: 'Network Engineer', desc: 'Design networks using Physics principles.', link: 'career_network.html' },
      ],
      suggestions: ['Tell me more about Data Science', 'What subjects do I need?', 'Show study options']
    };
  }

  if (t.match(/software|develop|code|coding|program/)) {
    return {
      text: `<p>Software Development is one of the most in-demand IT fields. Here's what you need:</p>`,
      cards: [
        { icon: '⌨️', title: 'Programming', desc: 'Python, Java, JavaScript & more.', link: 'skills_software.html' },
        { icon: '🔧', title: 'DevOps & Git', desc: 'Version control & deployment pipelines.', link: 'skills_software.html' },
        { icon: '🌍', title: 'Web Dev', desc: 'HTML, CSS, React, Node.js.', link: 'skills_software.html' },
      ],
      suggestions: ['What is the Diploma pathway?', 'Show career options', 'What salary can I earn?']
    };
  }

  if (t.match(/network|security|cyber|hack/)) {
    return {
      text: `<p>Network & Security is a growing field. Click a card to explore:</p>`,
      cards: [
        { icon: '🌐', title: 'Network Engineer', desc: 'Build & manage computer networks.', link: 'career_network.html' },
        { icon: '🔒', title: 'CyberSecurity', desc: 'Protect systems from threats.', link: 'career_cyber.html' },
        { icon: '☁️', title: 'Cloud Engineer', desc: 'Manage cloud infrastructure.', link: 'career_cloud.html' },
      ],
      suggestions: ['What subjects do I need?', 'Diploma vs Degree?', 'Show all IT fields']
    };
  }

  if (t.match(/data|analytics|scientist/)) {
    return {
      text: `<p>Data Science is one of the highest-paying IT careers in SA. Here's a quick overview:</p>
             <p>📈 Entry salary: R350k – R600k/year<br>📈 Senior salary: R1.2M – R2M+/year<br>📈 Job growth: 35% above average</p>`,
      cards: [
        { icon: '📊', title: 'Data Scientist', desc: 'Patterns, predictions, machine learning.', link: 'career_data.html' },
      ],
      suggestions: ['What degree do I need?', 'What skills are required?', 'Show Belgium Campus pathway']
    };
  }

  if (t.match(/cloud/)) {
    return {
      text: `<p>Cloud Engineering is essential in every modern company. Learn more below:</p>`,
      cards: [
        { icon: '☁️', title: 'Cloud Engineer', desc: 'AWS, Azure, Google Cloud & more.', link: 'career_cloud.html' },
      ],
      suggestions: ['What is the study pathway?', 'What skills do I need?']
    };
  }

  if (t.match(/diploma|degree|differ/)) {
    return {
      text: `<p>Not sure whether to do a Diploma or a Degree? Here's the key difference:</p>
             <p>🎓 <strong>Diploma (NQF 6)</strong> — 2 years, practical, enter the workforce sooner.<br>
             🎓 <strong>Degree (NQF 7)</strong> — 3 years, broader academic base, more senior roles.</p>`,
      cards: [],
      suggestions: ['Show me the full comparison', 'Which one is right for me?']
    };
  }

  if (t.match(/subject|require|school|matric/)) {
    return {
      text: `<p>Most IT programmes at Belgium Campus require:</p>
             <p>✅ Mathematics<br>✅ English<br>⚪ Physical Science (recommended for some streams)<br>⚪ IT (helpful but not always required)</p>`,
      cards: [],
      suggestions: ['Tell me about the Diploma', 'Tell me about the Degree', 'Show career options']
    };
  }

  if (t.match(/salary|earn|pay|money/)) {
    return {
      text: `<p>IT salaries in South Africa vary by role. Here are some ranges:</p>
             <p>💻 Software Developer: R350k – R900k/year<br>
             📊 Data Scientist: R350k – R2M+/year<br>
             🔒 CyberSecurity: R480k – R950k/year<br>
             ☁️ Cloud Engineer: R400k – R1.2M/year<br>
             🌐 Network Engineer: R350k – R750k/year</p>`,
      cards: [],
      suggestions: ['Which career pays the most?', 'What study path do I take?']
    };
  }

  // Default fallback reply
  return {
    text: `<p>No problem! Here are some popular IT career paths you can explore. Click any one to learn more.</p>`,
    cards: [
      { icon: '💻', title: 'Software Development', desc: 'Build applications, websites and systems.', link: 'career_software.html' },
      { icon: '🌐', title: 'Network & Security', desc: 'Work with networks, servers and cybersecurity.', link: 'career_network.html' },
      { icon: '📊', title: 'Data Science & Analytics', desc: 'Use data to solve problems and make decisions.', link: 'career_data.html' },
    ],
    suggestions: ['Tell me more about Software Development', 'What skills do I need?', 'Show me study options']
  };
}

// BUILD CARDS HTML
function buildCards(cards) {
  if (!cards || cards.length === 0) return '';
  const html = cards.map(c => `
    <div class="chat-card">
      <div class="chat-card-icon">${c.icon}</div>
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <a href="${c.link}">Learn more</a>
    </div>`).join('');
  return `<div class="chat-cards">${html}</div>`;
}

// BUILD SUGGESTIONS HTML
function buildSuggestions(suggestions) {
  if (!suggestions || suggestions.length === 0) return '';
  const html = suggestions.map(s =>
    `<button class="suggest-btn" onclick="handleSuggestion('${s}')">${s}</button>`
  ).join('');
  return `<div class="suggestions">${html}</div>`;
}

// SEND MESSAGE
function sendMessage() {
  const input = document.getElementById('userInput');
  const text = input.value.trim();
  if (!text) return;

  input.value = '';
  addUserMsg(text);

  // Show typing indicator briefly
  setTimeout(() => {
    // API HOOK(steps)
    // To connect to your chatbot backend, replace the getLocalReply block
    // below with a fetch() call to your API endpoint, e.g.:
    //
    // fetch('https://your-api-url.com/chat', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ message: text })
    // })
    // .then(r => r.json())
    // .then(data => {
    //   addBotMsg(data.html + buildCards(data.cards) + buildSuggestions(data.suggestions));
    // });
    //
    // Until then, local keyword matching is used:
    const reply = getLocalReply(text);
    addBotMsg(reply.text + buildCards(reply.cards) + buildSuggestions(reply.suggestions));
    // END API HOOK 
  }, 600);
}

// SUGGESTION CHIP CLICK
function handleSuggestion(text) {
  document.getElementById('userInput').value = text;
  sendMessage();
}