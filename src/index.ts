// Main entry point for the application
import { UserService } from "./services/user-service";
import { DataProcessor } from "./utils/data-processor";

// Unused imports - will be flagged
import { Logger } from "./utils/logger";
import * as fs from "fs";

// Declare a variable but never use it - will be flagged
const API_KEY = "secret-key-value-should-not-be-hardcoded";

// Mixed quote styles - will be flagged
const config = {
  host: "localhost",
  port: 3000,
  debug: true,
};

// Missing semicolon - will be flagged
let initialized = false;

// Type any - will be flagged
function processInput(data: any) {
  console.log("Processing data:", data);
  return data;
}

// Async function with no await - will be flagged
async function fetchUsers() {
  const userService = new UserService();
  return userService.getAll();
}

// Security issue - eval is dangerous
function evaluateExpression(expr: string) {
  return eval(expr);
}

// Main function with multiple issues
function main() {
  console.log("Application starting...");

  // Potential null reference
  const users = null;
  console.log(users.length);

  // Unreachable code
  return;
  console.log("This will never execute");
}

main();
