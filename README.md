# electron-test-2

A simple electron app with react and typescript

### Setup

##### Step 1
Clone the repository then navigate to the project directory and run 
```
npm i
```
##### Step 2
Compile the src folder by running 
```
npm run build
```
This with generate a `ts-out` folder
##### Step 3
Start the Electron app with 
```
npm start
```

### Developing
When developing you'll want 2 terminals, one running Electron with `npm start`, the other running a webpack server with `npm run build:watch`. The `build:watch` script is the same as the regular build script but with the --watch flag for webpack so that `ts-out` is rebuilt on code change.
