/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const { users } = data;
  const paginatedUsers = users;
  postMessage({ paginatedUsers });
});
