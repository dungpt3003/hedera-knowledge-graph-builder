# Hedera Subgraph Example Project

The Hedera Subgraph Example Project demonstrates how to create and deploy a subgraph to a local graph node using The Graph Protocol. Based on the [Hedera Hardhat Example Project Repo](https://github.com/hashgraph/hedera-hardhat-example-project). For more information about subgraphs, check out their docs [here](https://thegraph.com/docs). 

> :fire: Check out the step-by-step tutorial [here](https://docs.hedera.com/hedera/more-tutorials/deploy-a-subgraph-using-the-graph).

## Project Files and Folders

- `docker.compose.yaml` - The Docker Compose configuration file required for the project, which include the API endpoint that connects the graph node to a specified network. 

- `subgraph.yaml` - The Graph configuration file to specify the schema and data that The Graph indexes and makes available for querying. 

- `schema.graphql` - The GraphQL schema definition for a GraphQL API, defining the types of data that can be queried, relationship between them, and serves as a contract between the client and server.

- `mappings.ts` - The Typescript file that defines the mapping functions that transform blockchain data into GraphQL entities.

- `/generated` - The folder that contains the auto-generated code based on the configuration and schema files.

## Setup

1. Clone this repo to your local machine:

```shell
git clone https://github.com/hashgraph/hedera-subgraph-example.git
```

2. Once you've cloned the repository, open your IDE terminal and navigate to the root directory of the project:

```shell
cd hedera-subgraph-example
```

3. Once you've cloned the repository, open your IDE terminal and navigate to the root directory of the project. Run the following command to install all the necessary dependencies:

```shell
npm install
```

4. Rename the `subgraph.template.yaml` file to `subgraph.yaml`.

5. Add the deployed contract address to the `address` property and the start block number in the `startBlock` property in the `subgraph.yaml` file.

6. Add the API endpoint URL to the `ethereum` property in the `docker-compose.yaml` file.

7. Start the local graph node:

```shell
npm run graph-node
```

8. Generate the AssemblyScript types:

```shell
graph codegen
```

9. Create the subgraph: 

```shell
npm run create-local
```

10. Deploy the subgraph:

```
npm run deploy-local
```
Once the node finishes indexing, you will be able to access the GraphQL API at: http://localhost:8000/subgraphs/name/Greeter

# Contributing
Contributions are welcome. Please see the
[contributing guide](https://github.com/hashgraph/.github/blob/main/CONTRIBUTING.md)
to see how you can get involved.

# Code of Conduct
This project is governed by the
[Contributor Covenant Code of Conduct](https://github.com/hashgraph/.github/blob/main/CODE_OF_CONDUCT.md). By
participating, you are expected to uphold this code of conduct. Please report unacceptable behavior
to [oss@hedera.com](mailto:oss@hedera.com).

# License
[Apache License 2.0](LICENSE)
