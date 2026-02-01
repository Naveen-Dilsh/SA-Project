# 🚀 Full Project Deployment Guide - DigitalOcean

This guide will walk you through deploying your **Car Auction** project (ASP.NET Core Backend + React Frontend + SQL Server) to a **DigitalOcean Droplet** using Docker Compose.

I have already generated the necessary configuration files (`Dockerfile`, `docker-compose.yml`, `nginx.conf`) for you.

---

## 📋 Prerequisites

1.  **DigitalOcean Account** (Sign up if you haven't).
2.  **Git** installed on your local machine.
3.  **SSH Client** (likely built-in to your terminal).

---

## 🛠️ Step 1: Prepare Your Project

### 1. Update Frontend URLs
Your React frontend currently points to `https://localhost:7021`. For production, it should use relative usage (e.g., `/api/...`) so Nginx can proxy requests to the backend container.

**Action:** Run the provided PowerShell script to update all files:
```powershell
.\prepare_frontend.ps1
```
*This script removes `https://localhost:7021` from your frontend code, effectively changing `https://localhost:7021/api/foo` to `/api/foo`.*

### 2. Verify Docker Configuration (Created for you)
I have created the following files in your project:
-   `docker-compose.yml`: Orchestrates Backend, Frontend, and Database.
-   `Car_Auction Backend/Dockerfile`: Builds the .NET API.
-   `Car_Auction Frontend/Dockerfile`: Builds the React App.
-   `Car_Auction Frontend/nginx.conf`: Configures Nginx to serve the frontend and proxy `/api` calls to the backend.

### 3. Push to GitHub
Commit all these new files and changes to your GitHub repository.
```bash
git add .
git commit -m "Add Docker deployment configuration"
git push origin main
```
*(If you don't use GitHub, you will need to copy the files manually to the server, but GitHub is recommended).*

---

## ☁️ Step 2: Set Up DigitalOcean Droplet

1.  Log in to **DigitalOcean Control Panel**.
2.  Click **Create** -> **Droplets**.
3.  **Region**: Choose the one closest to you/your users (e.g., Bangalore, London, NYC).
4.  **Image**: Choose **Docker** from the "Marketplace" tab (search for "Docker").
    *   *Alternatively, choose Ubuntu 24.04 and install Docker manually, but the Marketplace image is faster.*
5.  **Size**: **Basic** -> **Regular** -> **$6/month** (1GB RAM, 1 CPU) might be tight for SQL Server.
    *   **RECOMMENDED**: **$12/month** (2GB RAM) or higher to ensure SQL Server runs smoothly. SQL Server requires approx 2GB RAM minimum for stability.
6.  **Authentication**: Choose **SSH Key** (safer) or **Password**.
7.  **Hostname**: Give it a name (e.g., `car-auction-server`).
8.  Click **Create Droplet**.

---

## 🚀 Step 3: Deploy the Application

### 1. Connect to the Droplet
Open your local terminal and SSH into your new server (use the IP address shown in DigitalOcean dashboard):
```bash
ssh root@your_droplet_ip_address
```

### 2. Clone Your Repository
```bash
git clone https://github.com/your-username/your-repo-name.git app
cd app
```
*(Replace with your actual GitHub repo URL)*

### 3. Start the Application
Run Docker Compose to build and start everything:
```bash
docker compose up -d --build
```
*This may take a few minutes to build the .NET app and React app.*

### 4. Verify Status
Check if containers are running:
```bash
docker compose ps
```
You should see 3 containers: `car_auction_backend`, `car_auction_frontend`, `car_auction_db`.

---

## 🌐 Step 4: Add Domain (Optional)

1.  If you have a domain (e.g., `mycarauction.com`), point its **A Record** to your Droplet's IP address.
2.  The application is now accessible at `http://your_droplet_ip_address` or your domain!

---

## 🔧 Troubleshooting & Maintenance

-   **Database Migrations**: I have updated `Program.cs` to apply migrations automatically on startup. The database will be created the first time the app runs.
-   **View Logs**:
    ```bash
    docker compose logs -f backend
    ```
-   **Update App**:
    ```bash
    git pull
    docker compose up -d --build
    ```
-   **Database Data**: Data is persisted in a Docker volume `mssql_data`. It survives container restarts.

---

### Defaults used (Change if needed in `docker-compose.yml`)
-   **DB Password**: `YourStrong@Password123`
-   **JWT Secret**: `YourVeryLongSecureSecretKeyThatIsAtLeast32CharactersLong`
