export const sendHit = (hit) => fetch('/api/game/hits', {
  method: 'POST',
  body: JSON.stringify(hit),
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

export const getUserHits = (limit, offset) => {
  const searchParams = new URLSearchParams();
  if (limit) {
    searchParams.set('limit', limit.toString());
    searchParams.set('offset', offset ? offset.toString() : 0);
  }
  return fetch(`/api/game/hits?${searchParams.toString()}`, {
    method: 'GET',
  });
};
