# auth-api-md

### baseUrl : https://peaceful-cove-51923.herokuapp.com

List of available endpoints:

**User**

- `POST /user/signup`
- `POST /user/login`
- `POST /user/reqResetPassword`
- `POST /user/resetPassword`

**Auth**

- `GET /auth/reqOtpCode`
- `POST /auth/verifyOtpCode`

Error response format:

- Status: `500`
```json
{
  "msg": "..."
}
```

- Status: `400`
```json
{
  "msg": "...",
  "errors": ["...", "..."]
}
```

- Status: `400`
```json
{
  "msg": "..."
}
```

- Status: `400`
```json
{
  "msg": "...",
  "verified": "Boolean"
}
```

- Status: `404`
```json
{
  "msg": "..."
}
```

## User

### POST /user/signup

- Request Header(s):
  - `Content-Type`: `application/json`
- Request Body:
  ```json
  {
    "fullName": "...",
    "email": "...",
    "password": "..."
  }
  ```
  - `fullName`: `String`
  - `email`: `String` (required, unique)
  - `password`: `String` (required, min length: 6)
- Response:
  - `status`: `201`
  - `body`:
    ```json
    {
      "msg": "Sign up completed",
      "payload": {
        "user_id": "Number",
        "email": "..."
      }
    }
    ```

### POST /user/login

- Request Header(s):
  - `Content-Type`: `application/json`
- Request Body:
  ```json
  {
    "email": "...",
    "password": "..."
  }
  ```
  - `email`: `String`
  - `password`: `String`
- Response:
  - `status`: `200`
  - `body`:
    ```json
    {
      "msg": "Signed in",
      "access_token": "..."
    }
    ```

### POST /user/reqResetPassword

Send OTP code (reset password requirement) to registered email

- Request Header(s):
  - `Content-Type`: `application/json`
- Request Body:
  ```json
  {
    "email": "..."
  }
  ```
  - `email`: `String`
- Response:
  - `status`: `200`
  - `body`:
    ```json
    {
      "msg": "Send OTP code complete",
      "token": "...",
      "info": {
        "accepted": [
          "..."
        ],
        "rejected": [],
        "envelopeTime": "Number",
        "messageTime": "Number",
        "messageSize": "Number",
        "response": "...",
        "envelope": {
          "from": "...",
          "to": [
            "..."
          ]
        },
        "messageId": "..."
      }
    }
    ```

### POST /user/resetPassword

- Request Header(s):
  - `Content-Type`: `application/json`
  - `token`: `String` (replace with `token` from `/user/reqResetPassword` response)
- Request Body:
  ```json
  {
    "inputOtpCode": "...",
    "newPassword": "..."
  }
  ```
  - `inputOtpCode`: `String`
  - `newPassword`: `String`
- Response:
  - `status`: `200`
  - `body`:
  ```json
  {
    "msg": "Reset password complete"
  }
  ```

## Auth

### GET /auth/reqOtpCode

- Request Header(s):
  - `Content-Type`: `application/json`
  - `access_token`: `String` (replace with `access_token` from `/user/login` response)
- Response:
  - `status`: `200`
  - `body`:
  ```json
  {
    "msg": "Send OTP code complete",
    "userId": "Number",
    "otpCode": "...",
    "info": {
      "accepted": [
        "..."
      ],
      "rejected": [],
      "envelopeTime": "Number",
      "messageTime": "Number",
      "messageSize": "Number",
      "response": "...",
      "envelope": {
        "from": "...",
        "to": [
          "..."
        ]
      },
      "messageId": "..."
    }
  }
  ```

### GET /auth/verifyOtpCode

- Request Header(s):
  - `Content-Type`: `application/json`
  - `access_token`: `String` (replace with `access_token` from `/user/login` response)
- Request Body:
  ```json
  {
    "userId": "Number",
    "otpCodeFromServer": "...",
    "otpCodeFromUser": "..."
  }
  ```
  - `userId`: `Number` (replace with `userId` from `/auth/reqOtpCode` response)
  - `otpCodeFromServer`: `String` (replace with `otpCode` from `/auth/reqOtpCode` response)
  - `otpCodeFromUser`: `String`
- Response:
  - `status`: `200`
  - `body`:
  ```json
  {
    "msg": "OTP Code Verified",
    "verified": true
  }
  ```