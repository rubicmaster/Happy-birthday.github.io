const cake = document.querySelector(".cake");
const flame = document.querySelector(".flame");
const message = document.getElementById("message");

cake.addEventListener("click", () => {
    flame.style.display = "none";
    message.classList.add("show");
});
