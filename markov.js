/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains.has(word)) {
        chains.get(word).push(nextWord);
      } else {
        chains.set(word, [nextWord]);
      }
    }

    this.chains = chains;
  }


  /** return random text from chains */

    makeText(numWords = 100) {
      let words = Array.from(this.chains.keys());
      let randomWord = words[Math.floor(Math.random() * words.length)];
      let text = [randomWord];

      while (text.length < numWords) {
        let nextWords = this.chains.get(randomWord);
        let nextWord = nextWords[Math.floor(Math.random() * nextWords.length)];
        text.push(nextWord);
        randomWord = nextWord;
      }

      return text.join(" ");
    }
  }

module.exports = {
  MarkovMachine,
};