@echo off
title CURE Local HTTP Server
color 0b
echo ==========================================================
echo  CURE: City Unified Response and Evolution Platform
echo  Initializing Local Web Server on http://localhost:8000
echo ==========================================================
echo.
echo  [1] Starting Python HTTP Server in the background...
start "" /b python -m http.server 8000
ping -n 3 127.0.0.1 >nul
echo  [2] Opening CURE Operating System Dashboard...
start http://localhost:8000/
ping -n 2 127.0.0.1 >nul
echo  [3] Opening Interactive Slide Deck...
start http://localhost:8000/docs/presentation_slides.html
echo.
echo ==========================================================
echo  Server is active. Close this window to terminate server.
echo ==========================================================
echo.
:: Keep the batch script window open to run the python server process
cmd /k
