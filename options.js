const colorListEl = document.querySelector("#color-list")
const colorListArr = JSON.parse(window.localStorage.getItem("colorList")) || []
colorListEl.value = colorListArr.toString()

function runCode(){
    // Get Values
    const ballCount = parseInt(document.querySelector("#ball-count").value)
    const speedCount = parseInt(document.querySelector("#speed-count").value)
    console.log(ballCount)
    // Validation
    // Ball Validation
    if(isNaN(ballCount)) return alert("Invalid character. Please insert a number")
    if(ballCount <= 0 || ballCount > 20) return alert("Please insert a number between 1 and 20")
    // Count Validation
    if(isNaN(speedCount)) return alert("Invalid character. Please insert a number")
    if(speedCount <= 0 || speedCount > 10) return alert("Please insert a number between 1 and 10")

    //Color List
    const colors = colorListEl.value.split(",")
        .map(color => color.trim())
        .filter(color => color[0] === "#" && color.length === 7)

    //Save to localstorage
    window.localStorage.setItem("ballCount", ballCount);
    window.localStorage.setItem("speedCount", speedCount);
    window.localStorage.setItem("colorList", colors.length >= 1 ? JSON.stringify(colors) : "");

    window.location.href = "./index.html"
}




document.querySelector("#runBtn").addEventListener("click", runCode);