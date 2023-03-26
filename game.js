const gameContainer = document.getElementById("game-container");

// Initialize game state
const generateTile = () => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    return tile;
};

const generateRow = () => {
    const row = [];
    for (let i = 0; i < 4; i++) {
        const tile = generateTile();
        row.push(tile);
        gameContainer.appendChild(tile);
    }
    return row;
};

const board = [];
for (let i = 0; i < 4; i++) {
    board.push(generateRow());
}

const spawnNumber = () => {
    let emptyTiles = [];
    
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (!board[row][col].textContent) {
                emptyTiles.push({row, col});
            }
        }
    }
    
    const randomEmptyTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    board[randomEmptyTile.row][randomEmptyTile.col].textContent = Math.random() > 0.5 ? "2" : "4";
};

spawnNumber();
spawnNumber();

// Add your game logic here
