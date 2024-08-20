import { ethers } from 'ethers';
import axios from 'axios';
import qs from 'qs';

// Replace with your values
const PROVIDER_URL = import.meta.env.VITE_PROVIDER_URL; // Replace with your Hedera testnet provider
const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY; // Replace with your private key
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS; // Replace with your deployed contract address
const WORD_LIST_PATH = `./src/smart_contract/dictionary.json`; // Path to your word list JSON file

// ABI for the updated LabelRelationshipContract
const CONTRACT_ABI = [
  {
    inputs: [{ internalType: 'uint[]', name: 'newLabels', type: 'uint[]' }],
    name: 'setLabels',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint[]', name: 'newRelationshipTypes', type: 'uint[]' }],
    name: 'setRelationshipTypes',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLabels',
    outputs: [{ internalType: 'uint[]', name: '', type: 'uint[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getRelationshipTypes',
    outputs: [{ internalType: 'uint[]', name: '', type: 'uint[]' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export async function contract_iteraction() {
  try {
    const SERVER_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}`; // Replace with your actual API endpoint
    // Step 1: Load the word list from JSON file
    const dictionaryResponse = await axios.get(`${SERVER_ENDPOINT}/get_dictionary`);
    const dictionaryRaw = dictionaryResponse.data.data;
    const wordList = JSON.parse(dictionaryRaw);

    // Step 2: Call API to get schema (labels and relationship types)
    const API_PAYLOAD = {
      uri: import.meta.env.VITE_NEO4J_URI,
      userName: import.meta.env.VITE_NEO4J_USERNAME,
      password: import.meta.env.VITE_NEO4J_PASSWORD,
      database: import.meta.env.VITE_NEO4J_DATABASE,
    };

    const apiResponse = await axios.post(`${SERVER_ENDPOINT}/schema` as string, qs.stringify(API_PAYLOAD), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        accept: 'application/json',
      },
    });

    if (apiResponse.data.status === 'Success' && Array.isArray(apiResponse.data.data)) {
      const schema = apiResponse.data.data[0];
      const labels: Array<string> = schema.labels.map((label: string) => label.toLowerCase());
      console.log('Labels:', labels);
      const relationshipTypes: Array<string> = schema.relationshipTypes.map((type: string) => type.toLowerCase());
      console.log('Relationship Types:', relationshipTypes);
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
      // fs.writeFileSync(WORD_LIST_PATH, JSON.stringify(wordList, null, 2));
      const dataSent = JSON.stringify(wordList, null, 2);
      await axios.post(`${SERVER_ENDPOINT}/update_dictionary`, dataSent, {
        headers: {
          'Content-Type': 'text/plain', // or 'application/json' if the server expects JSON
        },
      });

      // Step 3: Convert the labels and relationshipTypes to index lists
      const labelIndexes = labels.map((label) => wordList[label] || 0); // Convert labels to indexes, default to 0 if not found
      const relationshipTypeIndexes = relationshipTypes.map((type) => wordList[type] || 0); // Convert relationship types to indexes, default to 0 if not found

      console.log('Label indexes:', labelIndexes);
      console.log('Relationship type indexes:', relationshipTypeIndexes);

      // Step 4: Connect to Hedera and the LabelRelationship contract
      const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
      const wallet = new ethers.Wallet(PRIVATE_KEY as string, provider);
      const contract = new ethers.Contract(CONTRACT_ADDRESS as string, CONTRACT_ABI, wallet);

      // Step 5: Write label indexes to the contract
      console.log('Writing label indexes to the smart contract...');
      let tx = await contract.setLabels(labelIndexes);
      await tx.wait();
      console.log('Label indexes have been successfully written to the smart contract!');

      // Step 6: Write relationship type indexes to the contract
      console.log('Writing relationship type indexes to the smart contract...');
      tx = await contract.setRelationshipTypes(relationshipTypeIndexes);
      await tx.wait();
      console.log('Relationship type indexes have been successfully written to the smart contract!');

      // Step 7: Read updated labels and relationship types from the contract
      const updatedLabels = await contract.getLabels();
      const updatedRelationshipTypes = await contract.getRelationshipTypes();

      console.log('Updated Labels from the contract:', updatedLabels);
      console.log('Updated Relationship Types from the contract:', updatedRelationshipTypes);
    } else {
      console.error('Failed to retrieve schema:', apiResponse.data);
    }
  } catch (error) {
    console.error('Error occurred:', error);
  }
}
