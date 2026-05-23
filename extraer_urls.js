const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://yblxilcrmzcnbdpowwpi.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibHhpbGNybXpjbmJkcG93d3BpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTQ4NzIxOSwiZXhwIjoyMDk1MDYzMjE5fQ.BgJJ5MWIu682K-w6YUq5VJTncshkZqvSrlxUKaPkqVI';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function extraerURLs() {
  const { data, error } = await supabase
    .from('imagenes')
    .select('categoria, subcategoria, numero_suite, piso, url, nombre_archivo')
    .order('numero_suite', { ascending: true })
    .order('nombre_archivo', { ascending: true });

  if (error) { console.error(error); return; }

  const agrupadas = {};
  for (const img of data) {
    const key = img.subcategoria || img.categoria;
    if (!agrupadas[key]) agrupadas[key] = [];
    agrupadas[key].push(img.url);
  }

  console.log(JSON.stringify(agrupadas, null, 2));
}

extraerURLs();
