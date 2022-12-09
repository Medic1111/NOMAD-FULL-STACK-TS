# DOC

App.js:

- useEffect validates token and reroutes to Auth if invalid

- 5 Routes total found in PAGES directory

## HOME

- NESTED COMPONENTS:
  - HERO

The hero component holds two click listeners: To set Show Login or Show Register forms.

They also redirect to POSTS if user that is logged in attempts to tap into that route

Finally, if the user is Auth, its redirected to posts

## AUTH

- Conditionally renders the LOGIN component or REGISTER component

- Both components are just regular forms with a submit residing in authCtx

- Submit stores in localStorage and sets CURRENTUSER state

## USER

- The user component does not nest any other components

- It is a dynamic component used for PROFILE of current user as well as any other user's profile

- Simple conditional checks if CRUD operations are allowed in case the user in question is the currentUser

- Takes place by reading the URL USERNAME and fetching that user in a userEffect with a CBF in userCtx (fetchUser)

- User in question is addressed as userProfile

## SPEC POST

- The spec post component does not nest any other components

- It takes its data from an API call that set the specPost to be rendered: found in postsCtx

## POST

- NESTED COMPONENTS:

  - SearchForm
  - NewPostForm (conditionally)
  - Post Item

- useEffect is responsible for validating token and fetching All Posts.

- All posts are being stored in a state called DisplayPosts
