# Server Connection Test Documentation

## Overview
The application implements a server connection test that runs before allowing access to any other features. This ensures that the application can communicate with the backend server before proceeding with user authentication and other functionalities.

## Flow
1. When the application starts, it automatically redirects to the server test page (`/`).
2. The server test attempts to connect to the `/api/health` endpoint.
3. Based on the connection result:
   - Success: Redirects to login page and stores connection status
   - Error: Displays retry option and prevents access to other pages

## Implementation Details

### Endpoints
- `GET /api/health`: Health check endpoint that should return a 200 status code

### Storage
The connection status is stored in localStorage:
- Key: `connection_status`
- Value: `"success"` when connection is successful

### Protected Routes
- All routes (including login and signup) are protected by the connection test
- Users cannot access any route if the connection test hasn't passed
- Failed connection test redirects back to the test page

### Error Handling
- Network errors are caught and displayed
- Retry mechanism is provided
- Clear error messages inform users of connection status

## Usage
1. The test runs automatically when accessing the application
2. No user intervention required for successful connection
3. Users can manually retry failed connections
4. Success redirects automatically to login page

## Security
- Connection status is cleared on failed attempts
- Protected routes verify connection status before rendering
- Invalid connection status redirects to test page