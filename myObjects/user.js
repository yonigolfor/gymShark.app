class User {
    constructor(email, password, selectedLanguage, userId) {
      this.userId = userId;
      this.email = email;
      this.password = password;
      this.selectedLanguage = selectedLanguage;
    }

    set setUid(uid) {
      this.userId = uid;
    }
    // method
    toString() {
        return `email: ${this.email}, pass: ${this.password}, 
            language: ${this.language}`;
      }
  }

export default User;