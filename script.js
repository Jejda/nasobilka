let player = {
    name: "",
    lives: 3,
    score: 0
};

let currentStep = 0;
let chosenPath = 0;
let correctAnswer;
let correctAnswersInFight = 0;
let usedQuestions = [];

const story = [
    "Království Jitřní je v chaosu, Sir Jindro! Tvá kamarádka Lenka zmizela a na jejím stole zůstala zpráva od Zlého matematikáře. Vítr šeptá, že ji odvlekli do Pythagorových hor. Popadni svůj meč a zachraň ji – tvá násobilka je jedinou zbraní proti jeho číselné magii!",
    "Opouštíš vesnici a po úzké stezce dorazíš k mlžnému údolí. Před tebou stojí Strážce hranic, obrovský rytíř v brnění pokrytém čísly, s mečem tvořeným řadou dvojek. 'Já jsem Strážce, hlídač matematikářovy říše! Tvá cesta končí tady, pokud neovládáš násobení. Připrav se na souboj!'",
    "Strážce padá na kolena a zašeptá: 'Tvá čísla jsou silná… Lenka je v hradu v Pythagorových horách. Ale varuji tě – čekají tě temné bažiny a pláně plné příšer!'",
    "Překročil jsi mlžné údolí a tvé boty se začínají bořit do měkké, vlhké půdy. Kolem se vine hustá mlha a ozývá se šum vody – blížíš se k Derivačním bažinám. U cesty stojí malý stánek s nápisem 'Obchůdek'. Za 100 bodů odvahy si můžeš koupit jeden život – chceš nakoupit, nebo jít dál?",
    "Z vody vyskočí Stará ropucha, obří žába s bradavicemi ve tvaru čísel. 'Ribbit! Já jsem Ropucha číselného chaosu! Přišel jsi zachránit tu nešikovnou Lenku? Desetkrát mě zasáhni, nebo tě utopím v bažině!'",
    "Ropucha zakvičí a potopí se zpět do vody: 'Ribbit… Tvůj mozek je příliš rychlý…' Před tebou se otevírá stezka vedoucí z bažin ven.",
    "Po dlouhém brodění bažinou konečně cítíš pevnou půdu pod nohama. Krajina se mění v bílou, prašnou pláň – jsi na Křídových pláních. U stezky stojí 'Obchůdek'. Za 100 bodů odvahy si můžeš koupit jeden život – pokračovat, nebo nakoupit?",
    "Z prachu se zjeví Prvočíselný vlk, jehož tělo tvoří čísla 2, 3, 5 a 7. 'Já jsem Vlk prvočísel! Moje čísla jsou nerozdělitelná. Desetkrát mě zasáhni, nebo tě rozsápám!'",
    "Vlk zavyje a rozpadne se na prach. Vítr ti do uší шеptá, že další nebezpečí je blízko.",
    "Kráčíš dál přes Křídové pláně, když nad tebou začne kroužit stín. Obloha zčerná a ozve se pronikavý skřek. Na kraji cesty stojí 'Obchůdek' – za 100 bodů odvahy jeden život. Co uděláš?",
    "Z oblohy se snese Prvočíselný orel s křídly z čísel 11 a 13. 'Já jsem Orel nebe! Vlk selhal, ale já tě srazím dolů! Deset zásahů, nebo tvá cesta končí!'",
    "Orel zakřičí a spadne do prachu. Na obzoru vidíš kouř stoupající z komína – blížíš se k hostinci.",
    "Po dlouhé cestě pláněmi dorazíš k hostinci 'U Počtáře', útulné chaloupě s vůní pečeného chleba. Hostinský tě přivítá: 'Vítej, rytíři! Najez se a odpočiň si.' U vchodu stojí 'Obchůdek' – za 100 bodů odvahy jeden život. Nakoupíš, nebo vstoupíš?",
    "Po večeři usínáš, ale v noci tě probudí chladný vítr – okenice se rozletí a vstoupí Zlomkový upír. 'Jsem Upír číselné temnoty! Desetkrát mě zasáhni, nebo tě rozložím na prvočísla!'",
    "Upír zasyčí a rozplyne se v mlze: 'Má čísla… selhala…' Ráno ti hostinský podá chleba a řekne: 'Pythagorovy hory jsou blízko. Vyber si cestu – Geometrickou rokli nebo Algebřické lesy.'",
    "Stojíš na rozcestí. Před tebou se rozprostírají dvě cesty: na východ strmá Geometrická rokle, na západ temné Algebřické lesy. Kterou si vybereš?",
    "Vstupuješ do Geometrické rokle. Kolem tebe se tyčí strmé stěny pokryté trojúhelníky a čtverci, vzduch je plný šepotu čísel. U skály stojí 'Obchůdek' – za 100 bodů odvahy jeden život. Nakoupit, nebo jít dál?",
    "Z mlhy se vynoří Trojúhelníkový titán, golem z kamenů a čísel. 'Já jsem Titán pevnosti! Moje trojúhelníky jsou nezničitelné. Deset zásahů, nebo tě pohřbím pod kamením!'",
    "Titán se zhroutí a cesta se otevře. V dálce vidíš vrcholky Pythagorových hor.",
    "Kráčíš Algebřickými lesy. Stromy šustí čísly a mezi větvemi se vine mlha, která ti šeptá zapomenuté vzorce. U stezky stojí 'Obchůdek' – za 100 bodů odvahy jeden život. Co zvolíš?",
    "Z mlhy vystoupí Rovnicový duch, přízrak s pláštěm z čísel. 'Já jsem Duch lesní temnoty! Moje čísla tě pohltí. Desetkrát mě zasáhni, nebo zůstaneš v mém stínu!'",
    "Duch zmizí a les se rozestoupí. Před tebou se tyčí Pythagorovy hory.",
    "Po dlouhém stoupání stojíš na úpatí Pythagorových hor. Skály kolem tebe jsou pokryty starými tabulkami a vítr nese ozvěnu špatných výpočtů. U cesty stojí 'Obchůdek' – za 100 bodů odvahy jeden život. Nakoupíš?",
    "Před hradem se zjeví Kružítko, kovový netvor s nohama jako kompas. 'Já jsem Kružítko, strážce hradu! Deset zásahů, nebo tě rozsekám!'",
    "Kružítko zaskřípe a rozpadne se: 'Moje čísla… selhala…' Brána hradu se otevírá.",
    "Procházíš temnými chodbami hradu, kde stěny zdobí popsané tabule a podlahu pokrývá křídový prach. Slyšíš vzdálený smích Zlého matematikáře. U dveří stojí poslední 'Obchůdek' – za 100 bodů odvahy jeden život. Co uděláš?",
    "Na trůnu sedí Zlý matematikář s kalkulačkou v ruce, Lenka je přivázaná vedle. 'Sir Jindro! Moje násobilka je neporazitelná. Desetkrát mě zasáhni, nebo vás pošlu do vězení špatných výsledků!'",
    "Kalkulačka exploduje, matematikář padne na kolena: 'Moje čísla… poražena!' Lenka tě objímá: 'Díky, Jindro! Pojďme domů!'"
];

