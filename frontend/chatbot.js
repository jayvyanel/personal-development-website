class Chatbot {
  constructor() {
    this.chatWindow = document.getElementById('chatbot-window');
    this.chatBody = document.getElementById('chatbot-body');
    this.quickReplies = document.getElementById('quick-replies');
    this.chatInput = document.getElementById('chat-input');
    this.sendBtn = document.getElementById('send-message');
    this.isOpen = false;
    this.init();
  }

  init() {
    this.sendBtn.addEventListener('click', () => this.sendMessage());
    this.chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });

    this.addMessage("I can help you with course information, enrollment, technical support, and more. What would you like to know?", 'bot');
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    this.chatWindow.style.display = this.isOpen ? 'flex' : 'none';
    if (this.isOpen) {
      this.chatBody.scrollTop = this.chatBody.scrollHeight;
    }
  }

  addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    messageDiv.innerHTML = `<div class="message-content"><p>${text}</p></div>`;
    this.chatBody.appendChild(messageDiv);
    this.chatBody.scrollTop = this.chatBody.scrollHeight;
  }

  sendMessage() {
    const message = this.chatInput.value.trim();
    if (message) {
      this.addMessage(message, 'user');
      this.processMessage(message);
      this.chatInput.value = '';
    }
  }

  processMessage(message) {
    const responses = {
      "hello": "Hello there! How can I assist you today?",
      "hi": "Hi! What would you like to know about our courses?",
      "courses": "We offer courses in leadership, communication, time management, and more. <a href='courses.html'>Browse all courses</a>.",
      "pricing": "We have free courses and premium plans starting at $20/month. <a href='choose-plan.html'>See pricing</a>.",
      "contact": "You can reach us at support@academy.com or through our <a href='contact.html'>contact page</a>.",
      "thanks": "You're welcome! Is there anything else I can help with?",
      "bye": "Goodbye! Feel free to come back if you have more questions."
    };

    let response = "I can help you with course information, enrollment, and support. Could you be more specific?";
    message = message.toLowerCase();

    for (const [key, value] of Object.entries(responses)) {
      if (message.includes(key)) {
        response = value;
        break;
      }
    }

    setTimeout(() => {
      this.addMessage(response, 'bot');
      if (message.includes("course") || message.includes("learn")) {
        setTimeout(() => this.suggestCourseOptions(), 500);
      }
    }, 800);
  }

  suggestCourseOptions() {
    this.addMessage("Here are some quick options:", 'bot');

    const suggestions = [
      "Show me leadership courses",
      "What communication courses do you offer?",
      "I need help with time management"
    ];

    this.quickReplies.innerHTML = ''; // Clear old buttons
    suggestions.forEach(text => {
      const button = document.createElement('button');
      button.className = 'quick-reply';
      button.textContent = text;
      button.addEventListener('click', () => {
        this.addMessage(text, 'user');
        this.processMessage(text);
      });
      this.quickReplies.appendChild(button);
    });
  }
}
