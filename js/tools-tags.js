function isTagSupportedByTool(toolKey, tag) {
    const tool = getToolDefinition(toolKey);
    if (!tool) return false;
    return tool.supportedTags.includes(tag);
}

function findTaggedElement(target) {
    if (!target || typeof target.closest !== "function") {
        return null;
    }

    return target.closest("[data-tool-tag]");
}

function updateHoverRevealState(element, shouldReveal) {
    const revealChildren = element.querySelectorAll(".tool-hover-reveal");

    revealChildren.forEach(child => {
        child.classList.toggle("tool-hover-reveal--visible", shouldReveal);
    });
}

function handleToolTagInteraction(toolKey, element) {
    if (toolKey !== "magnifier") return;

    const revealText = element.getAttribute("data-tool-reveal");
    const revealTargetSelector = element.getAttribute("data-tool-reveal-target");

    if (revealText) {
        showMagnifierPopup(revealText);
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
        document.querySelector(".site-container")?.appendChild(popup) || document.body.appendChild(popup);
    }

    popup.textContent = text;
    popup.classList.add("magnifier-popup--visible");

    window.clearTimeout(showMagnifierPopup.hideTimer);
    showMagnifierPopup.hideTimer = window.setTimeout(() => {
        popup.classList.remove("magnifier-popup--visible");
    }, 2600);
}

function initializeToolTags() {
    document.addEventListener("mouseover", function (event) {
        const element = findTaggedElement(event.target);
        if (!element) return;

        const activeTool = getActiveTool();
        const tag = element.getAttribute("data-tool-tag");
        const isMatch = activeTool && isTagSupportedByTool(activeTool, tag);

        element.classList.toggle("tool-target--hover", Boolean(isMatch));
        updateHoverRevealState(element, Boolean(isMatch));
    });

    document.addEventListener("mouseout", function (event) {
        const element = findTaggedElement(event.target);
        if (!element) return;

        const related = event.relatedTarget;
        if (related && element.contains(related)) {
            return;
        }

        element.classList.remove("tool-target--hover");
        updateHoverRevealState(element, false);
    });

    document.addEventListener("click", function (event) {
        const element = findTaggedElement(event.target);
        if (!element) return;

        const activeTool = getActiveTool();
        const tag = element.getAttribute("data-tool-tag");

        if (!activeTool) return;
        if (!isTagSupportedByTool(activeTool, tag)) return;

        event.preventDefault();
        handleToolTagInteraction(activeTool, element);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initializeToolTags();
});