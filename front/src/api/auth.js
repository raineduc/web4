export const postAuthCredentials = (isRegister, credentials) => fetch(isRegister ? '/api/auth/register' : '/api/auth/login', {
  method: 'POST',
  body: JSON.stringify(credentials),
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

export const checkLoginStatus = () => fetch('/api/auth/login', {
  method: 'GET',
});

export const logout = () => fetch('/api/auth/logout', {
  method: 'POST',
});
