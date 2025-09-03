const userMessage = [
  ["hi", "hey", "hello", "hi there", "hey there"],
  ["what is blockchain", "explain blockchain", "blockchain technology"],
  ["what is cryptocurrency", "what is crypto", "explain crypto", "what are cryptocurrencies"],
  ["how to invest in crypto", "crypto investment", "investing in cryptocurrency"],
  ["is crypto safe", "crypto risks", "safety of cryptocurrency"],
  ["best cryptocurrencies", "top crypto", "which crypto to invest"],
  ["bitcoin price", "crypto prices", "current crypto price"],
  ["blockchain use cases", "blockchain applications", "uses of blockchain"],
  ["how to buy crypto", "buy cryptocurrency", "purchase bitcoin"],
  ["crypto wallet", "what is a crypto wallet", "best wallet for crypto"],
  ["what is defi", "decentralized finance", "explain defi"],
  ["nft", "what are nfts", "non-fungible tokens"],
  ["crypto scam", "avoid crypto scams", "scam prevention"],
  ["who are you", "what are you", "tell me about yourself"],
  ["bye", "goodbye", "take care"],
];

const botReply = [
  ["Hello! I'm here to help with your blockchain and crypto questions! 😊", "Hey! Ready to dive into crypto? 🚀"],
  ["Blockchain is a decentralized, secure ledger that records transactions across a network of computers. It’s the tech behind cryptocurrencies like Bitcoin!", "Think of blockchain as a digital chain of blocks, each storing data that’s verified by a network, making it transparent and tamper-proof."],
  ["Cryptocurrencies are digital or virtual currencies that use cryptography for security and operate on blockchains. Bitcoin and Ethereum are examples!", "Crypto is money that exists only digitally, secured by blockchain tech, and not controlled by any central authority."],
  ["To invest in crypto, research coins, choose a reputable exchange (like Coinbase or Binance), set up a wallet, and start small. Always diversify and understand the risks!", "Crypto investing involves buying digital assets via exchanges. Be cautious, do your research, and never invest more than you can afford to lose."],
  ["Crypto can be safe but comes with risks like volatility, scams, and regulatory changes. Use secure wallets and trusted platforms to minimize risks.", "Safety depends on your precautions: use two-factor authentication, cold storage, and avoid sharing private keys."],
  ["Top cryptocurrencies in 2025 include Bitcoin, Ethereum, and Solana, based on market cap and adoption. Always check current trends before investing!", "Popular coins vary, but Bitcoin and Ethereum are often recommended for beginners due to their stability and widespread use."],
  ["I can’t fetch real-time Bitcoin prices, but you can check exchanges like Coinbase or apps like CoinGecko for up-to-date data.", "Crypto prices fluctuate often. Visit a trusted platform like Binance or Kraken for the latest prices."],
  ["Blockchain is used in finance (DeFi), supply chain tracking, healthcare, and more, thanks to its transparency and security.", "Beyond crypto, blockchain powers smart contracts, digital identity verification, and even voting systems!"],
  ["To buy crypto, sign up on an exchange like Coinbase, verify your identity, deposit funds, and purchase your chosen coin. Secure it in a wallet!", "Use platforms like Binance or Kraken to buy crypto with fiat or other coins. Always double-check transaction details."],
  ["A crypto wallet stores your private keys to access your cryptocurrencies. Hardware wallets like Ledger or software wallets like MetaMask are popular.", "Wallets come in hot (online) and cold (offline) types. For security, consider a hardware wallet for long-term storage."],
  ["DeFi, or decentralized finance, uses blockchain to offer financial services like lending or trading without banks. Examples include Uniswap and Aave.", "DeFi lets you earn interest or borrow crypto directly on the blockchain, but it’s complex and risky!"],
  ["NFTs are unique digital assets on a blockchain, often used for art, collectibles, or gaming. They prove ownership and can’t be duplicated.", "Non-fungible tokens (NFTs) are one-of-a-kind digital items. Think digital art or virtual real estate!"],
  ["To avoid crypto scams, never share private keys, use reputable exchanges, and beware of ‘too good to be true’ offers.", "Scams are common in crypto. Verify projects, avoid phishing links, and use multi-signature wallets for added security."],
  ["I’m Grok, a bot by xAI, here to answer your blockchain and crypto questions with clarity and a touch of humor! 😄", "I’m a friendly AI designed to guide you through the wild world of crypto and blockchain!"],
  ["Goodbye! Stay safe in the crypto world! 👋", "Take care, and happy investing! 😊"],
];

