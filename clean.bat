@echo off
taskkill /F /IM node.exe
timeout /t 2
rmdir /s /q .next 