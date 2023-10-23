export async function sendRequest(url, method = 'POST', payload = {},) {
  return fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(res => res.json())
}
