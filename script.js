// 1. DATA CONFIG
const ABOUT_ME = {
    name: "Alex",
    job: "Aspiring Developer",
    skills: "JavaScript, HTML, CSS, and AI prompting",
    goal: "To build the coolest websites on the internet",
    hobbies: "Gaming, Coding, and Digital Art"
};

// 2. TOUCH/CLICK INTERACTION
function createRing(x, y) {
    const ring = document.createElement('div');
    ring.className = 'ring';
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    document.body.appendChild(ring);
    setTimeout(() => ring.remove(), 600);
}

window.addEventListener('mousedown', (e) => createRing(e.clientX, e.clientY));
window.addEventListener('touchstart', (e) => createRing(e.touches[0].clientX, e.touches[0].clientY));

// 3. AMBIENT BACKGROUND ANIMATION
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let w, h;

function setSize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', setSize);
setSize();

function draw() {
    ctx.fillStyle = 'rgba(10, 10, 12, 0.15)';
    ctx.fillRect(0, 0, w, h);
    
    const time = Date.now() * 0.001;
    const x = w/2 + Math.sin(time * 0.7) * (w/4);
    const y = h/2 + Math.cos(time * 0.5) * (h/4);

    const grad = ctx.createRadialGradient(x, y, 0, x, y, w * 0.6);
    grad.addColorStop(0, 'rgba(0, 242, 255, 0.2)');
    grad.addColorStop(1, 'transparent');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    requestAnimationFrame(draw);
}
draw();

// 4. SMART AI SEARCH LOGIC
const input = document.getElementById('user-input');
const btn = document.getElementById('search-btn');
const container = document.getElementById('ai-response-container');

function typeEffect(element, text) {
    let i = 0;
    element.innerHTML = "";
    const timer = setInterval(() => {
        if (i < text.length) {
            element.append(text.charAt(i));
            i++;
        } else {
            clearInterval(timer);
        }
    }, 20); // Speed of typing
}

function handleSearch() {
    const query = input.value.toLowerCase().trim();
    if (!query) return;

    let response = "I'm not sure about that. Try asking about my name, skills, or goals!";

    if(query.includes("name")) response = `My name is ${ABOUT_ME.name}. Nice to meet you!`;
    else if(query.includes("skill")) response = `I specialize in ${ABOUT_ME.skills}.`;
    else if(query.includes("job") || query.includes("do")) response = `I am currently an ${ABOUT_ME.job}.`;
    else if(query.includes("goal")) response = `My ultimate goal is ${ABOUT_ME.goal}.`;
    else if(query.includes("hobby") || query.includes("fun")) response = `In my free time, I love ${ABOUT_ME.hobbies}.`;

    // Create the card
    container.innerHTML = `<div class="response-card" id="typing-text"></div>`;
    const target = document.getElementById('typing-text');
    typeEffect(target, response);
    
    input.value = ""; // Clear input
}

btn.addEventListener('click', handleSearch);

// Allow pressing "Enter" key
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});
