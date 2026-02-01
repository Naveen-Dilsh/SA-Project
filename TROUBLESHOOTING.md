# 🛠️ Troubleshooting Guide

If you are facing issues with Signup or Login after deployment, follow these steps.

## 1. ⚠️ CRITICAL: Sync Your Code First!
**You are editing files on your computer (Windows), but the server is a different machine!**
Checking "Save" in VS Code does **NOT** update the server automatically.

**You must transfer your changes to the server before rebuilding:**

### Option A: Using Git (Recommended)
1.  **On your Local Computer (VS Code Terminal):**
    ```powershell
    git add .
    git commit -m "Fix login context and urls"
    git push origin main
    ```
2.  **On the Server (SSH Terminal):**
    ```bash
    git pull
    docker compose up -d --build
    ```

### Option B: If you are NOT using Git
You have to manually update the file on the server.
1.  **On the Server**:
    ```bash
    nano "Car_Auction Frontend/src/Context/AuthContext.js"
    ```
2.  Delete the old content and paste the NEW content from your local file.
3.  Press `Ctrl+X`, then `Y`, then `Enter` to save.
4.  Then rebuild: `docker compose up -d --build`

---

## 2. 🔄 Rebuild Containers
Once the code is on the server, you must rebuild:


---

## 2. 🔍 Check Backend Logs
If Signup is still failing, we need to see why the backend is rejecting it.
Run this command:

```bash
docker compose logs -f backend
```
*Look for any "Exception" or "Error" messages when you try to Sign Up.*

---

## 3. 🌐 Check Browser Network Errors
1.  Open Chrome/Edge Developer Tools (F12).
2.  Go to the **Network** tab.
3.  Try to Sign Up.
4.  Click on the red `register` request.
5.  Click the **Response** tab to see the exact error message from the server (e.g., "Brand is required").

---

## 4. 🐛 Common Issues & Fixes

### ❌ Issue: "Login Failed" or Crash on Login
**Cause:** The frontend code was expecting a return value from the login function, but it wasn't returning one.
**Fix:** I have updated `src/Context/AuthContext.js` to return the result. **Rebuild required.**

### ❌ Issue: "Signup not working"
**Possible Causes:**
-   **Database**: The database might still be initializing. Wait 1-2 minutes after starting containers.
-   **Validation**: Ensure you are selecting a "Brand" if you are choosing "Admin" role.
-   **Email**: If email sending fails (SMTP), the registration might fail. Check backend logs. 

### ❌ Issue: "Network Error" or 404
-   Ensure you are accessing the site via the Docker URL (e.g., `http://localhost` or `http://<your-ip>`).
-   Do **NOT** use `npm start` locally unless you configured a proxy. Use Docker Compose to test.

---

## 📝 Need more help?
Copy the error message from the **Backend Logs** or the **Network Response** and paste it in the chat!
