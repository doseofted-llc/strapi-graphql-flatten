# Strapi GraphQL Flatten

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
