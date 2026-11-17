exports.handler = async () => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store"
    },
    body: JSON.stringify({
      supabaseUrl: process.env.SUPABASE_URL || null,
      supabaseKey: process.env.SUPABASE_ANON_KEY || null
    })
  };
};
