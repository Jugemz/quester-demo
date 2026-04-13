const toolRegistry = {
    magnifier: {
        id: "mg-tool",
        key: "magnifier",
        name: "magnifying-glass-tool",
        icon: "assets/toolbox/magnifying-glass.png",
        unlockKey: "magnifier",
        description: "Inspect hidden clue details.",
        usageType: "ingame-hover",
        supportedTags: ["mg-clue", "mg-reveal", "mg-detail"]
    }
};

function getClubhouseData() {
    try {
        const raw = localStorage.getItem("clubhouseData");
        return raw ? JSON.parse(raw) : null;
    } catch (error) {
        console.error("Could not parse clubhouseData:", error);
        return null;
    }
}

function isToolUnlocked(toolKey) {
    const clubhouseData = getClubhouseData();

    if (!clubhouseData || !clubhouseData.unlockedTools) {
        return false;
    }

    switch (toolKey) {
        case "magnifier":
            return Boolean(clubhouseData.unlockedTools.magnifierRevealed);
        default:
            return false;
    }
}

function getToolDefinition(toolKey) {
    return toolRegistry[toolKey] || null;
}