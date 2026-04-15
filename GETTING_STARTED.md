# Getting Started with Palm2Pay

This guide will help you set up and run Palm2Pay locally.

## Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Python** 3.10+ ([Download](https://python.org/))
- **Docker** & **Docker Compose** ([Download](https://docker.com/))
- **Git** ([Download](https://git-scm.com/))

## Quick Start (Recommended)

### 1. Clone and Install

```bash
cd PALM2PAY

# Install root dependencies
npm install

# Install Python dependencies for biometric service
cd packages/biometric
pip install -r requirements.txt
cd ../..
```

### 2. Set Up Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
# Required: JWT_SECRET, ENCRYPTION_KEY, BIOMETRIC_API_KEY
```

### 3. Start All Services with Docker

```bash
docker-compose -f infrastructure/docker/docker-compose.yml up -d
```

This starts:
- PostgreSQL database (port 5432)
- Redis cache (port 6379)
- Backend API (port 4000)
- Biometric service (port 8000)
- Web app (port 3000)
- Merchant dashboard (port 3002)

### 4. Verify Setup

```bash
# Check API health
curl http://localhost:4000/api/health

# Check biometric service
curl http://localhost:8000/health
```

### 5. Access Applications

| Application | URL | Description |
|-------------|-----|-------------|
| Landing Page | http://localhost:3000 | User web app |
| Merchant Dashboard | http://localhost:3002 | Merchant POS |
| API | http://localhost:4000 | Backend API |
| Biometric Service | http://localhost:8000 | Palm recognition |

---

## Development Mode

### Backend API

```bash
cd packages/api
npm install
npm run dev
```

### Biometric Service

```bash
cd packages/biometric
pip install -r requirements.txt
uvicorn src.main:app --reload
```

### Mobile App

```bash
cd apps/mobile
npm install
npx expo install
npm run dev
```

### Web App

```bash
cd apps/web
npm install
npm run dev
```

### Merchant Dashboard

```bash
cd apps/merchant
npm install
npm run dev
```

---

## Database Setup

### Using Docker (Recommended)

```bash
docker-compose -f infrastructure/docker/docker-compose.yml up postgres
```

### Manual PostgreSQL Setup

1. Create database:
```sql
CREATE DATABASE palm2pay;
CREATE USER palm2pay WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE palm2pay TO palm2pay;
```

2. Run migrations:
```bash
psql -U palm2pay -d palm2pay -f infrastructure/docker/init.sql
```

---

## Running Tests

```bash
# Run all tests
npm test

# API tests
cd packages/api
npm test

# Biometric tests
cd packages/biometric
pytest
```

---

## Default Test Credentials

After running the init script, you can use:

```
Email: test@example.com
Password: test123
```

---

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 4000
lsof -i :4000  # macOS/Linux
netstat -ano | findstr :4000  # Windows

# Kill process
kill -9 <PID>
```

### Docker Issues

```bash
# Clean restart
docker-compose down -v
docker-compose up -d --build
```

### Database Connection Failed

```bash
# Check PostgreSQL is running
docker ps | grep postgres

# View logs
docker logs palm2pay-db
```

### Python Dependencies

```bash
# Reinstall Python packages
cd packages/biometric
pip install -r requirements.txt --force-reinstall
```

---

## Architecture Overview

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Mobile    │     │     Web     │     │   Merchant  │
│   (React    │     │  (Next.js)  │     │  (Next.js)  │
│   Native)   │     │             │     │             │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
                    ┌──────▼──────┐
                    │  API (Hono) │
                    │   Node.js   │
                    └──────┬──────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
   ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐
   │ PostgreSQL  │  │    Redis    │  │  Biometric  │
   │  Database   │  │    Cache    │  │   (Python)  │
   └─────────────┘  └─────────────┘  └─────────────┘
```

---

## Next Steps

1. **Configure Payment Processing**: Set up Stripe account and add API keys
2. **Set Up Biometric Hardware**: Connect palm scanner device
3. **Configure Notifications**: Add Twilio/SendGrid credentials
4. **Deploy to Production**: See `docs/DEPLOYMENT.md`

## Support

For issues and questions:
- GitHub Issues: https://github.com/palm2pay/palm2pay/issues
- Documentation: https://docs.palm2pay.com
