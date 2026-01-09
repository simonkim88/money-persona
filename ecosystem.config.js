module.exports = {
    apps: [
        {
            name: "mp-backend",
            script: "./venv/Scripts/python.exe",
            args: "-m uvicorn app.main:app --host 0.0.0.0 --port 8000",
            cwd: "./backend"
        },
        {
            name: "mp-frontend",
            script: "npm.cmd",
            args: "start",
            cwd: "./frontend",
            interpreter: "none",
            env: {
                PORT: 3000,
                NODE_ENV: "production"
            }
        }
    ]
}
