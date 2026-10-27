@echo off
title CURE Platform Launcher
color 0b
echo ==========================================================
echo  CURE: City Unified Response and Evolution Platform
echo  Anurag University - CSE Capstone Presentation Launcher
echo ==========================================================
echo.
echo  [1] Opening CURE Operating System Dashboard...
start index.html
ping -n 2 127.0.0.1 >nul
echo  [2] Opening Interactive Slide Deck (with Speaking Notes)...
start docs\presentation_slides.html
echo.
echo ==========================================================
echo  Startup Complete. Use Left/Right arrow keys for slides!
echo ==========================================================
