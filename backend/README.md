# DeGraph - Hedera Knowledge Graph Builder
## Feature
API Endpoint : This project provides various API endpoint to perform specific tasks.
Data Validation : Utilize FastAPI data validation and serialization feature.
Interactive Documentation : Access Swagger UI and ReDoc for interactive API documentation.

## Getting Started 

Follow these steps to set up and run the project locally:

1. Install Dependency :

   > pip install -t requirements.txt

2. Configuration

   Update the environment variable in `.env` file.

   `OPENAI_API_KEY`: Open AI key to use LLM

   `NEO4J_URI` : Neo4j URL

   `NEO4J_USERNAME` : Neo4J database username

   `NEO4J_PASSWORD` : Neo4j database user password

3. Run backend project using unicorn
Run the server:
   > uvicorn score:app --reload

## Access the API Documentation
Open your browser and navigate to
http://127.0.0.1:8000/docs for Swagger UI or
http://127.0.0.1:8000/redocs for ReDoc.