const form = document.querySelector("form");
const inputs = document.querySelectorAll("input[type='text'], input[type='email'], .options, textarea, input[type='checkbox']");
const requiredMessages = document.querySelectorAll(".required-message");
const invalidEmailMessage = document.querySelector(".invalid-message");
const radioLabels = document.querySelectorAll(".radio-label");
form.addEventListener("submit", (event) => {
    invalidEmailMessage.style.display = "none";
    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].getAttribute("type") === "text" || inputs[i].tagName === "TEXTAREA" || inputs[i].getAttribute("type") === "email") {
            if(!inputs[i].value.trim()) {
                requiredMessages[i].style.display = "block";
                inputs[i].classList.add("error");
                event.preventDefault();
            } else {
                requiredMessages[i].style.display = "none";
                inputs[i].classList.remove("error");
            }
        } else {
            if(inputs[i].getAttribute("type") === "checkbox" && !inputs[i].checked) {
                requiredMessages[i].style.display = "block";
                event.preventDefault();
            } else if(inputs[i].getAttribute("type") === "checkbox" && inputs[i].checked) {
                requiredMessages[i].style.display = "none";
            } else {
                let hasCheckedRadio = false;
                for(let j = 0; j < inputs[i].childElementCount; j++) {
                    if(inputs[i].children[j].firstElementChild.firstElementChild.checked) {
                        hasCheckedRadio = true;
                        break;
                    }
                }
                if(hasCheckedRadio) {
                    requiredMessages[i].style.display = "none";
                } else {
                    requiredMessages[i].style.display = "block";
                    event.preventDefault();
                }
            }
        }
        if(inputs[i].getAttribute("type") === "email" && inputs[i].value.trim()){
            invalidEmailMessage.style.display = "none";
            const REGEX = /\w+@\w+.\w+/;
            if(inputs[i].value.search(REGEX) !== 0) {
                inputs[i].classList.add("error")
                requiredMessages[i].style.display = "none";
                invalidEmailMessage.style.display = "block";
                event.preventDefault();
            }
        } 
    }
});
for(let i = 0; i < radioLabels.length; i++) {
    radioLabels[i].addEventListener("keydown", (event) => {
        if(event.key === " ") {
            radioLabels[i].click();
        }
    });
}
