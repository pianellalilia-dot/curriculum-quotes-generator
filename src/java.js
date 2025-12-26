function displayQuote(response) {
  new Typewriter("#generated-quote", {
    strings: response.data.answer,
    autoStart: true,
    delay: 40,
    cursor: "",
  });
}

function generateQuote(keyWords) {
  let context = `You are an expert in creating CV-ready quotes from keywords. You must generate a quote that meaningfully includes ALL provided keywords.`;
  let prompt = `KEYWORDS:${keyWords}. RULES (must follow): use ALL keywords exactly as written; each keyword must appear in the quote text; min length: 30 characters; max length: 300 characters; if any keyword is missing, regenerate internally until all are included. ATTRIBUTION RULES: Cite a real person only if certain. Otherwise use: inspired by Name or names, unknown if it is not known, or AI-generated. Never invent an attribution. Your answer should be formatted in this way: <p>"Quote text"<br/><em>— Name or inspired by Name</em></p>`;
  let apiKey = "90303e49ba1c9f82cb5tf7o1afec334c";
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;
  let generatedQuote = document.querySelector("#generated-quote");
  generatedQuote.innerHTML = "Thinking..";
  axios.get(apiUrl).then(displayQuote);
}

function handleInput(event) {
  event.preventDefault();
  let keyWords = document.querySelector("#input-key-words");
  generateQuote(keyWords.value);
}

let inputUser = document.querySelector("#input-user");
inputUser.addEventListener("submit", handleInput);
