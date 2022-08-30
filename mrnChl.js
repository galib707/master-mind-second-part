var readlineSync = require("readline-sync");

const genNumber = () => {
  let a = [0, 0, 0, 0].map((item) => Math.floor(Math.random() * 4) + 1);
  return a;
};

function calcScore(a, b) {
  let res = {
    correctPos: 0,
    incorrectPos: 0,
  };

  let codeObj = {};

  for (let i = 0; i < a.length; i++) {
    if (!codeObj.hasOwnProperty(a[i])) {
      codeObj[a[i]] = 1;
    } else {
      codeObj[a[i]] += 1;
    }
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) {
      res.correctPos += 1;
    } else if (a[i] !== b[i] && codeObj.hasOwnProperty(b[i])) {
      res.incorrectPos += 1;
    }
  }

  return res;
}

function takeInput(a, step) {
  let option = readlineSync.question("Guess the 4-digit code:");
  let b = option
    .toString()
    .split("")
    .map((item) => Number(item));

  let count = step;

  if (option === "quit" || count === 10) {
    console.log("you lose, the correct input was", Number(a.join("")));
    return;
  } else {
    let res = calcScore(a, b);

    if (Number(res.correctPos) === 4) {
      console.log("Correct! You won!! ");
      return;
    }
    console.log(`${res.correctPos} matching digit(s) in the correct position`);
    console.log(
      `${res.incorrectPos} matching digit(s) in the incorrect position`
    );

    takeInput(a, (count += 1));
  }
}

function main() {
  let a = genNumber();
  takeInput(a, 0);
}

main();
