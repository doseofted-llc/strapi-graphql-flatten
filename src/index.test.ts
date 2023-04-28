import { strapiGraphqlFlatten } from "."
import { test, expect } from "vitest"
import v4StrapiResponse from "../assets/example-response.json"

// NOTE: these are just simple sanity checks for expected results
// until better tests are written, verify logged response itself
console.log(JSON.stringify(strapiGraphqlFlatten(v4StrapiResponse, true), null, "\t"))

test("doesn't error", () => {
  expect(() => strapiGraphqlFlatten(v4StrapiResponse, true)).not.toThrow()
})
