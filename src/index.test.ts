import { sanifyResponse } from "."
import { test, expect } from "vitest"
import v4StrapiResponse from "../assets/example-response.json"
import { get } from "lodash"

// NOTE: these are just simple sanity checks for expected results
// until better tests are written, verify logged response itself
console.log(JSON.stringify(sanifyResponse(v4StrapiResponse, true), null, "\t"))

test("doesn't error", () => {
  expect(() => sanifyResponse(v4StrapiResponse, true)).not.toThrow()
})