const enemyImages = [
    "", "images/strazce.jpg", "", "", "images/ropucha.jpg", "", "", "images/vlk.jpg", "", "", "images/orel.jpg", "", "", "images/upir.jpg", "", "", "", "images/titan.jpg", "", "", "images/duch.jpg", "", "", "images/kruzitko.jpg", "", "", "images/matematikar.jpg", ""
];

// Přepínání obrazovek
function showMainMenu() {
    document.getElementById("main-menu").style.display = "block";
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("training-screen").style.display = "none";
}

function showGame() {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    document.getElementById("training-screen").style.display = "none";
}

function showTraining() {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("training-screen").style.display = "block";
    startTrainingApp();
}

// Hlavní hra
function startGame() {
    player.name = prompt("Jak se jmenuje tvůj rytíř?");
    document.getElementById("game-title-dynamic").innerText = `${player.name} Násobitel`;
    showGame();
    showStory();
}

function showStory() {
    document.getElementById("question-container").style.display = "none";
    document.getElementById("choice-container").style.display = "none";
    const imageElement = document.getElementById("enemy-image");
    if (currentStep < story.length) {
        let text = story[currentStep].replace("Sir Jindro", player.name);
        document.getElementById("story-text").innerText = text;
        if (enemyImages[currentStep]) {
            imageElement.src = enemyImages[currentStep];
            imageElement.style.display = "block";
        } else {
            imageElement.style.display = "none";
        }
        if (currentStep === 15) { // Rozcestí
            document.getElementById("continue-button").style.display = "none";
            document.getElementById("choice-container").style.display = "block";
            document.getElementById("choice1").innerText = "Geometrická rokle";
            document.getElementById("choice2").innerText = "Algebřické lesy";
        } else if ([3, 6, 9, 12, 16, 19, 22, 25].includes(currentStep)) { // Obchůdek
            document.getElementById("continue-button").style.display = "none";
            document.getElementById("choice-container").style.display = "block";
            document.getElementById("choice1").innerText = "Nakoupit život (100 bodů)";
            document.getElementById("choice2").innerText = "Pokračovat dál";
        } else {
            document.getElementById("continue-button").style.display = "block";
            document.getElementById("continue-button").onclick = nextStep;
        }
    } else {
        endGame(true);
    }
}

