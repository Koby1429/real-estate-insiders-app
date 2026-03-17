export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = url.searchParams.get("url");
    if (!target) return new Response("Missing url param", { status: 400 });

    const attomKey = request.headers.get("apikey") || "";

    const resp = await fetch(decodeURIComponent(target), {
      headers: {
        "apikey": attomKey,
        "Accept": "application/json"
      }
    });

    const body = await resp.text();

    return new Response(body, {
      status: resp.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "apikey, content-type"
      }
    });
  }
};
```
3. Tap **"Deploy"** (or "Save and Deploy") in the top right

Once it deploys, look for your Worker URL — it will be at the top of the page and look like:
```
https://hello-world-abc1.yourname.workers.dev

