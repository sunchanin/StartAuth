# Authentication Module

This repository provides a reusable authentication module for Node.js applications. It includes middleware for token-based authentication, utilities for token generation and verification, and password hashing with `bcrypt`.

## Features
- **Token-based authentication**: JSON Web Token (JWT) implementation.
- **Password hashing**: Secure password storage using `bcrypt`.
- **Middleware**: Easily integrate authentication and authorization into your Express applications.
- **Custom error handling**: Ensure security with detailed error management.

---

## Installation

### Prerequisites
- Node.js (v14 or higher)
- NPM or Yarn

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/StartAuth.git
   cd authentication
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following:
   ```env
   ACCESS_TOKEN_SECRET=your-secret-key
   EXPIRES_IN=1d
   SALT_ROUNDS=10
   ```

---

## Usage

### Importing the Module
You can use this module by importing it into your project:

```javascript
const { authenticate } = require('./path-to-repository/authentication');
const { generateToken } = require('./path-to-repository/authentication/services/token');
const { hashPassword, verifyPassword } = require('./path-to-repository/authentication/services/bcrypt');
```

### Middleware
Use the `authenticate` middleware to protect your routes:

```javascript
const express = require('express');
const { authenticate } = require('./authentication/middleware/authentication');

const app = express();

app.get('/protected', authenticate, (req, res) => {
  res.send(`Hello, user with ID: ${req.userId}`);
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### Token Generation
Use `generateToken` to create a JWT:

```javascript
const { generateToken } = require('./authentication/services/token');

const user = { id: 1, email: 'user@example.com', role: 'user' };
const token = generateToken(user);
console.log('Generated Token:', token);
```

### Password Hashing and Verification
Use `bcrypt` utilities for secure password management:

```javascript
const { hashPassword, verifyPassword } = require('./authentication/services/bcrypt');

// Hash a password
const password = 'my-secure-password';
hashPassword(password).then((hashedPassword) => {
  console.log('Hashed Password:', hashedPassword);

  // Verify the password
  verifyPassword(password, hashedPassword).then((isMatch) => {
    console.log('Password Match:', isMatch);
  });
});
```

---

## Folder Structure
```
.
├── middleware
│   ├── authentication.js    # Middleware for authenticating JWT tokens
│   ├── authorization.js      # Middleware for role-based authorization
├── services
│   ├── bcrypt.js             # Password hashing and verification
│   ├── token.js              # Token generation and decoding
├── .env.example              # Example environment variables
├── README.md                 # Documentation
├── package.json              # Project metadata and dependencies
```

---

## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

---

## Support
If you encounter any issues or have questions, please open an issue on GitHub or contact [chanin.kre@gmail.com].