function nextStep() {
    document.getElementById("continue-button").style.display = "none";
    console.log("Next step called, currentStep:", currentStep);
    if ([1, 4, 7, 10, 13, 17, 20, 23, 26].includes(currentStep)) { // Souboje
        correctAnswersInFight = 0;
        showQuestion();
    } else {
        currentStep++;
        showStory();
    }
}

function choosePath(path) {
    document.getElementById("choice-container").style.display = "none";
    console.log("Choose path called, currentStep:", currentStep, "path:", path); // Ladící výpis
    if (currentStep === 15) { // Rozcestí
        currentStep = (path === 1) ? 16 : 19;
        showStory();
    } else { // Obchůdek
        if (path === 1 && player.score >= 100) { // Nákup
            player.score -= 100;
            player.lives++;
            document.getElementById("score").innerText = player.score;
            document.getElementById("lives").innerText = player.lives;
            document.getElementById("story-text").innerText = `${player.name} si koupil jeden život za 100 bodů odvahy. Cesta pokračuje!`;
            document.getElementById("continue-button").style.display = "block";
            document.getElementById("continue-button").onclick = () => {
                document.getElementById("continue-button").style.display = "none";
                currentStep++;
                showStory();
            };
        } else if (path === 1) { // Nedostatek bodů
            document.getElementById("story-text").innerText = "Nemáš dost bodů odvahy! Musíš pokračovat bez nákupu.";
            document.getElementById("continue-button").style.display = "block";
            document.getElementById("continue-button").onclick = () => {
                document.getElementById("continue-button").style.display = "none";
                currentStep++;
                showStory();
            };
        } else { // Pokračovat dál
            currentStep++;
            showStory();
        }
    }
}

function generateQuestion() {
    let maxNum = currentStep <= 6 ? 5 : currentStep <= 15 ? 10 : 12;
    let num1, num2, question;
    let attempts = 0;
    const maxAttempts = 100;
    do {
        num1 = Math.floor(Math.random() * (maxNum - 1)) + 2;
        num2 = Math.floor(Math.random() * (maxNum - 1)) + 2;
        question = `${num1} × ${num2}`;
        attempts++;
        if (attempts > maxAttempts) {
            usedQuestions = [];
            break;
        }
    } while (usedQuestions.includes(question));
    usedQuestions.push(question);
    correctAnswer = num1 * num2;

    const answers = [correctAnswer];
    while (answers.length < 3) {
        const wrongAnswer = correctAnswer + Math.floor(Math.random() * 10) - 5;
        if (!answers.includes(wrongAnswer) && wrongAnswer > 0) {
            answers.push(wrongAnswer);
        }
    }
    shuffleArray(answers);

    document.getElementById("question").innerText = `${num1} × ${num2} = ?`;
    document.getElementById("answer1").innerText = answers[0];
    document.getElementById("answer2").innerText = answers[1];
    document.getElementById("answer3").innerText = answers[2];
    document.getElementById("question-container").style.display = "block";
}

function showQuestion() {
    document.getElementById("continue-button").style.display = "none";
    document.getElementById("story-text").innerText = `Souboj pokračuje! Zbývá ${10 - correctAnswersInFight} příkladů.`;
    generateQuestion();
}

