let activeToolKey = null;

function setActiveTool(toolKey) {
    activeToolKey = activeToolKey === toolKey ? null : toolKey;
    updateToolButtonStates();
    updateToolCursorState();
}

function getActiveTool() {
    return activeToolKey;
}

function updateToolCursorState() {
    const body = document.body;

    body.classList.remove("tool-cursor--magnifier-active");

    if (activeToolKey === "magnifier") {
        body.classList.add("tool-cursor--magnifier-active");
    }
}

function updateToolButtonStates() {
    document.querySelectorAll(".toolbox-button").forEach(button => {
        const toolKey = button.getAttribute("data-tool-key");
        button.classList.toggle("toolbox-button--active", toolKey === activeToolKey);
    });
}

function renderToolboxUI() {
    const mount = document.getElementById("toolbox-ui");
    if (!mount) return;

    mount.innerHTML = "";

    Object.keys(toolRegistry).forEach(toolKey => {
        if (!isToolUnlocked(toolKey)) return;

        const tool = getToolDefinition(toolKey);
        if (!tool) return;

        const button = document.createElement("button");
        button.type = "button";
        button.className = "toolbox-button";
        button.setAttribute("data-tool-key", toolKey);
        button.setAttribute("aria-label", tool.description);

        button.innerHTML = `
            <img class="toolbox-button__icon" src="${tool.icon}" alt="${tool.name}">
        `;

        button.addEventListener("click", function () {
            setActiveTool(toolKey);
        });

        mount.appendChild(button);
    });

    updateToolButtonStates();
}