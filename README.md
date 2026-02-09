# SurvivalFrontend
A lightweight, browser-based “survival” game frontend built with vanilla JavaScript, HTML, and CSS. Players perform actions (gather, hunt, rest, sail, craft, etc.), manage resources, and see the UI update via a simple state + render loop.

## Project Structure

``` text
SurvivalFrontend/
config/           # game tuning (resource definitions, action costs)
controllers/      # UI event wiring (actions, crafting)
logic/            # game rules (crafting costs, effects, gather/hunt/rest/sail, etc.)
render/           # DOM rendering
utils/            # helper utilities
index.html        # entry page
index.js          # app bootstrap
state.js          # app/game state
styles.css        # base styling
survivor.css      # additional styling
```

## Getting Started
### Prerequisites
A modern browser (Chrome / Firefox / Safari)

### Usage
Visit https://arnasrum.github.io and start playing!


## How It Works (high level)

    - state.js holds the current game and UI state (resources, selected crafting item, available tools, etc.)

    - controllers attach DOM handlers (button clicks, select changes)

    - logic computes outcomes (costs, gains, effects) render re-draws the UI based on the current state.

This keeps the codebase simple: user interaction → state change → render.
