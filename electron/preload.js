const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        send: (channel, ...args) => {
            const validChannels = [
                'minimize-window',
                'maximize-window',
                'close-window',
                'show-notification',
                'start-focus',
                'start-break',
                'install-update'
            ];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, ...args);
            }
        },
        on: (channel, func) => {
            const validChannels = [
                'update-available',
                'update-downloaded'
            ];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
        once: (channel, func) => {
            const validChannels = [
                'update-available',
                'update-downloaded'
            ];
            if (validChannels.includes(channel)) {
                ipcRenderer.once(channel, (event, ...args) => func(...args));
            }
        }
    }
});