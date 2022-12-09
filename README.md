# PAGES: STRUCTURE

- [x] Home- RECHECKED
- [x] Auth- RECHECKED
- [ ] Posts
- [ ] Profile
- [ ] SpecPost
- [ ] User

# HOME:

- [x] Displays nav bar
- [x] Sign up/Login options in nav if user not logged in
- [x] Logout option in nav if user logged in
- [x] Displays parallax effect hero
- [x] Displays brief article/section CTA login/signup
- [x] CTA will take to Auth route if user not logged in
- [x] CTA will take to Posts if already logged in

# AUTH

- [x] Single form with dynamic URL according to user action
- [x] Email, username and password for sign up
- [x] Username and password for login
- [x] If inputs are invalid, feedback is given:

  LOGIN

  - [x] 200 Login
  - [x] 403 for wrong credentials
  - [x] 404 for not found
  - [x] 422 for invalid credentials
  - [x] 500 server side error

  REGISTER

  - [x] 201 registered
  - [x] 500 server side error
  - [x] 409 email/username already registered
  - [x] 422 invalid credentials

- [x] No duplicates of emails nor usernames
- [x] Encrypt/Decrypt is in place
- [x] Token is generated at login and sign up
- [x] Token is stored in local storage
- [x] If user refreshes the page, token persists and client responds accordingly
- [x] Client matches expiration date of server for the token, preventing certain actions when expired
- [x] Posts page can only be accessed if token is validated
- [x] If token is not valid, user is redirected to Auth again
- [x] If user logs out, token is destroyed and user is redirected to the root/home page
- [ ] test login route
- [ ] test register route

# POSTS: MOCK DATA

- [x] Posts page will display a list of posts
- [x] Each post will have a title, content, username, avatar, upvote count, "more like this", and upvote trigger
- [x] Clicking on the title will render the entire post page
- [x] Clicking on the avatar or username will take to that user's profile
- [x] If it's the logged user's post, it will have the option to delete and edit
- [x] Page will display a Search Form
- [x] Page will display a toggle button for add new post form

# DELETE POST

- [x] MOVE SUBMIT CREATE POST TO POSTCTX

- [x] Posts.jsx : READY TO GO ON THE CLIENT
  - [x] Build Route for delete a post
  - [x] Trigger DELETE post
  - [x] SpecPost if user, trigger DELETE post
  - [x] Profile: trigger DELETE post

# UPDATE AVATAR

- [x] Build route to update profile picture
- [x] Build Form/Component to send put call
- [x] Reset token

# UPVOTE

- [x] Create Route for UPVOTE
- [x] Triggered in PostItem and SpecPost
- [x] Create API call on client and reuse on both components that depend on them

## NEXT

- EDIT

### LITTLE THINGS THAT MATTER:
