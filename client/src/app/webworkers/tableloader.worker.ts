// /// <reference lib="webworker" />

// addEventListener('message', ({ data }) => {
//   const { users } = data;
//   const paginatedUsers = users;
//   postMessage({ paginatedUsers });
// });


/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const { users } = data;
  postMessage({ remainingUsers: users });
  self.close(); 
});
