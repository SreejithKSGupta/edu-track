/// <reference lib="webworker" />

addEventListener('message', async ({ data }) => {
  const { offset, limit } = data;
  try {
    const response = await fetch(`http://localhost:5000/students?_start=${offset}&_limit=${limit}`);
    const users = await response.json();
    postMessage({ users });
  } catch (error) {
    postMessage({ users: [] });
  }
});
