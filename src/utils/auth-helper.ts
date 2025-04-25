// Authentication helper utility
// This import creates a circular dependency with UserService
import { UserService } from "../services/user-service";
import { User } from "../models/user";

export class AuthHelper {
  private userService: UserService;

  constructor() {
    // Instantiating UserService here further solidifies the dependency cycle
    this.userService = new UserService();
  }

  // Method that depends on UserService
  async checkUserPermissions(
    userId: number,
    permission: string
  ): Promise<boolean> {
    const user = await this.userService.findById(userId);

    if (!user) {
      return false;
    }

    // Placeholder for complex permission logic
    console.log(`Checking permission '${permission}' for user ${user.name}`);
    if (permission === "admin" && user.id === 1) {
      return true;
    }

    return false;
  }

  // Another utility function
  static generateToken(userId: number): string {
    const secret = "super-secret-key"; // Hardcoded secret - security issue
    const payload = { userId, timestamp: Date.now() };
    // Simplified token generation (not a real JWT)
    return (
      Buffer.from(JSON.stringify(payload)).toString("base64") + "." + secret
    );
  }
}
