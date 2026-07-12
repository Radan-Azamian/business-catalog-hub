BENITO CAFE FULL-STACK CATALOG HUB
DEVELOPMENT AND ARCHITECTURAL REPORT

This comprehensive documentation details the engineering requirements, architectural design patterns, and deployment mechanisms for the Benito Cafe business application. Built as a fully decoupled, full-stack application, this platform manages a dynamic inventory catalog, tracks customer shopping behaviors locally in memory, and handles transactional checkout inquiries through a persistent data layer.

---

SECTION I: ARCHITECTURAL OVERVIEW AND DESIGN PHILOSOPHY

The frontend interface layer is explicitly engineered around a Decoupled Single-View Component Architecture. Rather than introducing complex state hydration issues or page transitions that fragment user session state, the entire visual matrix is contained within a singular primary workspace component (Catalog.jsx).

1. Transactional State Integrity
By positioning the database integration side-effects, the selection list array, and the order intake logic inside a single component scope, the application guarantees instantaneous synchronization. This completely removes the computational overhead of prop drilling and avoids the complex configuration vectors associated with external global stores such as Redux or the Context API.

2. Deterministic Layout Encapsulation
To ensure that visual components render identically regardless of the runtime device, layout designs are handled using inline layout parameters. This strategy bypasses browser-specific style sheet parsing disparities often found in global style declarations, preserving structural grids intact on any viewport.

3. Complete Server and Client Separation
The presentation tier functions as a pure data consumer. It maintains zero direct knowledge of SQL schemas, operating parameters, or query formats, communicating across boundaries exclusively via non-blocking asynchronous network requests.

---

SECTION II: COURSE CRITERIA ALIGNMENT MATRIX

The application layout explicitly satisfies every parameter outlined within the COM4134 assessment guidelines as tabulated below:

| Professor's Requirement | Implementation Status | Project Location / Proof |
| :--- | :--- | :--- |
| **Front-end with React** | Complete | client/src/ (Vite development pipeline, hooks lifecycle) |
| **Back-end with Node.js** | Complete | server/index.js (Express routing framework, API controllers) |
| **Database Connection** | Complete | server/config/db.js (Relational PostgreSQL via Sequelize ORM) |
| **Version Control** | Complete | Pushed and tracked systematically on GitHub |
| **Automated Data Seeding** | Complete | server/index.js (Self-healing fallback database populate lifecycle) |

---

SECTION III: DATABASE SCHEMA AND RELATIONAL MODELS

The persistent storage engine relies on a structured PostgreSQL database. This choice guarantees transactional safety, data types checking, and relational constraints necessary for e-commerce or customer inquiry data lifecycle management.

```text
  [ Items Table ]                    [ Requests Table ]
  ----------------                   ------------------
  - id (PK: Integer)                 - id (PK: Integer)
  - title (String)                   - clientName (String)
  - description (Text)               - clientPhone (String)
  - clientEmail (String, Nullable)   - clientEmail (String, Nullable)
  - price (Decimal)                  - notes (Text, Nullable)
  - imageUrl (String)                - selectedItems (Text / Stringified JSON)
  - features (String)                - status (String: 'Pending')

  🛠️ Local Installation & Deployment Guide
Follow these sequential steps to initialize the application stack simultaneously on your local workstation.

Prerequisites
Node.js (v16.x or higher)

PostgreSQL Instance running locally with an empty database created named business_db.

1. Server Configuration & Setup
Navigate to the root server terminal workspace:

    cd server
    npm install

Create a .env file inside the server/ root folder and append your local PostgreSQL connection string:

    PORT=5000
    DATABASE_URL=postgres://your_postgres_username:your_password@localhost:5432/business_db

Fire up the Express server layer:


    npm run dev


2. Client Configuration & Setup
Open a new, separate terminal tab and enter the frontend client environment:


    cd client
    npm install
    npm run dev
    
Vite will compile the development build instantly and supply your active graphical browser port:
👉 http://localhost:5173