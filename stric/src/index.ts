import { Router, macro } from '@stricjs/router';
import { qs, decodeURIComponent, response } from '@stricjs/utils';

// This searchs for the first value of key 'id' in the query
const getID = qs.search('id');

// Mock data
const users = [
  {
    name: 'John',
    age: 25
  }, 
  {
    name: 'Reve',
    age: 15
  }
];

// Create a response function (or you can call it factory)
// This avoids creating a new object on every response
const badReq = response('Bad ID', { status: 400 });

// Demonstrate login
const password = 'admin';

export default new Router()
  // Response 'Hi client!' on every GET request to path '/'
  .get('/', () => new Response('Hi client!'))
  
  // Send the user basic data based on the 'id' query parameter
  .get('/query', req => {
    const id = Number(getID(req));
    // Validate first
    if (isNaN(id) || id < 0 || users.length <= id) return badReq();

    return Response.json(users[id]);
  })
  
  // Return null to tell the fetch handler to return a 404
  // This checks the admin credentials for all sub-routes of '/admin'
  .guard('/admin', req => req.headers.get('Authorization') === password || null)
  
  // Get the body as JSON and add to the users list 
  .post('/admin/user/add', req => {
    // You can return nothing to tell Bun to return 204 No Content
    users.push(req.data);
  }, { body: 'json' })
  
  // Handle 404
  .use(404);

// You can split routes using router groups
