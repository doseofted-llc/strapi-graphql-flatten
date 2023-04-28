# Strapi GraphQL Flatten

Turn a Strapi V4 GraphQL response into a structure resembling Strapi V3.

[See discussion](https://forum.strapi.io/t/discussion-regarding-the-complex-response-structure-for-rest-graphql-developer-experience/13400)

## Usage Notes

Some issues that are not resolved:

- Tests have not been written for this tool.
- Where `.data` is an empty array, the `.data` property is not removed.
