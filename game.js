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
                emptyTiles.push({ row, col });
            }
        }
    }

    const randomEmptyTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    board[randomEmptyTile.row][randomEmptyTile.col].textContent = Math.random() > 0.5 ? "2" : "4";
};

spawnNumber();
spawnNumber();

// Helper functions
const getTileValue = (tile) => parseInt(tile.textContent) || 0;

const setTileValue = (tile, value) => {
    tile.textContent = value || "";
    const colors = {
        2: "#f9f6f2",
        4: "#f8e5c1",
        8: "#f5b887",
        16: "#f89565",
        32: "#f67d62",
        64: "#f65e39",
        128: "#edcf73",
        256: "#edcc61",
        512: "#edc850",
        1024: "#edc53f",
        2048: "#edc22e"
    };
    tile.style.backgroundColor = value ? colors[value] : "#eee";
};

// Combine tiles in a row
const combineTiles = (row) => {
    const newRow = row.filter((tile) => getTileValue(tile) !== 0);
    for (let i = 1; i < newRow.length; i++) {
        if (getTileValue(newRow[i]) === getTileValue(newRow[i - 1])) {
            setTileValue(newRow[i], getTileValue(newRow[i]) * 2);
            setTileValue(newRow[i - 1], 0);
        }
    }
    return newRow.concat(row.filter((tile) => getTileValue(tile) === 0));
};

// Move tiles based on user input
const moveTiles = (direction) => {
    let moved = false;
    const oldBoardState = board.map((row) => row.slice()).flat();

    if (direction === "ArrowUp" || direction === "ArrowDown") {
        for (let col = 0; col < 4; col++) {
            let columnTiles = [];
            for (let row = 0; row < 4; row++) {
                columnTiles.push(board[row][col]);
            }

            const combinedTiles =
                direction === "ArrowUp"
                    ? combineTiles(columnTiles)
                    : combineTiles(columnTiles.reverse()).reverse();

            for (let row = 0; row < 4; row++) {
                setTileValue(board[row][col], getTileValue(combinedTiles[row]));
            }
        }
    } else if (direction === "ArrowLeft" || direction === "ArrowRight") {
        for (let row = 0; row < 4; row++) {
            const combinedTiles =
                direction === "ArrowLeft"
                    ? combineTiles(board[row])
                    : combineTiles(board[row].slice().reverse()).reverse();

            for (let col = 0; col < 4; col++) {
                setTileValue(board[row][col], getTileValue(combinedTiles[col]));
            }
        }
    }

    const newBoardState = board.flat();
    moved = !oldBoardState.every((tile, index) => getTileValue(tile) === getTileValue(newBoardState[index]));

    if (moved) {
        spawnNumber();
    }
};

// Listen for arrow key events
window.addEventListener("keydown", (event) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        moveTiles(event.key);
    }
});

// NEW: Listen for button click events
const moveButtons = document.querySelectorAll(".move-button");
for (const button of moveButtons) {
    button.addEventListener("click", event => {
        const direction = event.target.dataset.direction;
        moveTiles(direction);
    });
}
