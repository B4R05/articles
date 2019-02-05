export default function* returnRandomNumberOnce(numbersArray) {
  var i = numbersArray.length;

  while (i--) {
    yield numbersArray.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
  }
}
