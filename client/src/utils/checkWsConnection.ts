function handleMessage(this: WebSocket, event: MessageEvent) {
  const { data } = event;

  if (data === 'ping') {
    this.send('pong');
  }
}

export function checkWsConnection() {
  const socket = new WebSocket('ws://localhost:8080');

  socket.addEventListener('open', () => console.log('Connected to ws server'));
  socket.addEventListener('message', handleMessage);
  socket.addEventListener('close', () =>
    console.log('Disconnected from ws server')
  );
  socket.addEventListener('error', console.error);
}
