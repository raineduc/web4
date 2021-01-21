import { createServer, Response, Model } from 'miragejs';

export const makeServer = ({ environment = 'test' } = {}) => {
  const server = createServer({
    environment,
    models: {
      user: Model,
      hits: Model,
    },
    routes() {
      this.post('/api/auth/login', (schema, request) => {
        const credentials = JSON.parse(request.requestBody);
        const user = schema.users.findBy({ login: credentials.login });
        if (!user) {
          return new Response(400, {}, { error: 'Bad login', field: 'login' });
        }
        if (user.password !== credentials.password) {
          return new Response(400, {}, { error: 'False password', field: 'password' });
        }
        return new Response(201);
      });
      this.post('/api/auth/register', (schema, request) => {
        const credentials = JSON.parse(request.requestBody);
        schema.users.create(credentials);
      });
      this.get('/api/auth/login', (schema, request) => ({ isLoggedIn: schema.users().all().length > 0 }));
      this.post('/api/auth/logout', () => {});
      this.get('/api/game/hits', (schema, request) => ({
        hits: schema.hits.all().slice(+request.queryParams.offset, +request.queryParams.offset + 10).models,
        totalCount: schema.hits.all().length,
      }));
      this.post('/api/game/hits', (schema, request) => {
        const { 'x-coord': x, 'y-coord': y, radius } = JSON.parse(request.requestBody);
        schema.hits.create({
          x, y, radius, hit: true,
        });
        return {
          x, y, radius, hit: true,
        };
      });
    },
  });
  return server;
};
