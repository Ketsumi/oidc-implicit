export class User {
  private name: string;
  private email: string;

  constructor(name:string, email:string) {
    this.name = name;
    this.email = email;
  }

  public getName() {
    return this.name;
  }

  public getEmail() {
    return this.email;
  }
}
