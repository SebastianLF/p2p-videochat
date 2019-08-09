## Login

#### Login application form.

URL: `http://server_address:port/login`

- [] This route is accessible only by unauthenticated users.
    - [] If it's not the case, show message `You're already authenticated` on the page. 
- [] Use JWT token to authenticate.
- [] Prompt username & password.
- [] Username should be unique in db.
- [] Once user is authenticated, redirect to:.
    - [] `/create` if coming from `/` or
    - [] the room address user was requesting. e.g. `/room5`

#### Acessing any room directly by typing its matching url address.

URL: `http://server_address:port/:roomId`

- [] User should be authenticated to access any room.
    - [] If it's not the case, redirect route to `/login`
- [] Check if the room exists in db.
    - [] If not the case, redirect to /`create` then:
    - [] Show message `Room not found, would you like to create one?`
        on `/create` page.