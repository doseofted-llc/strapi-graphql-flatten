import { get } from "lodash"

/**
 * Turn a Strapi V4 GraphQL response into a structure resembling Strapi V3. Specifically:
 * 
 * - The `data.id` of a returned entity joins other entity attributes.
 * - The value of `{response}.data?.[*].attributes` becomes the entity itself.
 * - The `.meta` property moves from entity response to top-level key (ex: `collections.meta` -> `collectionsMeta`)
 *
 * This should make the transition to Strapi v4 less painful.
 * 
 * @param res Given Strapi GraphQL result as parsed JSON
 * @param stripRootData If given GraphQL response directly, remove root `.data` field
 * @returns V3-like Strapi GraphQL response for Strapi V4 response
 */
export function sanifyResponse (res: unknown, stripRootData = false): unknown {
  if ((typeof res === "object" && res !== null) && "data" in res) {
    // remove Strapi GraphQL root .data property in response
    if (stripRootData) { return sanifyResponse(res.data) }
    // otherwise if data is present and null, response itself should be null
    if (res.data === null) { return res.data }
  }
  // iterate over list
  if (Array.isArray(res)) {
    return res.map(r => sanifyResponse(r))
  }
  // scalars can stay the same
  if (typeof res !== "object" || res === null) {
    return res
  }
  // result is possibly a Strapi collection
  const attrsCollection = get(res, ["data", "0", "attributes"])
  if (attrsCollection) {
    return (typeof res === "object" && res !== null)
      && "data" in res
      && Array.isArray(res.data)
      ? res.data.map((data: unknown, index) => (typeof data === "object" && data !== null)
        && "attributes" in data
        && typeof data.attributes === "object"
        ? sanifyResponse({
          ...data.attributes,
          id: "id" in data ? data.id : undefined,
          // NOTE: `____meta` will (at later step) move up a level to become `__meta`
          ____meta: (index === 0 && "meta" in res) ? res.meta : undefined
        })
        : data)
      : res
  }
  // result is possibly a Strapi singleton
  const attrsSingleton = get(res, ["data", "attributes"])
  if (attrsSingleton) {
    return (typeof res === "object" && res !== null)
      && "data" in res
      ? (
        (typeof res.data === "object" && res.data !== null)
          && "attributes" in res.data
          && typeof res.data.attributes === "object"
          ? sanifyResponse({
            ...res.data.attributes,
            id: "id" in res.data ? res.data.id : undefined,
          })
          : res // NOTE: don't return res.data because .attributes doesn't exist
      )
      : res
  }
  const newRes: Record<string, any> = {}
  for (const [key, val] of Object.entries(res)) {
    // Query type was likely given, check values of keys for Strapi result
    const valResult = sanifyResponse(val)
    // also check for `____meta` (from previous step) and assign to new key
    const listHasMeta = get(valResult, ["0", "____meta"])
    newRes[key] = valResult
    if (listHasMeta) {
      newRes[key + 'Meta'] = listHasMeta
    }
    if (Array.isArray(valResult) && valResult?.[0]) {
      delete valResult?.[0]?.____meta
    }
  }
  return newRes
}
