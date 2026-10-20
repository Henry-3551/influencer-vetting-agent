/** Parse the free buy gateway catalog. No wallet or paid endpoint is involved. */
const record = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

export function listInstagramCapabilities(catalog) {
  if (!record(catalog) || !Array.isArray(catalog.capabilities)) {
    throw new Error('Unexpected gateway catalog: expected a capabilities array. Inspect the live response before proceeding.');
  }
  return catalog.capabilities.filter((c) => record(c) && typeof c.platform === 'string' && c.platform.toLowerCase() === 'instagram');
}

export function summarizeInstagramCapabilities(catalog) {
  return listInstagramCapabilities(catalog).map((c) => ({
    id: typeof c.id === 'string' ? c.id : '(missing id)',
    name: typeof c.name === 'string' ? c.name : null,
    available: c.available === true,
    description: typeof c.description === 'string' ? c.description : null,
    method: typeof c.method === 'string' ? c.method : null,
    url: typeof c.url === 'string' ? c.url : null,
    pricingModel: typeof c.pricingModel === 'string' ? c.pricingModel : null,
    price: c.price ?? null,
    priceOptions: c.priceOptions ?? null,
    inputFields: record(c.inputSchema?.properties) ? Object.keys(c.inputSchema.properties) : [],
    requiredFields: Array.isArray(c.inputSchema?.required) ? c.inputSchema.required : [],
  }));
}

export function detailForCapability(catalog, id) {
  const c = listInstagramCapabilities(catalog).find((item) => item.id === id);
  if (!c) throw new Error('No matching Instagram capability ID in the live catalog.');
  return {
    id: c.id,
    name: c.name ?? null,
    available: c.available === true,
    description: c.description ?? null,
    method: c.method ?? null,
    url: c.url ?? null,
    pricingModel: c.pricingModel ?? null,
    price: c.price ?? null,
    priceOptions: c.priceOptions ?? null,
    maxResults: c.maxResults ?? null,
    inputSchema: c.inputSchema ?? null,
  };
}
