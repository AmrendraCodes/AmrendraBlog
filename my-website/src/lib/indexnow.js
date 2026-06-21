export async function notifyIndexNow(url) {
  if (!url || typeof url !== 'string') return;

  try {
    const response = await fetch('/api/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      console.error('IndexNow notification failed', await response.text());
    }
  } catch (error) {
    console.error('IndexNow request error', error);
  }
}
