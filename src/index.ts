// Main entry point for the application
import { UserService } from "./services/user-service";
import { DataProcessor } from "./utils/data-processor";
import { Logger } from "./utils/logger";
import { AuthHelper } from "./utils/auth-helper";

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
async function main() {
  const logger = Logger.getInstance();
  logger.log("Application starting...");

  // Using the complex function
  const dataProcessor = new DataProcessor();
  const complexResult = dataProcessor.complexProcessing(150, "A", {
    flag1: true,
    flag2: false,
  });
  logger.log(`Complex processing result: ${complexResult}`);

  // Using the vulnerable username validation
  const userService = new UserService();
  const isValid = userService.validateUsername(
    "user name with spaces that might be long"
  );
  logger.log(`Username validation result: ${isValid}`);

  // Using the XSS vulnerable function (result not used, but call is made)
  const user = await userService.findById(1);
  if (user) {
    const profileHTML = userService.getUserProfileHTML(user as any); // Using 'as any' to suppress type errors temporarily
    logger.log("Generated profile HTML (potentially unsafe)");
  }

  // Using the AuthHelper (demonstrating circular dependency usage)
  const token = AuthHelper.generateToken(1);
  logger.log(`Generated token: ${token}`);
  const canAccess = await new AuthHelper().checkUserPermissions(1, "admin");
  logger.log(`Admin access check: ${canAccess}`);

  // Existing issues remain...
  console.log("Application starting..."); // Duplicate log

  // Potential null reference
  const users: any[] | null = null; // Type changed slightly
  try {
    console.log(users!.length); // Using non-null assertion operator (!)
  } catch (e) {
    logger.log("Caught error accessing users.length", "error");
  }

  // Unreachable code
  return;
  logger.log("This will never execute"); // Using logger
}

main().catch((error) => {
  console.error("Unhandled error in main:", error);
});
