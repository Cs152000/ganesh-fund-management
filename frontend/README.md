# Ganesh Chaturthi Fund Management – React JS (Component Version)

This is the same Version 2 application reorganized into separate JSX files so the project is easier to learn and maintain.

## Folder structure

```text
src/
├── App.jsx
├── main.jsx
├── data.js
├── utils.js
├── styles.css
├── components/
│   ├── Header.jsx
│   ├── Modals.jsx
│   ├── QuickActions.jsx
│   ├── Sidebar.jsx
│   ├── Stats.jsx
│   ├── TransactionForm.jsx
│   └── TransactionsTable.jsx
└── pages/
    ├── Dashboard.jsx
    ├── Members.jsx
    ├── PDFCenter.jsx
    ├── Reports.jsx
    ├── Settings.jsx
    ├── Share.jsx
    └── Transactions.jsx
```

## What each file does

- `App.jsx` – main state, navigation, calculations, localStorage, PDF/WhatsApp actions.
- `data.js` – demo transactions, committee members and default settings.
- `utils.js` – currency formatting, date helper, localStorage helper and initials.
- `components/Sidebar.jsx` – left navigation.
- `components/Header.jsx` – Ganesh Chaturthi header and Admin Login button.
- `components/Stats.jsx` – total added, withdrawn and current balance cards.
- `components/TransactionForm.jsx` – add/withdraw form.
- `components/TransactionsTable.jsx` – searchable transaction table and actions.
- `components/QuickActions.jsx` – WhatsApp, reports and PDF shortcuts.
- `components/Modals.jsx` – admin login and committee-member modal dialogs.
- `pages/Dashboard.jsx` – dashboard screen.
- `pages/Transactions.jsx` – complete transaction screen.
- `pages/Reports.jsx` – monthly/date report screen.
- `pages/Members.jsx` – committee-member screen.
- `pages/Share.jsx` – WhatsApp sharing screen.
- `pages/PDFCenter.jsx` – receipt/report PDF screen.
- `pages/Settings.jsx` – committee/admin settings screen.
- `styles.css` – application styling and responsive layout.

## Run

```bash
npm install
npm run dev
```

If PowerShell gives the `npm.ps1` execution-policy error, use:

```powershell
npm.cmd install
npm.cmd run dev
```

Or change the VS Code terminal to Command Prompt.

## Admin

Default password: `ganesha123`

Change it from **Settings** after logging in.

## Important

This is a frontend-only learning/local project. The admin password is stored in browser localStorage and is not suitable for real security. For a real committee deployment with multiple phones sharing the same data, connect this React frontend to a backend such as Spring Boot + MySQL with server-side authentication.
