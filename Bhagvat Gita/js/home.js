fetch("https://vedicscriptures.github.io/chapters")
    .then(res => res.json())
    .then(data => {
        const chapterSection = document.getElementById("chapterSection")

        data.forEach(ch => {
            const chapterBox = document.createElement("div")
            chapterBox.className = "chapter-card"

            chapterBox.innerHTML = `
                <h3>Chapter ${ch.chapter_number}</h3>
                <p>${ch.name}</p>
                <small>${ch.translation}</small>
            `

            chapterBox.onclick = () => {
                location.href = `chapter.html?ch=${ch.chapter_number}`
            }

            chapterSection.appendChild(chapterBox)
        })
    })
