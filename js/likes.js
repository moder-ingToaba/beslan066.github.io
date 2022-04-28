/* Реализуем лайки на главной */

console.log('hello');

const aria = {
    label: {
        true: "Отправить реакцию «нравится»",
        false: "Отменить реакцию «нравится»"
    }
}

document.addEventListener("click", ({ target }) => {
    const likeBtn = target.closest(".likes")


    if (!likeBtn) return;
    likeBtn.ariaPressed = likeBtn.ariaPressed === "true" ? "false" : "true";
    likeBtn.ariaLabel = aria.label[likeBtn.ariaPressed];

    console.log(`Отправляю запрос, что кто-то лайкнул пост с id ${likeBtn.dataset.id}`)
        
    
})


document.addEventListener("click", ({ target }) => {
    const likeBtn = target.closest(".com-likes")


    if (!likeBtn) return;
    likeBtn.ariaPressed = likeBtn.ariaPressed === "true" ? "false" : "true";
    likeBtn.ariaLabel = aria.label[likeBtn.ariaPressed];

    console.log(`Отправляю запрос, что кто-то лайкнул пост с id ${likeBtn.dataset.id}`)
        
    
})