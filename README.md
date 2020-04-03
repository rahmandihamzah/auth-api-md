# auth-api-md

### baseUrl : https://peaceful-cove-51923.herokuapp.com

List of available endpoints:

**User**

- `POST /user/register`
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

- Status: `404`
```json
{
  "msg": "..."
}
```

## User

### POST /user/register

- Request Header(s):
  - `Content-Type`: `application/x-www-form-urlencoded` or `application/json`
- Request Body:
  - `fullName`: `String`
  - `email`: `String (required, unique)`
  - `password`: `String (required, min length: 6)`
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
  - `Content-Type`: `application/x-www-form-urlencoded` or `application/json`
- Request Body:
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

Send OTP code to registered email

- Request Body:
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

## Auth