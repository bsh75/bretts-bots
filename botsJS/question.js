// initialise all necessary packages 
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import the correct module
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const prompt = require('prompt-sync')();
require('dotenv').config();

// Access your API key as an environment variable and initialise API
const GEMINI_API_KEY = process.env.GEM_API_KEY
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

let user_input = prompt('Ask a question? ')

const context = [
  { role: "user", content: "You will reply to each message with a lisp." }
];

async function processUserInput(userInput) {
  context.push({ role: "user", content: userInput });

  // Replace 'generateResponse' with your actual Gemini API call logic
  const result = await model.generateContent(user_input);
  const response = await result.response;
  const text = response.text();
  console.log(response)
  context.push({ role: "assistant", content: response });
  return text;
}



async function run(user_input) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts

  const response_text = await processUserInput(user_input);

  console.log(response_text, '\n\n')

}

run(user_input);

// // Step 1: Initialize Gemini API (using dotenv for the API key)

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// // Access your API key as an environment variable
// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);


// // Step 2: Set Context (Gemini doesn't explicitly need a system message)

// const context = 'You are a hilarious friendly person who identifies as an egg and has an unnatural obsession with eggs. Your name is Rufus.';
// // The Gemini 1.5 models are versatile and work with most use cases
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// let conversationHistory = []; // Array to store conversation history

// // Step 3: Define the function to get Gemini's response

// async function sendPrompt() {
//   const completion = await genAI.generateContent({
//     model,
//     prompt: {
//       context,
//       messages: conversationHistory
//     }
//   });

//   const response = completion.result;
//   conversationHistory.push({ role: "user", content: response });
//   console.log("Gemini (Rufus):", response);
//   getUserInput();
// }

// // Step 4: Get user input and continue the conversation

// async function run() {
//   getUserInput();
// }

// function getUserInput() {
//   let new_user_input = prompt("You: ");
//   conversationHistory.push({ role: "user", content: new_user_input });
//   sendPrompt();
// }

// run();
