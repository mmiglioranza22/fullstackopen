Notes on redux

- updating nested props (creating a blog from Users view) requires an update from users prop (dispatch to users store)
- there should be a good practice to keep every store in sync, specially for updatin nested props
  - Refetch?
  - Specific action/handler for each atomic update or replacing the top level entity all together (user, blog, etc -> case for voting, adding comments)
- handling errors is also a specific thing to be done
