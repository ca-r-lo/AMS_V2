# JWT Authentication Documentation

## Overview
The application uses JSON Web Tokens (JWT) for authentication. JWTs are stored in localStorage and included in API requests to maintain user sessions.

## Token Storage
- Token is stored in localStorage with key: `token`
- Format: `Bearer <token>`

## Token Lifecycle

### Token Generation
1. User logs in successfully
2. Server generates JWT containing:
   - User ID
   - Username
   - Role
   - Expiration time (30 minutes)

### Token Usage
1. Token is included in all API requests via Authorization header:
   ```javascript
   headers: {
     'Authorization': `Bearer ${localStorage.getItem('token')}`
   }
   ```

### Token Expiration
- Tokens expire after 30 minutes of inactivity
- User is automatically logged out when:
  - Token expires
  - No activity detected for 30 minutes
  - Server connection is lost

### Token Renewal
- Token is refreshed on any user activity
- Activities that reset timeout:
  - Mouse movements
  - Keyboard input
  - Touch events
  - Scrolling

## Security Measures
1. Tokens are cleared on:
   - Manual logout
   - Session timeout
   - Failed server connection
   - Browser tab/window close

2. Protected Routes:
   - Verify token presence
   - Redirect to login if token is missing/invalid
   - Require successful server connection

## Implementation Example
```typescript
// Making authenticated requests
const fetchData = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('/api/data', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  // Handle response
};
```

## Error Handling
- Invalid token: Redirect to login
- Expired token: Automatic logout
- Missing token: Redirect to login
- Server error: Clear token and redirect to server test