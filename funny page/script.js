let currentStep = 1;

window.onload = function() {
    const gameBoard = document.getElementById("gameBoard");
    if(gameBoard) {
        gameBoard.style.display = "grid";
    }
}

function registerClick() {
    if (currentStep <= 2) {
        currentStep++;
        if (currentStep === 3) {
            const t5 = document.getElementById("target5");
            if (t5) t5.style.display = "flex";
        }
    }
}

function showNextTarget(nextId, button, event) {
    if (event) event.stopPropagation();
    button.style.display = "none";
    
    const next = document.getElementById("target" + nextId);
    if (next) {
        next.style.display = "flex";
    }
}

function switchToTerminal() {
    const gameBoard = document.getElementById("gameBoard");
    const crashTerminal = document.getElementById("crashTerminal");
    const finalScreen = document.getElementById("finalScreen");

    gameBoard.style.display = "none";
    crashTerminal.style.display = "flex";

    setTimeout(() => { document.getElementById("step1").style.display = "block"; }, 1000);
    setTimeout(() => { document.getElementById("step2").style.display = "block"; }, 2200);
    setTimeout(() => { document.getElementById("step3").style.display = "block"; }, 3400);
    setTimeout(() => { document.getElementById("step4").style.display = "block"; }, 4600);
    setTimeout(() => { document.getElementById("step5").style.display = "block"; }, 5800);
    
    setTimeout(() => {
        crashTerminal.style.display = "none";
        if (finalScreen) {
            finalScreen.style.display = "flex";
        }
    }, 7500);
}
