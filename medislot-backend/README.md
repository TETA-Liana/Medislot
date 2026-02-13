# MediSlot Healthcare Appointment Booking Platform

A comprehensive backend system for healthcare appointment booking built with NestJS, Prisma, and PostgreSQL.

##  How the App Works (The Startup Process)

### 1. Automatic Admin Initialization
When the application starts, it uses the `AdminInitService` to check if a Super Admin exists. 
- It reads the `ADMIN_EMAIL` and `ADMIN_PASSWORD` from your `.env` file.
- If no user with that email exists, it automatically creates a Super Admin account with the **ADMIN** role.
- **First Step**: Log in with these credentials to the Admin Dashboard.

### 2. Setting Up the Infrastructure
As an Admin, your first task is to **create Hospitals**. Doctors cannot be fully functional unless they are assigned to a Hospital. 
- Admins control the registration and approval status of Doctors.
- Admins have access to global statistics via the Dashboard module.

---

##  Understanding IDs (User vs. Profile)

This system separates authentication from business logic. You will encounter several types of IDs:

| ID Type | Table | Description | Where to use? |
|---------|-------|-------------|---------------|
| **User ID** | `User` | The core account ID. Used for login and profile settings. | `auth/me`, `profile/update` |
| **Doctor ID** | `Doctor` | The professional profile ID. | Booking appointments, viewing availability. |
| **Patient ID** | `Patient` | The medical profile ID. | Managing medical history, viewing personal bookings. |
| **Hospital ID** | `Hospital` | The facility ID. | Filtering doctors by hospital. |

**Important**: Most public endpoints (like `GET /doctors/:id/availability`) expect the **Doctor ID** (profile), not the User ID.

---

##  Module Overview

###  Authentication (`AuthModule`)
- **JWT-Based**: Uses Access Tokens (short-lived) and Refresh Tokens (long-lived).
- **Registration**: Patients can register freely. Doctors register but remain in `PENDING` status until Admin approval.

###  Hospitals (`HospitalsModule`)
- Managed exclusively by Admins.
- Acts as the parent container for Doctors.
- Doctors must be assigned to a hospital to start receiving appointments.

###  Doctors & Availability (`DoctorsModule`)
- **Weekly Schedule**: Doctors set their general working hours (e.g., Mon 09:00 - 17:00).
- **Dynamic Slots**: The system automatically generates **30-minute slots** for the next 30 days (or a custom range) based on that schedule.
- **Booking Persistence**: Slots that collide with existing `UPCOMING` appointments are automatically filtered out.

###  Appointments (`AppointmentsModule`)
- **Booking**: Patients can book any "Available" slot.
- **Rules**: 
    - You cannot book in the past.
    - Rescheduling/Cancellation must happen at least **2 hours** before the appointment.
- **Status Flow**: `PENDING_CONFIRMATION` ➔ `UPCOMING` ➔ `COMPLETED` / `CANCELLED`.

###  Email Notifications (`EmailModule`)
Automated emails are triggered for:
1. **Welcome**: On user registration.
2. **Approval**: When an Admin approves a Doctor's special status.
3. **Appointments**: Confirmation of booking and reminders.

---

##  Architecture

- **Framework**: NestJS v11
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with refresh token rotation
- **Email**: Integrated mailing service for notices
- **Documentation**: Swagger/OpenAPI 3.0 (available at `/api/docs`)
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions (linting, tests, docker builds)

##  Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Docker & Docker Compose

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/medislot-backend.git
   cd medislot-backend
   ```

2. **Setup Environment**
   ```bash
   cp .env.example .env
   # Fill in ADMIN_EMAIL, ADMIN_PASSWORD, and DATABASE_URL
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Run Database Migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the App**
   ```bash
   npm run start:dev
   ```

##  Docker Deployment

To run the entire stack (App + Postgres) using Docker:

```bash
npm run docker:dev
```

This will:
- Spin up a PostgreSQL container.
- Run migrations automatically.
- Start the NestJS app on port 3000.