@echo off

if not exist node_modules\ ( npm install )
start http://localhost
npm start