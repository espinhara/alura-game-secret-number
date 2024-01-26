const max = 10;
let tryingCount = 1;
let secretNumber = getRandomNumber(max + 1);
function showHtmlText(selector, text) {
    document.querySelector(selector).innerHTML = text;
    responsiveVoice.speak(text, 'UK English Male', { rate: 1.2 });
}
function getRandomNumber(random) {
    let newSecretNumber = Math.floor(Math.random() * random);
    let secretNumbers = []
    if (localStorage.getItem('secretNumbers')) {
        secretNumbers = JSON.parse(localStorage.getItem('secretNumbers'))
        if (secretNumbers.includes(newSecretNumber) && secretNumbers.length < random) {
            return getRandomNumber(random)
        }
        else if (secretNumbers.length == random) {
            secretNumbers.splice(0, secretNumbers.length);
            secretNumbers.push(newSecretNumber)
            localStorage.setItem('secretNumbers', JSON.stringify(secretNumbers))
        } else {
            secretNumbers.push(newSecretNumber)
            localStorage.setItem('secretNumbers', JSON.stringify(secretNumbers))
        }
    } else {
        secretNumbers.push(newSecretNumber)
        localStorage.setItem('secretNumbers', JSON.stringify(secretNumbers))
    }
    return newSecretNumber
}
function restart() {
    window.location.reload()
}
function fieldClean() {
    document.querySelector('input.container__input').value = "";
}
function verifyAttempt() {
    const trying = document.querySelector('input.container__input').value;
    if (trying == secretNumber) {
        showHtmlText('h1', 'Successful! Congratulations!');
        showHtmlText(
            'p.texto__paragrafo',
            `The number secret is ${secretNumber} with ${tryingCount} ${tryingCount > 1 ? 'attempts' : 'attempt'}!
            You win!`
        );
        document.querySelector("button.container__botao").disabled = true;
        document.querySelector('#reiniciar').disabled = false;
    } else {
        if (trying > secretNumber) {
            showHtmlText('h1', "You're wrong! :(");
            showHtmlText('p.texto__paragrafo', `\n The number is smaller than ${trying}.`);
        } else {
            showHtmlText('h1', "You're wrong! :(");
            showHtmlText('p.texto__paragrafo', `\n The number is greater than ${trying}.`);
        }
        tryingCount++
        fieldClean()
    }
}
showHtmlText('h1', 'Game Secret Number');
showHtmlText('p.texto__paragrafo', `Chose number between 1 to ${max}`);
