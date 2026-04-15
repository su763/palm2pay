# Palm2Pay API Documentation

## Base URL

```
Development: http://localhost:4000/api
Production: https://api.palm2pay.com/api
```

## Authentication

Most endpoints require authentication using JWT Bearer tokens.

```
Authorization: Bearer <your-access-token>
```

---

## Authentication Endpoints

### POST `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "fullName": "John Doe",
  "phoneNumber": "+1234567890"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "John Doe",
    "phoneNumber": "+1234567890",
    "palmEnrolled": false
  },
  "accessToken": "eyJ...",
  "refreshToken": "eyJ..."
}
```

### POST `/auth/login`

Login to existing account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "user": { ... },
  "accessToken": "eyJ...",
  "refreshToken": "eyJ..."
}
```

### POST `/auth/refresh`

Refresh access token.

**Request Body:**
```json
{
  "refreshToken": "eyJ..."
}
```

**Response (200):**
```json
{
  "accessToken": "eyJ...",
  "refreshToken": "eyJ..."
}
```

### POST `/auth/logout`

Logout and invalidate refresh token.

**Headers:** `Authorization: Bearer <token>`

---

## Biometric Endpoints

### POST `/biometric/enroll`

Enroll palm biometric data.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "palmImageData": "base64-encoded-image",
  "livenessData": {
    "temperature": 36.5,
    "pulse": 72
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Palm enrolled successfully",
  "templateId": "uuid"
}
```

### POST `/biometric/verify`

Verify palm scan against enrolled templates.

**Request Body:**
```json
{
  "palmScanData": "base64-encoded-image"
}
```

**Response (200):**
```json
{
  "success": true,
  "match": true,
  "score": 0.95,
  "userId": "uuid"
}
```

### GET `/biometric/status`

Check palm enrollment status.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "enrolled": true,
  "enrolledAt": "2026-04-16T10:00:00Z",
  "lastUsedAt": "2026-04-16T14:30:00Z",
  "livenessVerified": true
}
```

### DELETE `/biometric/enrollment`

Delete palm enrollment data.

**Headers:** `Authorization: Bearer <token>`

---

## Payment Endpoints

### POST `/payments/initiate`

Initiate a new payment.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "amount": 29.99,
  "currency": "USD",
  "merchantId": "uuid",
  "locationId": "uuid",
  "description": "Coffee purchase"
}
```

**Response (200):**
```json
{
  "transactionId": "uuid",
  "status": "pending_biometric",
  "amount": 29.99,
  "currency": "USD",
  "message": "Please verify with palm scan"
}
```

### POST `/payments/verify`

Verify payment with biometric scan.

**Request Body:**
```json
{
  "transactionId": "uuid",
  "palmScanData": "base64-encoded-image"
}
```

**Response (200):**
```json
{
  "success": true,
  "transactionId": "uuid",
  "status": "completed",
  "message": "Payment successful"
}
```

### GET `/payments/history`

Get transaction history.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `limit` (default: 20)
- `offset` (default: 0)

**Response (200):**
```json
{
  "transactions": [
    {
      "id": "uuid",
      "amount": 29.99,
      "currency": "USD",
      "status": "completed",
      "merchantName": "Coffee Shop",
      "createdAt": "2026-04-16T14:30:00Z",
      "description": "Coffee purchase"
    }
  ],
  "pagination": {
    "total": 50,
    "limit": 20,
    "offset": 0
  }
}
```

### GET `/payments/:id`

Get transaction by ID.

**Headers:** `Authorization: Bearer <token>`

---

## User Endpoints

### GET `/users/me`

Get current user profile.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "fullName": "John Doe",
  "phoneNumber": "+1234567890",
  "palmEnrolled": true,
  "createdAt": "2026-04-16T10:00:00Z"
}
```

### PATCH `/users/me`

Update user profile.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "fullName": "Jane Doe",
  "phoneNumber": "+1987654321"
}
```

### GET `/users/me/payment-methods`

Get payment methods.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "paymentMethods": [
    {
      "id": "uuid",
      "type": "card",
      "last4": "4242",
      "brand": "Visa",
      "expiryMonth": 12,
      "expiryYear": 2028,
      "isDefault": true,
      "createdAt": "2026-04-16T10:00:00Z"
    }
  ]
}
```

### POST `/users/me/payment-methods`

Add payment method.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "type": "card",
  "stripePaymentMethodId": "pm_xxx",
  "last4": "4242",
  "brand": "Visa",
  "expiryMonth": 12,
  "expiryYear": 2028,
  "isDefault": true
}
```

### DELETE `/users/me/payment-methods/:id`

Delete payment method.

**Headers:** `Authorization: Bearer <token>`

### PATCH `/users/me/payment-methods/:id/default`

Set default payment method.

**Headers:** `Authorization: Bearer <token>`

---

## Merchant Endpoints

### POST `/merchant/register`

Register as a merchant.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Coffee Shop Inc",
  "businessType": "retail"
}
```

### POST `/merchant/locations`

Add merchant location.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Main Street Store",
  "address": "123 Main St",
  "city": "New York",
  "country": "USA",
  "terminalId": "TERM-001"
}
```

### GET `/merchant/dashboard`

Get merchant dashboard data.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "merchant": { ... },
  "locations": [ ... ],
  "todayStats": {
    "totalAmount": 1247.50,
    "transactionCount": 23,
    "completedCount": 22,
    "failedCount": 1
  },
  "recentTransactions": [ ... ]
}
```

### POST `/merchant/process-payment`

Process payment at merchant terminal.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "amount": 29.99,
  "currency": "USD",
  "description": "Coffee purchase",
  "palmScanData": "base64-encoded-image"
}
```

### GET `/merchant/locations`

Get all merchant locations.

**Headers:** `Authorization: Bearer <token>`

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request data",
  "details": { ... }
}
```

### 401 Unauthorized
```json
{
  "error": "Missing or invalid authorization header"
}
```

### 403 Forbidden
```json
{
  "error": "Admin access required"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting

- API requests: 100 requests per minute per IP
- Biometric verification: 10 requests per minute per user
- Payment initiation: 20 requests per minute per user

Rate limit headers are included in responses:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining
- `X-RateLimit-Reset`: Unix timestamp when limit resets
