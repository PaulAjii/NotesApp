"use strict";const i=require("dotenv");i.config();const{app:e,BrowserWindow:o}=require("electron"),s=require("path"),t=()=>{const n=new o({width:900,height:900,webPreferences:{nodeIntegration:!0,contextIsolation:!1}});process.env.NODE_ENV==="development"?n.loadURL(process.env.VITE_PORT):n.loadFile(s.join(__dirname,"../dist/index.html"))};e.whenReady().then(t);e.on("window-all-closed",()=>{process.platform!=="darwin"&&e.quit()});e.on("activate",()=>{o.getAllWindows().length===0&&t()});