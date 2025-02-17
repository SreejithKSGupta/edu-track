/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = `worker response: ${data}`;
  postMessage(response);
});
