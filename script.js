const flame=document.querySelector(".flame");
const message=document.getElementById("message");

document.querySelector(".cake").onclick=()=>{

    flame.style.display="none";

    message.classList.add("show");

    // Aquí luego añadimos el confeti
}
