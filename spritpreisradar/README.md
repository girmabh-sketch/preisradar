# Spritpreisradar

## Testing

### Run locally

#### Development version with mock server

Start a local http server which mocks the backend.
* The response data is stored in _test/proxy/db.json_.


    cd frontend
    npm run mock:server

Then run the _Angular CLI Server_ (dev server) which connects against that mock backend.

    npm run start:usemockserver

Navigate to `http://localhost:4200/`.

See [Proxying to a backend server](https://v17.angular.io/guide/build#proxying-to-a-backend-server) for how this is done.

