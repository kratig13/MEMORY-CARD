let cardsArray = [
    { 'name': 'image1', 'img': 'assests/shinchan1.jpeg' },
    { 'name': 'image2', 'img': 'assests/shinchan2.jpeg' },
    { 'name': 'image3', 'img': 'assests/shinchan3.jpeg' },
    { 'name': 'image4', 'img': 'assests/shinchan4.jpeg' },
    { 'name': 'image5', 'img': 'assests/shinchan5.jpeg' },
    { 'name': 'image6', 'img': 'assests/shinchan6.png' },
    { 'name': 'image7', 'img': 'assests/shinchan7.jpeg' },
    { 'name': 'image8', 'img': 'assests/shinchan8.png' },
    { 'name': 'image9', 'img': 'assests/shinchan9.jpeg' },
    { 'name': 'image10', 'img': 'assests/shinchan10.jpeg' },
    { 'name': 'image11', 'img': 'assests/shinchan11.jpeg' },
    { 'name': 'image12', 'img': 'assests/shinchan12.png' }
];

let nextLevelImg = [
    'assests/sticker5.jpeg',
    'assests/sticker6.png',
    'assests/sticker7.jpeg',
    'assests/sticker8.jpeg'
]
let gameOverImg = [
    'assests/sticker1.png',
    'assests/sticker2.png',
    'assests/sticker3.jpeg',
    'assests/sticker4.png'
]

let timer;
let timeRemaining;
let firstCard = '';
let secondCard = '';
let clickCount = 0;
let matches = 0;
let score = 0;
let level = 1;

const baseTimePerLevel = 90;
const parentDiv = document.querySelector('#card-section');

const startGame = () => {
    document.getElementById('game-over').style.display = 'none';
    score = 0;
    level = 1;
    startLevel();
};

const startLevel = () => {
    const cardSection = document.getElementById('card-section');
    cardSection.innerHTML = '';
    matches = 0;
    const gameCard = cardsArray.concat(cardsArray);
    let shuffledcards = shuffle(gameCard);
    createCards(shuffledcards);
    updateScore();
    startTimer(baseTimePerLevel - (level - 1) * 5);
};

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const createCards = (shuffledCards) => {
    shuffledCards.forEach(card => {
        const childDiv = document.createElement('div');
        childDiv.classList.add('card');
        childDiv.dataset.name = card.name;

        const frontDiv = document.createElement('div');
        frontDiv.classList.add('front-card');

        const backDiv = document.createElement('div');
        backDiv.classList.add('back-card');
        backDiv.style.backgroundImage = `url(${card.img})`;

        childDiv.appendChild(frontDiv);
        childDiv.appendChild(backDiv);
        parentDiv.appendChild(childDiv);
    });
};

const updateScore = () => {
    document.getElementById('current-score').innerText = score;
};

const startTimer = (seconds) => {
    timeRemaining = seconds;
    document.getElementById('time-remaining').innerText = timeRemaining;
    clearInterval(timer);
    timer = setInterval(() => {
        timeRemaining -= 1;
        document.getElementById('time-remaining').innerText = timeRemaining;
        if (timeRemaining <= 0) {
            endLevel(false);
        }
    }, 1000);
};

parentDiv.addEventListener('click', (event) => {
    const curCard = event.target;
    if (curCard.parentElement.classList.contains('card') && !curCard.parentElement.classList.contains('card_selected') && !curCard.parentElement.classList.contains('card_match')) {
        clickCount += 1;
        if (clickCount === 1) {
            firstCard = curCard.parentElement.dataset.name;
            curCard.parentElement.classList.add('card_selected');
        } else if (clickCount === 2) {
            secondCard = curCard.parentElement.dataset.name;
            curCard.parentElement.classList.add('card_selected');
            setTimeout(() => {
                checkMatch();
            }, 1000);
        }
    }
});

const checkMatch = () => {
    let selectedCards = document.querySelectorAll('.card_selected');
    if (firstCard === secondCard) {
        selectedCards.forEach(card => {
            card.classList.add('card_match');
            card.classList.remove('card_selected');
        });
        matches += 1;
        score += 10;
        updateScore();
        if (matches === cardsArray.length) {
            endLevel(true);
        }
    } else {
        selectedCards.forEach(card => {
            card.classList.remove('card_selected');
        });
    }
    resetCount();
};

const resetCount = () => {
    clickCount = 0;
    firstCard = '';
    secondCard = '';
};


function getRandomImage(imageUrls) {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
}

const endLevel = (win) => {
    clearInterval(timer);
    if (win) {
        const nextLevel = document.getElementById('next-level');
        const imgElements = document.querySelectorAll('img');

            imgElements.forEach(img => {
                img.src = getRandomImage(nextLevelImg);
            });
        nextLevel.style.display = 'block';
    } else {
        const imgElements = document.querySelectorAll('img');

            imgElements.forEach(img => {
                img.src = getRandomImage(gameOverImg);
            });
        document.getElementById('game-over').style.display = 'block';
    }
};

const nextLevel = () => {
    document.getElementById('next-level').style.display = 'none';
    level += 1;
    startLevel();
};

