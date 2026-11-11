export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }
    if (request.method !== 'POST') {
      return new Response('Gunakan POST', { status: 405 });
    }
    try {
      const body = await request.json();
      // GANTI URL INI KALO PANEL SMM LO BUKAN JAP
      const SMM_API = 'https://jap.com/api/v2'; 
      
      const params = new URLSearchParams({
        key: body.key,
        action: 'add',
        service: body.service,
        link: body.link,
        quantity: body.quantity
      });

      const response = await fetch(SMM_API + '?' + params.toString());
      const data = await response.json();

      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders() }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders() }
      });
    }
  }
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}