function checkAnswer(choice) {
    const selectedAnswer = parseInt(document.getElementById(`answer${choice}`).innerText);
    document.getElementById("question-container").style.display = "none";

    if (selectedAnswer === correctAnswer) {
        correctAnswersInFight++;
        player.score += 10;
        document.getElementById("score").innerText = player.score;
        if (correctAnswersInFight === 10) {
            document.getElementById("story-text").innerText = `${player.name} zasadil poslední zásah! Nepřítel je poražen.`;
            currentStep++;
            document.getElementById("continue-button").style.display = "block";
            document.getElementById("continue-button").onclick = nextStep;
        } else {
            showQuestion();
        }
    } else {
        player.lives--;
        document.getElementById("lives").innerText = player.lives;
        document.getElementById("story-text").innerText = `Špatně! Správný výsledek byl ${correctAnswer}. Nepřítel tě zasáhl a ztrácíš život. Zbývá ${10 - correctAnswersInFight} příkladů.`;
        if (player.lives > 0) {
            document.getElementById("continue-button").style.display = "block";
            document.getElementById("continue-button").onclick = () => {
                document.getElementById("continue-button").style.display = "none";
                showQuestion();
            };
        } else {
            endGame(false);
        }
    }
}

function endGame(won) {
    document.getElementById("continue-button").style.display = "none";
    document.getElementById("choice-container").style.display = "none";
    document.getElementById("enemy-image").style.display = "none";
    if (won) {
        document.getElementById("story-text").innerText = `Gratuluji, ${player.name}! Zachránil jsi Lenku a porazil Zlého matematikáře! Království Jitřní je v bezpečí.`;
    } else {
        document.getElementById("story-text").innerText = `${player.name}, tvá cesta končí. Temnota zvítězila a Lenka zůstává v zajetí.`;
    }
}

// Tréninková appka (Malá násobilka)
let trainingCorrectAnswer;
let allQuestions = [];
let currentQuestions = [];
let currentNum1, currentNum2, currentOperation;

function getSelectedOperations() {
    const multiply = document.getElementById("opMultiply").checked;
    const divide = document.getElementById("opDivide").checked;
    const selected = [];
    if (multiply) selected.push("multiply");
    if (divide) selected.push("divide");
    if (selected.length === 0) {
        document.getElementById("opMultiply").checked = true;
        selected.push("multiply");
    }
    return selected;
}

function getSelectedNumbers() {
    const selected = [];
    for (let i = 2; i <= 10; i++) {
        if (document.getElementById(`num${i}`).checked) {
            selected.push(i);
        }
    }
    return selected.length > 0 ? selected : [2];
}

function generateAllQuestions() {
    const selectedNumbers = getSelectedNumbers();
    const selectedOperations = getSelectedOperations();
    allQuestions = [];
    for (let num of selectedNumbers) {
        if (selectedOperations.includes("multiply")) {
            for (let num2 = 2; num2 <= 10; num2++) {
                allQuestions.push({ num1: num, num2: num2, operation: "multiply", answer: num * num2 });
            }
        }
        if (selectedOperations.includes("divide")) {
            for (let multiplier = 2; multiplier <= 10; multiplier++) {
                allQuestions.push({ num1: num * multiplier, num2: num, operation: "divide", answer: multiplier });
            }
        }
    }
    currentQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
}

function drawDotGrid(num1, num2, isDivision = false) {
    const dotGrid = document.getElementById("dot-grid");
    dotGrid.innerHTML = "";
    if (isDivision) {
        const groupSize = num2;
        const numGroups = num1 / num2;
        for (let i = 0; i < numGroups; i++) {
            let row = document.createElement("div");
            for (let j = 0; j < groupSize; j++) {
                let dot = document.createElement("span");
                dot.className = "dot";
                row.appendChild(dot);
            }
            dotGrid.appendChild(row);
        }
        let question = document.createElement("div");
        question.className = "skip-counting";
        question.textContent = "Tady je číslo rozložené na řady teček, kolik řad vidíš?";
        dotGrid.appendChild(question);
    } else {
        for (let i = 0; i < num2; i++) {
            let row = document.createElement("div");
            for (let j = 0; j < num1; j++) {
                let dot = document.createElement("span");
                dot.className = "dot";
                row.appendChild(dot);
            }
            dotGrid.appendChild(row);
        }
        let question = document.createElement("div");
        question.className = "skip-counting";
        question.textContent = "Tady je číslo rozložené na řady teček, kolik teček je celkem?";
        dotGrid.appendChild(question);
    }
}

