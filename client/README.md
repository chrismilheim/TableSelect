## REQUIREMENTS

```
Node version 14 - 16.15.0 LTS

```

## TO RUN THE PROJECT

```
 Node version 14 - 16.15.0 LTS

-Navigate to the /client folder in a terminal.
-Enter the command: npm install
-Enter the command: npm run start


Node version 18
-If on Node 18.0.0 use command: npm run node18Start

```

This should open a browser window to localhost:3000 automatically.
If it does not then you may have to open a browser and navigate there manually.
If your environment has another application running on port 3000 it will open under port 3001.

## TO RUN THE TESTS

```
-Navigate to the /client folder in a terminal.
-If you have not run npm install, please run: npm install.
-Enter the command: npm run test

```

All tests are in App.test.js

## PROJECT INFO

```
-This project was made with React.

-This project does NOT use any external CSS frameworks such as bootstrap, reactstrap, reactbootstrap, material, etc.

-Under /src/components/TableSelect is the reusable component for this project, the rest of the files are for React bootstrapping. TableSelect has everything it needs in /src/components/TableSelect and is fully contained and portable.

```

## PROJECT STRUCTURE

```
The React component structure for this project is as follows:

        App ---- React parent component
         |
     Dashboard ---- Demonstrates parent page feeding data to reusable component
         |
    TableSelect ---- The reusable component
```
