class User {
    constructor(email, password, rememberMe, userId) {
      this.userId = userId;
      this.email = email;
      this.password = password;
      this.rememberMe = rememberMe;
    }

    set setUid(uid) {
      this.userId = uid;
    }
    // method
    toString() {
        return `email: ${this.email}, pass: ${this.password}, 
            remember: ${this.rememberMe}`;
      }
  }

export default User;