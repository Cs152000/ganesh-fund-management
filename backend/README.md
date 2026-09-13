# Ganesh Fund - Java + MySQL Backend

## Requirements
- Java 21
- Maven 3.9+
- MySQL 8+

## 1. Create database
```sql
CREATE DATABASE ganesh_fund;
```

## 2. Configure MySQL
Edit `src/main/resources/application.properties` or set environment variables:
- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `ADMIN_USERNAME` (default `admin`)
- `ADMIN_PASSWORD` (default `ganesha123`)
- `JWT_SECRET` (use a long random secret in production)

## 3. Run
```bash
mvn spring-boot:run
```
Backend runs at http://localhost:8080.

## 4. Connect React
In React root create `.env.local`:
```env
VITE_API_BASE_URL=http://localhost:8080/api
```
Then:
```bash
npm install
npm run dev
```

The React app sends GET requests for public data. Add/update/delete transaction, member changes, settings changes and reset-demo require the JWT returned by admin login.
