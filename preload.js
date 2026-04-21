const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('discordApi', {
    fetchMe: async (token) => {
        const res = await fetch('https://discord.com/api/v9/users/@me', { headers: { 'Authorization': token } });
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
    },
    fetchGuilds: async (token) => {
        const res = await fetch('https://discord.com/api/v9/users/@me/guilds', { headers: { 'Authorization': token } });
        return res.json();
    },
    fetchDMs: async (token) => {
        const res = await fetch('https://discord.com/api/v9/users/@me/channels', { headers: { 'Authorization': token } });
        return res.json();
    },
    fetchChannels: async (token, guildId) => {
        const res = await fetch(`https://discord.com/api/v9/guilds/${guildId}/channels`, { headers: { 'Authorization': token } });
        return res.json();
    },
    fetchMessages: async (token, channelId, beforeId) => {
        let url = `https://discord.com/api/v9/channels/${channelId}/messages?limit=100`;
        if (beforeId) url += `&before=${beforeId}`;
        const res = await fetch(url, { headers: { 'Authorization': token } });
        if (!res.ok) {
            let data = {};
            try { data = await res.json(); } catch(e) {}
            throw { status: res.status, response: { data } };
        }
        return res.json();
    },
    deleteMessage: async (token, channelId, messageId) => {
        const res = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages/${messageId}`, {
            method: 'DELETE',
            headers: { 'Authorization': token }
        });
        if (!res.ok && res.status !== 204) throw { status: res.status, response: { data: await res.json() } };
        return res;
    }
});

contextBridge.exposeInMainWorld('appControl', {
    quit: () => ipcRenderer.send('quit-app'),
    minimize: () => ipcRenderer.send('window-min'),
    maximize: () => ipcRenderer.send('window-max'),
    openLogin: () => ipcRenderer.send('open-login-window'),
    openExternal: (url) => ipcRenderer.send('open-external', url),
    onTokenCaptured: (callback) => ipcRenderer.on('token-captured', (event, token) => callback(token))
});
