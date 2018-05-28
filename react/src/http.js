const axios         = require('axios');
const MockAdapter   = require('axios-mock-adapter');

// ...

const mock = new MockAdapter(axios);

// ...
// Example of user credentials to match against incoming credentials.
const username = 'me@domain.com';
const password = 'password';

// list of friends to return when the route /api/friends is invoked.
const friends  = ['alice', 'bob'] ;

// the hardcoded JWT access token you created @ jwt.io.
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlbWFpbEBkb21haW4uY29tIiwibmFtZSI6Ik15IG5hbWUifQ.6OGYHJpvF0a_lVr4TfxHnS501eb3Xi4enefpHxqyH1I';

// ...

// /api/auth
mock.onPost('/api/auth').reply(config => {
    const body // object
        = JSON.parse(config.data);

    if (username === body.body.username && password === body.body.password) {
        return [200, token]
    } else {
        return [401, 'Invalid user credentials']
    }
});

mock.onGet('/api/friends').reply(config => {
    const {
        headers // object
    } = config;

    if(headers.Authorization === `Bearer ${token}`) {
        return [200, {friends}]
    } else if (headers.Authorization !== `Bearer ${token}`) {
        return [401, {error: 'Unauthorized token'}]
    } else  if (!headers) {
        return [400, {error: 'No Authorization Header'}]
    }
});

// if a request in not handled in the mocks above, this will return a generic 400 response.
mock.onAny().reply(400, { error: 'Unsupported request' });

// ...

export default axios;