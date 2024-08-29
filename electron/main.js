const dotenv = require('dotenv');
dotenv.config();
const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
	const win = new BrowserWindow({
		width: 900,
		height: 900,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	if (process.env.NODE_ENV === 'development') {
		win.loadURL(process.env.VITE_PORT);
	} else {
		win.loadFile(path.join(__dirname, '../dist/index.html'));
	}
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
