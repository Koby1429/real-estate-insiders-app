export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'apikey, content-type'
        }
      });
    }
    const url = new URL(request.url);
    const target = url.searchParams.get('url');
    if (!target) {
      return new Response('Missing url param', { status: 400 });
    }
    const attomKey = request.headers.get('apikey') || '';
    const resp = await fetch(decodeURIComponent(target), {
      headers: {
        'apikey': attomKey,
        'Accept': 'application/json'
      }
    });
    const body = await resp.text();
    return new Response(body, {
      status: resp.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'apikey, content-type'
      }
    });
  }
};