const alternative = [
  "Not sure about that. Ask me something about blockchain or crypto! ❓",
  "Hmm, let’s talk crypto—try asking about Bitcoin, DeFi, or NFTs! 🤔",
  "I’m here to help with crypto questions. What’s on your mind? 🚀",
  "For more help, contact support at: <a href='https://x.ai/grok' target='_blank' rel='noopener'>x.ai/grok</a>",
];

// Ensure array lengths match
if (botReply.length !== userMessage.length) {
  console.error("Error: userMessage and botReply arrays must have the same length.");
}

// Optimized common words Set
const commonWords = new Set([
  'why', 'who', 'how', 'what', 'please', 'a', 'an', 'the', 'is', 'are', 'am', 'i',
  'you', 'he', 'she', 'we', 'they', 'it', 'and', 'but', 'or', 'not', 'in', 'on',
  'your', 'my', 'their', 'his', 'her', 'its', 'our', 'with', 'without', 'at', 'by',
]);

function cleanInput(input) {
  return input
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, " ")
    .replace(/whats/g, "what is")
    .replace(/please/g, "")
    .trim();
}

function calculateSimilarity(str1, str2) {
  const len1 = str1.length, len2 = str2.length;
  const short = Math.min(len1, len2);
  const long = Math.max(len1, len2);
  let matches = 0;
  for (let i = 0; i < short; i++) {
    if (str1[i] === str2[i]) matches++;
  }
  return matches / long;
}

function findResponse(input) {
  const text = cleanInput(input);
  const SIMILARITY_THRESHOLD = 0.6;

  // Direct match check
  for (let i = 0; i < userMessage.length; i++) {
    if (userMessage[i].some(msg => text.includes(msg.toLowerCase()))) {
      return botReply[i][Math.floor(Math.random() * botReply[i].length)];
    }
  }

  // Similarity check
  for (let i = 0; i < userMessage.length; i++) {
    for (const msg of userMessage[i]) {
      if (calculateSimilarity(text, msg) >= SIMILARITY_THRESHOLD) {
        return botReply[i][Math.floor(Math.random() * botReply[i].length)];
      }
    }
  }

  // Keyword check
  const words = text.split(" ");
  for (const word of words) {
    if (commonWords.has(word)) continue;
    for (let i = 0; i < userMessage.length; i++) {
      if (userMessage[i].some(msg => msg.includes(word))) {
        return botReply[i][Math.floor(Math.random() * botReply[i].length)];
      }
    }
  }

  return alternative[Math.floor(Math.random() * alternative.length)];
}

function sendMessage() {
  const inputField = document.getElementById("user-input");
  const input = inputField.value.trim();
  if (!input) return;
  addChat(input, findResponse(input));
  inputField.value = "";
}

function addChat(input, response) {
  const mainDiv = document.getElementById("message-section");
  const inputField = document.getElementById("user-input");
  const quickMessageButtons = document.querySelectorAll(".quickmessage");

  // User message
  const userDiv = document.createElement("div");
  userDiv.classList.add("message", "user");
  userDiv.setAttribute("role", "alert");
  userDiv.innerHTML = `<span>${input}</span>`;
  mainDiv.appendChild(userDiv);

  // Bot message
  const botDiv = document.createElement("div");
  botDiv.classList.add("message", "bot", "typing-animation");
  botDiv.setAttribute("role", "alert");
  botDiv.innerHTML = `<span>Typing...</span>`;
  mainDiv.appendChild(botDiv);

  // Scroll to bottom
  mainDiv.scrollTop = mainDiv.scrollHeight;
  inputField.disabled = true;
  quickMessageButtons.forEach(button => (button.disabled = true));

  setTimeout(() => {
    botDiv.classList.remove("typing-animation");
    botDiv.innerHTML = `<span>${response}</span>`;
    mainDiv.scrollTop = mainDiv.scrollHeight;
    inputField.disabled = false;
    quickMessageButtons.forEach(button => (button.disabled = false));
    inputField.focus();
  }, 1000); // Reduced for faster UX
}

// Theme toggle
function toggleTheme() {
  const root = document.documentElement;
  const theme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  document.querySelector(".theme-icon").textContent = theme === "dark" ? "☀️" : "🌙";
}

document.addEventListener("DOMContentLoaded", () => {
  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", savedTheme);
  document.querySelector(".theme-icon").textContent = savedTheme === "dark" ? "☀️" : "🌙";

  // Event listeners
  document.getElementById("user-input").addEventListener("keydown", (e) => {
    if (e.code === "Enter") sendMessage();
  });
  document.querySelector(".send-button").addEventListener("click", sendMessage);
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
  document.querySelectorAll(".quickmessage").forEach(button => {
    button.addEventListener("click", () => {
      const input = button.getAttribute("data-message");
      if (input) addChat(input, findResponse(input));
    });
  });
});