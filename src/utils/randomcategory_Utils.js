export default function randomUtils (textArray) {
        let randomNumber = Math.floor(Math.random()*textArray.length);

        return textArray[randomNumber]
}