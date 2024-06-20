// auto resize the chat input based on the text lines
const messageInput = document.querySelector('#message-input');
if (messageInput) {
  messageInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  })
}

// Set the messageboard to show the latest message first
const messageBoard = document.querySelector('#messageboardContent');
if (messageBoard) messageBoard.scrollTop = messageBoard.scrollHeight;