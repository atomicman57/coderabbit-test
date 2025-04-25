// User service with various issues
import { User } from "../models/user";

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
  async getAll() {
    // Promise that doesn't handle errors - will be flagged
    return new Promise((resolve) => {
      resolve([
        { id: 1, name: "John Doe", age: 30, active: true },
        { id: 2, name: "Jane Smith", age: 25, active: false },
      ]);
    });
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
}
