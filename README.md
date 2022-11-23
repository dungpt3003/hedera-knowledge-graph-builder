# Hedera Example Subgraph

An example repo to get you started with Subgraphs on Hedera. Based on the
example [Hedera Smart Contracts Repo](https://github.com/Daniel-K-Ivanov/hedera-contracts-repo-example)

## Development

1. `npm install`
2. `npm run compile`
3. `npm run graph-node` -> must have docker engine running
4. `npm run create-local`
5. `npm run deploy-local`

Once the node finishes indexing, you will be able to access the GraphQL API
at: http://localhost:8000/subgraphs/name/Greeter