@echo off

if not exist node_modules\ ( npm install )
start http://localhost:1234
npm start