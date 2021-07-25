const speech = speechSynthesis;

//* Select DOM Elemetn
const form = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const rate = document.querySelector("#rate");
const rateInput = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchInput = document.querySelector("#pitch-value");
const voiceSelector = document.querySelector("#voice-select");

//* Get Voices
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

//* Speak function
const speak = () => {
  if (speech.speaking) {
    console.error("Already Speaking ...");
    return;
  }
  if (textInput.value) {
    const speakText = new SpeechSynthesisUtterance(textInput.value);

    //* handle Unexpected Errors
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
    //* Set Rate and Pitch
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    //* start speak
    speech.speak(speakText);
  }
};

//! Event Listener

//* submit form and preventDefault
form.addEventListener("submit", (e) => {
  e.preventDefault();
  speak();
  textInput.blur();
});

//* Set change Rate
rate.addEventListener("change", (e) => (rateInput.textContent = rate.value));
//* Set change Pitch
pitch.addEventListener("change", (e) => (pitchInput.textContent = pitch.value));
//* Set Change Speak
voiceSelector.addEventListener('change',e => speak())