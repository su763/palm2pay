# Palm2Pay 🖐️

> **The Future of Payment is in Your Palm**

## Vision

To completely eliminate checkout friction by turning the human hand into a highly secure, universal payment method. Palm2Pay is a biometric payment ecosystem that allows users to seamlessly transact at retail locations simply by hovering their palm over a proprietary scanner.

## Value Proposition

| For Users | For Merchants |
|-----------|---------------|
| Zero reliance on physical wallets, cards, or smartphones | Drastically accelerated checkout speeds |
| Instant, secure payments with just a palm hover | Reduced hardware clutter |
| Universal payment method anywhere Palm2Pay is accepted | Minimized payment fraud |
| Complete transaction history at fingertips | Lower transaction fees |

## Target Market

- Urban retail environments with high foot traffic
- Supermarkets and convenience stores
- Sports stadiums and arenas
- University campuses
- Food courts and cafeterias
- Transit systems

## Tech Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                         Palm2Pay Architecture                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Mobile App │  │  Web App     │  │  Merchant Dashboard  │  │
│  │  (React      │  │  (Next.js)   │  │  (Next.js +          │  │
│  │   Native)    │  │              │  │   TypeScript)        │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
│         │                  │                      │             │
│         └──────────────────┼──────────────────────┘             │
│                            │                                    │
│                     ┌──────▼───────┐                            │
│                     │   API Gateway │                            │
│                     │   (Express)   │                            │
│                     └──────┬───────┘                            │
│                            │                                    │
│         ┌──────────────────┼──────────────────┐                 │
│         │                  │                  │                 │
│  ┌──────▼───────┐  ┌──────▼───────┐  ┌──────▼───────┐         │
│  │   Auth       │  │   Payment    │  │   Biometric  │         │
│  │   Service    │  │   Service    │  │   Engine     │         │
│  │   (Node.js)  │  │   (Node.js)  │  │   (Python)   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  PostgreSQL  │  │    Redis     │  │   Palm Image Store   │  │
│  │  (Primary    │  │   (Cache/    │  │   (S3/MinIO)         │  │
│  │   Database)  │  │   Sessions)  │  │                      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Project Structure

```
PALM2PAY/
├── apps/
│   ├── mobile/           # React Native app (iOS/Android)
│   ├── web/              # Next.js user web app
│   └── merchant/         # Next.js merchant dashboard
├── packages/
│   ├── api/              # Backend API (Node.js/Express)
│   ├── biometric/        # Palm recognition engine (Python)
│   ├── shared/           # Shared types, utilities
│   └── ui/               # Shared UI components
├── infrastructure/
│   ├── docker/           # Docker configurations
│   ├── k8s/              # Kubernetes manifests
│   └── terraform/        # Infrastructure as code
└── docs/                 # Documentation
```

## Features

### User Features
- Palm enrollment and biometric registration
- Link bank accounts/cards
- Transaction history
- Spending analytics
- QR code fallback
- Security notifications

### Merchant Features
- POS integration
- Real-time transaction processing
- Sales analytics dashboard
- Customer insights
- Multi-location support
- Employee management

### Security Features
- End-to-end encryption
- Liveness detection
- Multi-factor authentication
- Fraud detection
- PCI-DSS compliance

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- Docker & Docker Compose
- React Native CLI (for mobile)

### Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Start all services (Docker)
docker-compose up -d

# Or run individually:
npm run dev:api       # Backend API
npm run dev:biometric # Biometric service
npm run dev:mobile    # Mobile app
npm run dev:web       # Web app
npm run dev:merchant  # Merchant dashboard
```

## API Documentation

See [docs/API.md](./docs/API.md) for complete API documentation.

## Security

Palm2Pay takes security seriously:
- All biometric data is encrypted at rest and in transit
- Palm templates are stored as irreversible mathematical representations
- No raw palm images are stored after template generation
- Regular security audits and penetration testing

## License

Proprietary - All rights reserved

## Contact

For inquiries: contact@palm2pay.com
