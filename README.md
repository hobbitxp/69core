# 69core Web Dashboard

This project provides a simple React + TypeScript frontend for interacting with the **69core** API. The UI shows your current balance, incoming transactions and includes a form to transfer money.

## Getting Started

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your API credentials.
3. Run the development server:
   ```bash
   npm run dev
   ```

The app uses **TailwindCSS** for styling and **axios** for API calls.

## Components

- `BalanceView.tsx` – displays the current balance and account info
- `StatementList.tsx` – lists incoming transfers
- `TransferForm.tsx` – form for initiating transfers

## Optional Proxy Server

A simple Express proxy is included under `server/` to keep API credentials out of the browser. To use it:

```bash
cd server
npm install
cp .env.example .env  # add your credentials
npm start
```

The frontend can then be configured to call the proxy endpoints instead of the public API.
