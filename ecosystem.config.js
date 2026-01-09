module.exports = {
    apps: [
        {
            name: "mp-backend",
            script: "uvicorn",
            args: "app.main:app --host 0.0.0.0 --port 8000",
            cwd: "./backend",
            interpreter: "./backend/venv/Scripts/python.exe" // Use venv python
        },
        {
            name: "mp-frontend",
            script: "npm",
            args: "start",
            cwd: "./frontend",
            env: {
                PORT: 3000,
                NODE_ENV: "production"
            }
        }
    ]
}
