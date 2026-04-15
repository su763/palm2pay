@echo off
echo ========================================
echo Palm2Pay GitHub Setup Script
echo ========================================
echo.

cd /d "%~dp0"

echo Checking if Git is installed...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo Please install Git from https://git-scm.com/
    pause
    exit /b 1
)

echo Initializing Git repository...
git init

echo Adding all files...
git add .

echo Committing changes...
git commit -m "Palm2Pay - Biometric Payment System"

echo.
echo ========================================
echo Next Steps:
echo ========================================
echo 1. Go to https://github.com/new
echo 2. Create a new repository named 'palm2pay'
echo 3. Make it Public
echo 4. Copy the repository URL
echo.
set /p repo_url="Enter your GitHub repository URL: "

echo Connecting to remote repository...
git remote add origin %repo_url%

echo Renaming branch to main...
git branch -M main

echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo SUCCESS! Your code is on GitHub!
echo ========================================
echo.
echo Next: Deploy to Vercel
echo 1. Go to https://vercel.com
echo 2. Sign in with GitHub
echo 3. Click 'Add New Project'
echo 4. Select 'palm2pay' repository
echo 5. Set Root Directory to 'apps/web'
echo 6. Click Deploy
echo.
pause
