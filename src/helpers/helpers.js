//generator helper which can return a non-repeating random number each time invoked
export default function* returnRandomNumberOnce(numbersArray) {
  let i = numbersArray.length;

  while (i--) {
    yield numbersArray.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
  }
}
