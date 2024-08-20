# DeGraph - Hedera Knowledge Graph Builder

The DeGraph - Hedera Knowledge Graph Builder project aims to create a tool for developers to create, explore and utilize knowledge graphs on Hedera.

This application is built and deployed to Hedera Testnet, and is submitted to the [Hedera Hello Future Hackathon](https://hellofuturehackathon.dev/).

## Introduction
The project has three major components:

- Backend API at [backend/](backend/): Utilize FastAPI to provide various API endpoints for database interaction, graph construction, graph query and other specific tasks.
- User Interface at [frontend/](frontend/): A ReactJS application for knowledge graph visualization and interaction.
- Subgraph at [subgraph/](subgraph/): Subgraph configuration for on-chain knowledge graph deployment and query. 
## Installation
Each component of the application is running separately:
- Backend: Follow the installation guide at [backend/README.md](backend/README.md)
- Frontend: Follow the installation guide at [frontend/README.md](frontend/README.md)
- Subgraph: Follow the installation guide at [subgraph/README.md](frontend/README.md)

## Demo
[![IMAGE ALT TEXT](https://img.youtube.com/vi/7QjEPVPFD6Q/0.jpg)](https://www.youtube.com/watch?v=7QjEPVPFD6Q "DeGraph - Hedera Knowldege Graph Builder - Demo")

## Acknowledgement
The DeGraph project is developed upon the work of:
- Neo4J Labs at [LLM Graph Builder](https://github.com/neo4j-labs/llm-graph-builder)
- Hedera at [Hedera Subgraph Example](https://github.com/hashgraph/hedera-subgraph-example)

## License
[Apache License 2.0](LICENSE)
