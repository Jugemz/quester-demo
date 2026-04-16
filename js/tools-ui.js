let activeToolKey = null;

function getActiveTool() {
    return activeToolKey;
}

function setActiveTool(toolKey) {
    activeToolKey = activeToolKey === toolKey ? null : toolKey;
    updateToolButtonStates();
    updateToolCursorState();

    if (typeof refreshCurrentSceneToolState === "function") {
        refreshCurrentSceneToolState();
    }
}

function clearActiveTool() {
    activeToolKey = null;
    updateToolButtonStates();
    updateToolCursorState();
}

function updateToolCursorState() {
    document.body.classList.remove(
        "tool-cursor--magnifier-active",
        "magnifier-active"
    );

    if (activeToolKey === "magnifier") {
        document.body.classList.add(
            "tool-cursor--magnifier-active",
            "magnifier-active"
        );
    }
}

function updateToolButtonStates() {
    document.querySelectorAll(".toolbox-button").forEach(button => {
        const toolKey = button.getAttribute("data-tool-key");
        button.classList.toggle("toolbox-button--active", toolKey === activeToolKey);
    });
}

function showToolboxUI() {
    const mount = document.getElementById("toolbox-ui");
    if (!mount) return;

    mount.classList.remove("state-display-none");
}

function hideToolboxUI() {
    const mount = document.getElementById("toolbox-ui");
    if (!mount) return;

    mount.classList.add("state-display-none");
}

function renderToolboxUI() {
    const mount = document.getElementById("toolbox-ui");
    if (!mount) return;

    mount.innerHTML = "";

    const unlockedToolKeys = getUnlockedToolKeys();

    if (!unlockedToolKeys.length) {
        hideToolboxUI();
        return;
    }

    unlockedToolKeys.forEach(toolKey => {
        const tool = getToolDefinition(toolKey);
        if (!tool) return;

        const button = document.createElement("button");
        button.type = "button";
        button.className = "toolbox-button";
        button.setAttribute("data-tool-key", toolKey);
        button.setAttribute("aria-label", tool.description);
        button.title = tool.description;

        button.innerHTML = `
            <img class="toolbox-button__icon" src="${tool.icon}" alt="${tool.name}">
        `;

        button.addEventListener("click", function () {
            setActiveTool(toolKey);
        });

        mount.appendChild(button);
    });

    showToolboxUI();
    updateToolButtonStates();
}

document.addEventListener("DOMContentLoaded", function () {
    renderToolboxUI();
});