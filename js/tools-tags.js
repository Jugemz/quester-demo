function initializeToolTags() {
    const taggedElements = document.querySelectorAll("[data-tool-tag]");

    taggedElements.forEach(element => {
        element.addEventListener("mouseenter", function () {
            const activeTool = getActiveTool();
            const tag = element.getAttribute("data-tool-tag");

            if (activeTool === "magnifier" && isTagSupportedByTool(activeTool, tag)) {
                element.classList.add("tool-target--hover");
            }
        });

        element.addEventListener("mouseleave", function () {
            element.classList.remove("tool-target--hover");
        });

        element.addEventListener("click", function () {
            const activeTool = getActiveTool();
            const tag = element.getAttribute("data-tool-tag");

            if (!activeTool) return;
            if (!isTagSupportedByTool(activeTool, tag)) return;

            handleToolTagInteraction(activeTool, element);
        });
    });
}

function isTagSupportedByTool(toolKey, tag) {
    const tool = getToolDefinition(toolKey);
    if (!tool) return false;
    return tool.supportedTags.includes(tag);
}

function handleToolTagInteraction(toolKey, element) {
    if (toolKey !== "magnifier") return;

    const revealText = element.getAttribute("data-tool-reveal");
    const revealTargetSelector = element.getAttribute("data-tool-reveal-target");

    if (revealText) {
        showMagnifierPopup(revealText);
        return;
    }

    if (revealTargetSelector) {
        const target = document.querySelector(revealTargetSelector);
        if (target) {
            target.classList.add("tool-reveal--visible");
        }
    }
}

function showMagnifierPopup(text) {
    let popup = document.getElementById("magnifier-popup");

    if (!popup) {
        popup = document.createElement("div");
        popup.id = "magnifier-popup";
        popup.className = "magnifier-popup";
        document.body.appendChild(popup);
    }

    popup.textContent = text;
    popup.classList.add("magnifier-popup--visible");

    window.clearTimeout(showMagnifierPopup.hideTimer);
    showMagnifierPopup.hideTimer = window.setTimeout(() => {
        popup.classList.remove("magnifier-popup--visible");
    }, 2600);
}