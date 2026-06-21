# Ping Pong Game

A simple browser-based Pong game built with vanilla JavaScript and the HTML5 Canvas API. Control your paddle with the mouse and play against a computer-controlled opponent. First to 7 points wins!

## Features

- Mouse-controlled player paddle
- Computer-controlled opponent with basic tracking AI
- Ball physics with angle changes based on paddle hit position
- Score tracking displayed on canvas
- Win condition at 7 points (with alert popup)

## Files

```
.
├── index.html   # Game page / canvas setup
└── game.js      # Game logic
```

## How to Run

1. Clone or download this repository.
2. Make sure `index.html` and `game.js` are in the same folder.
3. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, etc.).
4. Move your mouse over the canvas to control the left (white) paddle.

No build steps, dependencies, or server required — it runs entirely client-side.

## Controls

| Action | Input |
|--------|-------|
| Move paddle | Move mouse up/down over the canvas |

## Game Rules

- The ball bounces off the top and bottom walls.
- If the ball hits a paddle, it bounces back with a new angle based on where it struck the paddle.
- If the ball passes a paddle, the opposing side scores a point.
- First player (you or the computer) to reach **7 points** wins, and an alert announces the winner.

## Possible Improvements

- Add a "Play Again" button instead of reloading the page
- Add difficulty levels for the computer paddle
- Add sound effects on paddle/wall hits
- Support keyboard controls (e.g., arrow keys / W-S keys)
- Add a pause/start menu

## License

Free to use and modify for personal or educational purposes.

