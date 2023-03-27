let blocksContainer = document.querySelector(".memory-container-blocks");
let blocks = Array.from(blocksContainer.children);
let footer = document.querySelector(".footer");
let scourElement = document.querySelector(".scour span");
let scourElement2 = document.querySelector(".scour2 span");
let nameElement = document.querySelector(".name2 span");
let triesElement2 = document.querySelector(".tries2 span");
let seconds = 90;
let array = [];

footer.style.display="none"
document.querySelector(".control-buttons span").onclick = function () {
    let userName = prompt("What is your name?");
    let end = document.querySelector(".end");
    let timer = setInterval(function () {
        seconds--;
        end.innerHTML = seconds
        if (scourElement.innerHTML === "10") {
            seconds = 0;
            setTimeout(() => {
                window.location.reload()
            }, 5000)
        }
        if (seconds === 0) {
        end.innerHTML = "End Game"
        document.getElementById('round').play();
            blocksContainer.classList.add("clicking");
            saveTOlocalstorage()
            //  footer.style.display = "block"

            clearTimeout(timer);

            blocks.forEach((block) => {
                block.classList.add("is-flipped");
            });
    }
    }, 1000);

    blocks.forEach((block) => {
        block.classList.add("is-flipped")
        setTimeout(() => {
            block.classList.remove("is-flipped")
        }, 5000)
    });
    
    
    if (userName == null || userName == "") {
        document.querySelector(".name span").innerHTML = "Unknown";
        nameElement.innerHTML = "Unknown";
        document.getElementById('POL').play();
    } else {
        document.querySelector(".name span").innerHTML = userName;
        nameElement.innerHTML = userName;
        document.getElementById('POL').play();
    }
    document.querySelector(".control-buttons").remove();
};
let duraion = 1000;



let orderBlocks = [...Array(blocks.length).keys()];

shuffle(orderBlocks);

blocks.forEach((block, index) => {
    block.style.order = orderBlocks[index];
    // block.classList.add("is-flipped")
    // setTimeout(() => {
    //     block.classList.remove("is-flipped")
    // },5000)

    block.addEventListener('click', function () {
        flippedBlocks(block);

    })

});
function flippedBlocks(selectBlock) {
    selectBlock.classList.add("is-flipped");

    let allFlipped = blocks.filter(isFlipped => isFlipped.classList.contains('is-flipped'));

    if (allFlipped.length == 2) {
        // console.log("two flipped ");
        // Stop click

        stopclick();

        // has-match
        checkMatch(allFlipped[0], allFlipped[1]);
    }
    
    
}
function stopclick() {
    blocksContainer.classList.add('clicking');
    setTimeout(() => {
        blocksContainer.classList.remove("clicking");
    }, duraion);
}
function checkMatch(firstSelector, secondSelector) {
    
    let triesElement = document.querySelector(".tries span");

    if (firstSelector.dataset.tecnolage === secondSelector.dataset.tecnolage) {
        firstSelector.classList.remove("is-flipped");
        secondSelector.classList.remove("is-flipped");


        firstSelector.classList.add("has-match");
        secondSelector.classList.add("has-match");
        scourElement.innerHTML = parseInt(scourElement.innerHTML) + 1;
        scourElement2.innerHTML = parseInt(scourElement2.innerHTML) + 1;
        

        document.getElementById('Win').play();
        

    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        triesElement2.innerHTML = parseInt(triesElement2.innerHTML) + 1;

        setTimeout(() => {
            firstSelector.classList.remove("is-flipped");
            secondSelector.classList.remove("is-flipped");
        }, duraion);
        document.getElementById('death').play();

    }
    let allFlippedBlocks = blocks.filter(isFlipped => isFlipped.classList.contains('has-match'));
        if (allFlippedBlocks.length === 20) {
        document.getElementById('round').play();
    }
}

function shuffle(arr) {
    let current = arr.length,
        temp,
        random;

    while (current > 0) {
        random = Math.floor(Math.random() * current);

        current--;

        temp = arr[current];
        arr[current] = arr[random];
        arr[random] = temp;
    }
    return arr;
}

if (localStorage.getItem("game")) {
    array = JSON.parse(localStorage.getItem("game"));
} 
// localStorage.clear()
function saveTOlocalstorage() {
    let game = {
        name: nameElement.innerHTML,
        tries: triesElement2.innerHTML,
        scour: scourElement2.innerHTML,
    }
    array.push(game);
    localStorage.setItem("game", JSON.stringify(array));
}

// function save(arr){
//     nameElement.innerHTML=arr
//     triesElement2.innerHTML,
//     scourElement2.innerHTML,
// }