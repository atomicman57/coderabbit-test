// User service with various issues
import { User } from "../models/user";
// Import to create circular dependency
import { AuthHelper } from "../utils/auth-helper";

// Interface with no export - will be flagged
interface UserFilter {
  age?: number;
  active?: boolean;
}

// Class with issues
export class UserService {
  // Private property not used - will be flagged
  private apiUrl: string = "https://api.example.com/users";

  // Missing return type - will be flagged
  // Modified to show improper promise handling
  async getAll(): Promise<User[]> {
    console.log("Fetching all users...");
    // Incorrectly not awaiting the promise resolution
    const promise = new Promise<User[]>((resolve) => {
      // Simulating async operation
      setTimeout(() => {
        resolve([
          { id: 1, name: "John Doe", age: 30, active: true },
          { id: 2, name: "Jane Smith", age: 25, active: false },
        ]);
      }, 50);
    });

    // Performing actions before the promise is resolved
    console.log("Promise created, returning...");
    return promise; // Returning the promise itself, but not awaiting its completion here
  }

  // Function with inconsistent return - will be flagged
  findById(id: number) {
    if (id <= 0) {
      return null;
    }

    if (id > 100) {
      return;
    }

    return { id, name: "User " + id };
  }

  // Function with magic numbers - will be flagged
  calculateUserScore(user: User) {
    let score = 0;

    if (user.age > 18) {
      score += 10;
    }

    if (user.active == true) {
      // Comparison could be simplified
      score = score + 5; // Could use += operator
    }

    return score;
  }

  // Method with too many parameters - will be flagged
  updateUser(
    id: number,
    name: string,
    email: string,
    age: number,
    active: boolean,
    role: string,
    createdAt: Date,
    lastLogin: Date
  ) {
    console.log("Updating user", id);
    // Implementation missing
  }

  // Potential ReDoS vulnerability - will be flagged
  validateUsername(username: string): boolean {
    // Inefficient regex that can lead to catastrophic backtracking
    const regex = /^([a-zA-Z0-9]+\s?)*$/;
    // Long strings with spaces can cause excessive processing time
    return regex.test(username);
  }

  // Potential XSS vulnerability - will be flagged
  getUserProfileHTML(user: User): string {
    // Directly embedding user input into HTML without sanitization
    // CodeRabbit might flag the lack of sanitization depending on configuration
    const unsafeName = user.name;
    return `<div>
              <h1>${unsafeName}</h1>
              <p>Age: ${user.age}</p>
            </div>`;
  }
}
