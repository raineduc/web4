export const sendHit = (hit) => fetch('/api/game/sendHit', {
  method: 'POST',
  body: JSON.stringify(hit),
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});
