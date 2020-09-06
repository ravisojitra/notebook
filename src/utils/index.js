export const uuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

export const createNewNote = (title) => {
    const data = {
        timestamp: Math.floor(Date.now() / 1000),
        blocks: [{ type: "header", data: { text: title, level: 2 } }],
        version: "2.18.0",
    };

    return JSON.stringify(data);
};

export const applyTheme = (theme) => {
    Object.keys(theme).forEach((key) => {
        const value = theme[key];
        document.documentElement.style.setProperty(key, value);
    });
};
