// User model with various issues
export interface User {
  id: number;
  name: string;
  age: number;
  active: boolean;
  email?: string;
}

// Class with constructor property assignment issues
export class UserImpl implements User {
  id: number;
  name: string;
  age: number;
  active: boolean;
  email?: string;

  // Redundant parameter properties - will be flagged
  constructor(
    id: number,
    name: string,
    age: number,
    active: boolean,
    email?: string
  ) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.active = active;
    this.email = email;
  }

  // Method with possible null reference - will be flagged
  getEmailDomain() {
    return this.email?.split("@")[1];
  }

  // Method with string concatenation - will be flagged in favor of template literals
  getDisplayName() {
    return this.name + " (ID: " + this.id + ")";
  }
}
