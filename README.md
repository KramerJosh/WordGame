# WordGame

## About
This is a wordle clone that was built using TDD and pushed to github with custom actions that track the tests successes/failures
I've added a bit where letters we know aren't in the word are disabled, which may make the game slightly more difficult
The live version of this site can be found here:
[Fair Use Word Guesser](https://main.d7odro9zxx2ys.amplifyapp.com/)

## Technology
This site was built with Vite and React, and uses a word list pulled from [Rommel's Github](https://github.com/axlrommel/wordle/blob/main/fiveLetterWords.js)
An earlier version used axios to pull from the github repository, but that was abondoned for simplicity.
We're using Jest for testing, and the logic in wordle.js was developed using TDD.  
The yaml files were provided by Rommel Villagomez and are used for github actions.  One runs spellcheck on push, the other runs tests.
The live site was deployed using AWS Amplify.


## Installation
Installation is straightforward - all you'll need do is clone the repo, and npm i, then npm run dev to test locally.
There are no .env files to worry about.