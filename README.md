# Strapi GraphQL Flatten

[![npm](https://img.shields.io/npm/v/@doseofted/strapi-graphql-flatten)](https://www.npmjs.com/package/@doseofted/strapi-graphql-flatten)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@doseofted/strapi-graphql-flatten/latest)](https://bundlephobia.com/package/@doseofted/strapi-graphql-flatten@latest)

Turn a Strapi V4 GraphQL response into a simpler structure resembling Strapi V3.

[See discussion](https://forum.strapi.io/t/discussion-regarding-the-complex-response-structure-for-rest-graphql-developer-experience/13400)

## Usage Notes

```typescript
const simplifiedResponse = strapiGraphqlFlatten(myStrapiV4Response, true)
```

Some issues that are not resolved:

- Tests have not been written for this tool.
- If given a type `T` for a response (i.e. `strapiGraphqlFlatten<T>`), transformations are not reflected in TypeScript.

## Development

Develop the project like so:

- `corepack enable`
- `pnpm install`
- `pnpm dev`

Test the project with `pnpm test` (or `pnpm testing` to watch/rerun tests).
