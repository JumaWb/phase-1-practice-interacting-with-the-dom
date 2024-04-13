"use strict";

// Variables
let playing = true;
let interval;

// Functions
function timer() {
    return setInterval(function() {
        const counter = document.getElementById("counter");
        let count = parseInt(counter.innerText);
        counter.innerText = count + 1;
    }, 1000);
}

function updateCounter(value) {
    const counter = document.getElementById("counter");
    counter.innerText = parseInt(counter.innerText) + value;
}

function updateLikes() {
    const counter = document.getElementById("counter");
    const count = parseInt(counter.innerText);
    const likesList = document.querySelector(".likes");
    const existingLike = [...likesList.children].find(like => parseInt(like.dataset.num) === count);

    if (existingLike) {
        const likeCount = parseInt(existingLike.children[0].innerText);
        existingLike.innerHTML = count + " has been liked <span>" + (likeCount + 1) + "</span> times";
    } else {
        const newLike = document.createElement("li");
        newLike.setAttribute("data-num", count);
        newLike.innerHTML = count + " has been liked <span>1</span> time";
        likesList.appendChild(newLike);
    }
}

function togglePause() {
    if (playing) {
        playing = false;
        clearInterval(interval);
        pause.innerText = "resume";
    } else {
        playing = true;
        interval = timer();
        pause.innerText = "pause";
    }

    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        if (button.id !== "pause") {
            button.disabled = !playing;
        }
    });
}

// Event Listeners
document.getElementById("minus").addEventListener("click", () => updateCounter(-1));
document.getElementById("plus").addEventListener("click", () => updateCounter(1));
document.getElementById("heart").addEventListener("click", updateLikes);
document.getElementById("pause").addEventListener("click", togglePause);
document.getElementsByTagName("form")[0].addEventListener("submit", function(event) {
    event.preventDefault();
    const commentInput = this.children[0];
    const commentText = commentInput.value;
    commentInput.value = "";
    const commentsSection = document.querySelector(".comments");
    const newComment = document.createElement("p");
    newComment.innerText = commentText;
    commentsSection.appendChild(newComment);
});

// Initialize
interval = timer();
