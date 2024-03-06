function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var message = messageInput.value;
    if (message.trim() !== '') {
        var chatBox = document.getElementById('chat-box');
        var newMessage = document.createElement('div');
        newMessage.className = 'message';
        newMessage.innerText = message;
        chatBox.appendChild(newMessage);
        messageInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}
