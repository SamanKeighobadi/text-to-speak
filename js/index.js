const speech = speechSynthesis;

const form = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const rate = document.querySelector("#rate");
const rateInput = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchInput = document.querySelector("#pitch-value");
const voiceSelector = document.querySelector("#voice-select");

let voices = [];

const getVoices = () => {
  voices = speech.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");

    option.textContent = `${voice.name} (${voice.lang})`;

    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);
    voiceSelector.appendChild(option);
  });
};

getVoices();
if (speech.onvoiceschanged !== undefined) {
  speech.onvoiceschanged = getVoices;
}

const speak = () => {
  if (speech.speaking) {
    console.error("Already Speaking ...");
    return;
  }
  if (textInput.value) {
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    speakText.onend = (e) => {
      console.log("Done Speaking...");
    };

    speakText.onerror = (e) => {
      console.log("Something went Wrong");
    };

    // const selectedVoices =
    //   voiceSelector.selectedOptions[0].getAttribuite("data-name");

    // voices.forEach((voice) => {
    //   if (voice.name === selectedVoices) {
    //     speakText.voice = voice;
    //   }
    // });

    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    speech.speak(speakText);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  textInput.blur();
});

rate.addEventListener("change", (e) => (rateInput.textContent = rate.value));

pitch.addEventListener("change", (e) => (pitchInput.textContent = pitch.value));

voiceSelector.addEventListener('change',e => speak())