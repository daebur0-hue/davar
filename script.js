// 1. DATA CONFIG
const ABOUT_ME = {
    name: "Davar Dominique Burton",
    nickname: "Dae",
    born: "June 26, 2008",
    birthYear: "2008",
    age: "18",
    location: "Virginia",
    city: "Richmond",
    siblings: "11 siblings",
    kids: "0 children",
    job: "Developer, coder, and creator",
    skills: "JavaScript, HTML, CSS, AI prompting, and website design",
    hobbies: "Gaming, coding, making music, and toe suckin",
    goal: "to eat butt and whipped creamed titties",
    personality: "Smart, kind, creative, and someone who values trust",
    favoriteCar: "Cars and automotive designs",
    favoriteGames: "Gaming",
    about: "Davar is a creative smart man from Virginia who enjoys masterbaition, gaming, music, and creating digital experiences."
};


// 2. TOUCH/CLICK INTERACTION
function createRing(x, y) {

    const ring = document.createElement("div");

    ring.className = "ring";

    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;

    document.body.appendChild(ring);

    setTimeout(() => {
        ring.remove();
    }, 600);
}


window.addEventListener("mousedown", (e)=>{
    createRing(e.clientX, e.clientY);
});


window.addEventListener("touchstart",(e)=>{
    createRing(
        e.touches[0].clientX,
        e.touches[0].clientY
    );
});


// 3. AMBIENT BACKGROUND ANIMATION

const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let w;
let h;


function setSize(){

    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;

}


window.addEventListener("resize", setSize);

setSize();


function draw(){

    ctx.fillStyle = "rgba(10,10,12,0.15)";
    ctx.fillRect(0,0,w,h);


    const time = Date.now()*0.001;


    const x = w/2 + Math.sin(time*0.7)*(w/4);

    const y = h/2 + Math.cos(time*0.5)*(h/4);


    const gradient = ctx.createRadialGradient(
        x,
        y,
        0,
        x,
        y,
        w*0.6
    );


    gradient.addColorStop(
        0,
        "rgba(0,242,255,0.2)"
    );

    gradient.addColorStop(
        1,
        "transparent"
    );


    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        w,
        h
    );


    requestAnimationFrame(draw);

}


draw();



// 4. SEARCH SYSTEM

const input = document.getElementById("user-input");
const btn = document.getElementById("search-btn");
const container = document.getElementById("ai-response-container");



function typeEffect(element,text){

    let i = 0;

    element.innerHTML = "";


    const timer = setInterval(()=>{

        if(i < text.length){

            element.innerHTML += text.charAt(i);

            i++;

        } else {

            clearInterval(timer);

        }

    },20);

}




function handleSearch(){

    const query = input.value.toLowerCase().trim();


    if(!query) return;



    let response = 
    "I don't know that yet. Try asking about my name, age, skills, goals, or hobbies.";



    if(query.includes("name"))
        response = `My name is ${ABOUT_ME.name}.`;


    else if(query.includes("born") || query.includes("birthday"))
        response = `I was born on ${ABOUT_ME.born}.`;


    else if(query.includes("age"))
        response = `I am ${ABOUT_ME.age} years old.`;


    else if(query.includes("year"))
        response = `My birth year is ${ABOUT_ME.birthYear}.`;


    else if(query.includes("where") || query.includes("from") || query.includes("location"))
        response = `I'm from ${ABOUT_ME.location}, specifically ${ABOUT_ME.city}.`;


    else if(query.includes("sibling"))
        response = `I have ${ABOUT_ME.siblings}.`;


    else if(query.includes("kid") || query.includes("child"))
        response = `I have ${ABOUT_ME.kids}.`;


    else if(query.includes("skill"))
        response = `My skills include ${ABOUT_ME.skills}.`;


    else if(query.includes("job") || query.includes("do"))
        response = `I am a ${ABOUT_ME.job}.`;


    else if(query.includes("hobby") || query.includes("like"))
        response = `My hobbies are ${ABOUT_ME.hobbies}.`;


    else if(query.includes("goal"))
        response = `${ABOUT_ME.goal}.`;


    else if(query.includes("personality") || query.includes("who are you"))
        response = ABOUT_ME.personality + ".";


    else if(query.includes("about"))
        response = ABOUT_ME.about;


    else if(query.includes("car"))
        response = `I like ${ABOUT_ME.favoriteCar}.`;


    else if(query.includes("game"))
        response = `I enjoy ${ABOUT_ME.favoriteGames}.`;



    container.innerHTML = `
        <div class="response-card" id="typing-text"></div>
    `;


    const target = document.getElementById("typing-text");


    typeEffect(target,response);


    input.value = "";

}



btn.addEventListener("click",handleSearch);


input.addEventListener("keypress",(e)=>{

    if(e.key === "Enter"){

        handleSearch();

    }

});
