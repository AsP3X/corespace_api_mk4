db.createUser({
  user: "corespace",
  pwd: "masterpassword",
  roles: [
      {
          role: "readWrite",
          db: "corespace"
      }
  ]
});