const { ethers } = require("ethers");
const axios = require("axios");
const fs = require("fs");
const qs = require("qs");

// Load environment variables from .env file
require('dotenv').config();

const PROVIDER_URL = process.env.PROVIDER_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const WORD_LIST_PATH = process.env.WORD_LIST_PATH;

// ABI for the updated LabelRelationshipContract
const CONTRACT_ABI = [
  {
    "inputs": [{ "internalType": "uint[]", "name": "newLabels", "type": "uint[]" }],
    "name": "setLabels",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint[]", "name": "newRelationshipTypes", "type": "uint[]" }],
    "name": "setRelationshipTypes",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getLabels",
    "outputs": [{ "internalType": "uint[]", "name": "", "type": "uint[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRelationshipTypes",
    "outputs": [{ "internalType": "uint[]", "name": "", "type": "uint[]" }],
    "stateMutability": "view",
    "type": "function"
  }
];

async function main() {
  try {
    // Step 1: Load the word list from JSON file
    const wordList = JSON.parse(fs.readFileSync(WORD_LIST_PATH, 'utf8'));

    // Step 2: Call API to get schema (labels and relationship types)
    const API_ENDPOINT = "http://127.0.0.1:8000/schema"; // Replace with your actual API endpoint
    const API_PAYLOAD = {
      uri: "neo4j+s://1997c869.databases.neo4j.io",
      userName: "neo4j",
      password: "eEAJsvfgeSK2Xapaj2ovJfFGv9FHHW1XtEdApT2H24Q",
      database: "neo4j"
    };

    const apiResponse = await axios.post(API_ENDPOINT, qs.stringify(API_PAYLOAD), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json'
        }
      });

    if (apiResponse.data.status === "Success" && Array.isArray(apiResponse.data.data)) {
    const schema = apiResponse.data.data[0];
    const labels = schema.labels.map(label => label.toLowerCase());
    console.log("Labels:", labels);
    const relationshipTypes = schema.relationshipTypes.map(type => type.toLowerCase());
    console.log("Relationship Types:", relationshipTypes);
      // If the word is not found in the word list, add it to the word list with a new index
    labels.forEach((label, index) => {
    if (!wordList[label]) {
    wordList[label] = Object.keys(wordList).length + 1;
    }
    });
    relationshipTypes.forEach((type, index) => {
        if (!wordList[type]) {
        wordList[type] = Object.keys(wordList).length + 1;
        }
    });
        // Save the updated word list to the JSON file
    fs.writeFileSync(WORD_LIST_PATH, JSON.stringify(wordList, null, 2));

      // Step 3: Convert the labels and relationshipTypes to index lists
      const labelIndexes = labels.map(label => wordList[label] || 0); // Convert labels to indexes, default to 0 if not found
      const relationshipTypeIndexes = relationshipTypes.map(type => wordList[type] || 0); // Convert relationship types to indexes, default to 0 if not found
      
      console.log("Label indexes:", labelIndexes);
      console.log("Relationship type indexes:", relationshipTypeIndexes);

      // Step 4: Connect to Hedera and the LabelRelationship contract
      const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
      const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

      // Step 5: Write label indexes to the contract
      console.log("Writing label indexes to the smart contract...");
      let tx = await contract.setLabels(labelIndexes);
      await tx.wait();
      console.log("Label indexes have been successfully written to the smart contract!");

      // Step 6: Write relationship type indexes to the contract
      console.log("Writing relationship type indexes to the smart contract...");
      tx = await contract.setRelationshipTypes(relationshipTypeIndexes);
      await tx.wait();
      console.log("Relationship type indexes have been successfully written to the smart contract!");

      // Step 7: Read updated labels and relationship types from the contract
      const updatedLabels = await contract.getLabels();
      const updatedRelationshipTypes = await contract.getRelationshipTypes();

      console.log("Updated Labels from the contract:", updatedLabels);
      console.log("Updated Relationship Types from the contract:", updatedRelationshipTypes);
    } else {
      console.error("Failed to retrieve schema:", apiResponse.data);
    }
} catch (error) {
  console.error("Error occurred:", error);
}
}

main().catch(console.error);