function showSkipCounting(num1, num2, isDivision = false) {
    const dotGrid = document.getElementById("dot-grid");
    dotGrid.innerHTML = "";
    let skip = document.createElement("div");
    skip.className = "skip-counting";
    let sequence = [];
    if (isDivision) {
        for (let i = num1; i >= num2; i -= num2) {
            sequence.push(i);
        }
        skip.textContent = `${sequence.join(", ")} (Kolik je potřeba kroků?)`;
    } else {
        for (let i = 1; i < num1; i++) {
            sequence.push(num2 * i);
        }
        sequence.push("?");
        skip.textContent = `${sequence.join(", ")} (Zde je násobení rozepsáno po krocích, jaké je další číslo?)`;
    }
    dotGrid.appendChild(skip);
}

function generateTrainingQuestion() {
    if (currentQuestions.length === 0) {
        generateAllQuestions();
    }
    const question = currentQuestions.pop();
    currentNum1 = question.num1;
    currentNum2 = question.num2;
    currentOperation = question.operation;
    trainingCorrectAnswer = question.answer;
    const operator = currentOperation === "multiply" ? "×" : "÷";
    document.getElementById("question-part").textContent = `${currentNum1} ${operator} ${currentNum2} = `;
    document.getElementById("answer").value = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("dot-grid").innerHTML = "";
}

function ensureOneOperationChecked() {
    const multiply = document.getElementById("opMultiply");
    const divide = document.getElementById("opDivide");
    if (!multiply.checked && !divide.checked) {
        multiply.checked = true;
    }
    generateAllQuestions();
    generateTrainingQuestion();
}

function toggleAllNumbers() {
    const allChecked = document.getElementById("numAll").checked;
    for (let i = 2; i <= 10; i++) {
        document.getElementById(`num${i}`).checked = allChecked;
    }
    generateAllQuestions();
    generateTrainingQuestion();
}

function updateAllNumberCheckbox() {
    const allChecked = Array.from({length: 9}, (_, i) => i + 2)
        .every(i => document.getElementById(`num${i}`).checked);
    document.getElementById("numAll").checked = allChecked;
    generateAllQuestions();
    generateTrainingQuestion();
}

function checkTrainingAnswer() {
    const userAnswer = parseInt(document.getElementById("answer").value);
    const feedback = document.getElementById("feedback");
    if (isNaN(userAnswer)) {
        feedback.textContent = "Zadej číslo!";
        feedback.style.color = "#d4a017";
    } else if (userAnswer === trainingCorrectAnswer) {
        feedback.textContent = "Správně! Pojď na další.";
        feedback.style.color = "#006400";
        setTimeout(generateTrainingQuestion, 1000);
    } else {
        feedback.textContent = "Špatně, zde máš nápovědu";
        feedback.style.color = "#8b0000";
        const isDivision = currentOperation === "divide";
        if (currentNum1 <= 5 && currentNum2 <= 5 && !isDivision || 
            (isDivision && currentNum1 / currentNum2 <= 5 && currentNum2 <= 5)) {
            drawDotGrid(currentNum1, currentNum2, isDivision);
        } else {
            showSkipCounting(currentNum1, currentNum2, isDivision);
        }
    }
}

function startTrainingApp() {
    generateAllQuestions();
    generateTrainingQuestion();

    document.getElementById("submit").addEventListener("click", checkTrainingAnswer);
    document.getElementById("answer").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            checkTrainingAnswer();
        }
    });

    document.getElementById("opMultiply").addEventListener("change", ensureOneOperationChecked);
    document.getElementById("opDivide").addEventListener("change", ensureOneOperationChecked);
    document.getElementById("numAll").addEventListener("change", toggleAllNumbers);
    for (let i = 2; i <= 10; i++) {
        document.getElementById(`num${i}`).addEventListener("change", updateAllNumberCheckbox);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}