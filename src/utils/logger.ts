// Logger utility with various issues
export class Logger {
  // Singleton pattern with potential issues
  private static instance: Logger;

  // Private constructor - to enforce singleton pattern
  private constructor() {}

  // Static method to get instance
  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  // Method that doesn't handle errors - will be flagged
  log(message: string, level: string = "info") {
    const timestamp = new Date().toISOString();
    let formattedMessage = "";

    // Switch without default case - will be flagged
    switch (level) {
      case "info":
        formattedMessage = `[INFO] [${timestamp}] ${message}`;
        break;
      case "warn":
        formattedMessage = `[WARN] [${timestamp}] ${message}`;
        break;
      case "error":
        formattedMessage = `[ERROR] [${timestamp}] ${message}`;
        break;
    }

    // Direct console access - will be flagged in some linter configs
    console.log(formattedMessage);

    // This will throw if the file system isn't available
    this.writeToFile(formattedMessage);
  }

  // Private method with potential security issues
  private writeToFile(message: string) {
    // Using synchronous file operations - will be flagged
    const fs = require("fs");
    fs.appendFileSync("app.log", message + "\n");
  }

  // Method with too broad exception handling - will be flagged
  clearLogs() {
    try {
      const fs = require("fs");
      fs.unlinkSync("app.log");
    } catch (error) {
      // Catching all errors without specific handling
      console.error("Failed to clear logs");
    }
  }
}
