let connectionIdx = 0;
let messageIdx = 0;

function addConnection(connection) {
  connection.connectionId = ++connectionIdx;

  connection.addEventListener('message', function(event) {
    messageIdx++;
    const data = JSON.parse(event.data);
    const logString = document.getElementById('image').src=data.message;
  });

  connection.addEventListener('close', function(event) {
    addMessage('Connection #' + connection.connectionId + ' closed, reason = ' +
        event.reason + ', message = ' + event.message);
  });
};

/* Utils */
function addMessage(content, language) {
  const listItem = document.createElement("li");
  if (language) {
    listItem.lang = language;
  }
  listItem.textContent = content;
  document.querySelector("#message-list").appendChild(listItem);
};

document.addEventListener('DOMContentLoaded', function() {
  if (navigator.presentation.receiver) {
    navigator.presentation.receiver.connectionList.then(list => {
      list.connections.map(connection => addConnection(connection));
      list.addEventListener('connectionavailable', function(event) {
        addConnection(event.connection);
      });
    });
  }
});