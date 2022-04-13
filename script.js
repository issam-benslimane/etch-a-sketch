function app(){
    "use strict"
    const colorInput = document.querySelector('input[type="color"]')
    const rangeInput = document.querySelector('input[type="range"]')
    const checkInput = document.querySelector('input[type="checkbox"]')
    const btns = document.querySelectorAll(".btn")
    const board = document.querySelector(".board")
    
    let currentColor = colorInput.value
    let mouseDown = false
    let activeBtn = [...btns].find(e=>e.matches(".btn--active"))
    
    renderBoard(board,rangeInput.value)
    initListeners()

    function changeColor(){
        currentColor = this.value
    }

    function changeGridSize(){
        const size = this.value
        const span = document.querySelector(".slider > span")
        renderBoard(board,size)
        span.innerText = `${size} x ${size}`
    }

    function toggleBorders(){
        board.classList.toggle("borders-shown")
    }

    function handleBtn(){
        if(activeBtn === this) return
        if(this.dataset.btn === "clear"){
            renderBoard(board,rangeInput.value)
            return
        }
        this.classList.add("btn--active")
        activeBtn.classList.remove("btn--active")
        activeBtn = this
    }


    function updateMouseState(ev){
        ev.type === "mousedown" ? mouseDown=true : mouseDown=false
        mouseDown && fillCell(ev.target,currentColor)
    }

    function handleSketch(ev){
        if(!mouseDown) return
        fillCell(ev.target,currentColor)
    }

    function renderBoard(grid,size){
        grid.innerHTML = ""
        grid.style.setProperty("--grid-size",size)
        for(let i=0;i<size*size;i++){
            const div = document.createElement("div")
            div.classList.add("border-br")
            i%size === 0 && div.classList.add("border-l")
            i<size && div.classList.add("border-t")
            grid.appendChild(div)
        }
    }

    function fillCell(target,color){
        if(activeBtn.dataset.btn === "color") target.style.backgroundColor = color
        if(activeBtn.dataset.btn === "rainbow") target.style.backgroundColor = getRandomClr()
        if(activeBtn.dataset.btn === "eraser") target.style.backgroundColor = "transparent"
    }

    function getRandomClr(){
        const [red,green,blue] = Array.from({length:3},()=>Math.floor(Math.random() * 255))
        return `rgb(${red},${green},${blue})`
    }


    function initListeners(){
        colorInput.addEventListener("input",changeColor)
        rangeInput.addEventListener("input",changeGridSize)
        checkInput.addEventListener("input",toggleBorders)
        board.addEventListener("mousedown",updateMouseState)
        board.addEventListener("mouseup",updateMouseState)
        board.addEventListener("mouseover",handleSketch)
        btns.forEach(btn=>btn.addEventListener("click",handleBtn))
    }
}

app()