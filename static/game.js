const gameBoard = document.getElementById("gameBoard");
const cards = ['🍎','🍌','🍇','🍉','🍒','🍋','🍍','🥝'];
let cardArray = [...cards, ...cards];
let flipped = [];
let matched = [];

cardArray.sort(() => 0.5 - Math.random());

cardArray.forEach((symbol) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;

    card.addEventListener("click", () => {
        if (flipped.length < 2 && !flipped.includes(card)) {
            card.textContent = card.dataset.symbol;
            flipped.push(card);

            if (flipped.length === 2) {
                if (flipped[0].dataset.symbol === flipped[1].dataset.symbol) {
                    matched.push(...flipped);
                    flipped = [];
                    if (matched.length === cardArray.length) {
                        alert("🎉 You won!");
                    }
                } else {
                    setTimeout(() => {
                        flipped.forEach(c => c.textContent = '');
                        flipped = [];
                    }, 800);
                }
            }
        }
    });

    gameBoard.appendChild(card);
});
