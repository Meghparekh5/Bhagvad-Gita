const params = new URLSearchParams(window.location.search)
const chapterNo = params.get("ch") || 1

const breadcrumbNumber = document.getElementById("breadcrumbNumber")
const chapterHeading = document.getElementById("chapterHeading")
const chapterInfo = document.getElementById("chapterInfo")
const chapterDescription = document.getElementById("chapterDescription")
const versesContainer = document.getElementById("versesContainer")

fetch(`https://vedicscriptures.github.io/chapter/${chapterNo}`)
    .then(res => res.json())
    .then(data => {
        breadcrumbNumber.innerText = data.chapter_number
        chapterHeading.innerText = `Chapter ${data.chapter_number}: ${data.name}`
        chapterInfo.innerText = `${data.translation} · ${data.verses_count} Verses`
        chapterDescription.innerText = data.chapter_summary

        versesContainer.innerHTML = ""

        for (let i = 1; i <= data.verses_count; i++) {
            const verseBox = document.createElement("div")
            verseBox.innerText = i
            verseBox.onclick = () => loadVerse(chapterNo, i)
            versesContainer.appendChild(verseBox)
        }
    })

function loadVerse(ch, v) {
    fetch(`https://vedicscriptures.github.io/slok/${ch}/${v}`)
        .then(res => res.json())
        .then(d => {
            const englishText =
                d.tej?.et ||
                d.siva?.et ||
                d.chinmay?.et ||
                d.rams?.et ||
                "English translation not available."

            chapterDescription.innerHTML = `
                <h3>Verse ${v}</h3>
                <p><b>Sanskrit:</b><br>${d.slok}</p><br>
                <p><b>Hindi:</b><br>${d.tej?.ht || "Hindi not available."}</p><br>
                <p><b>English:</b><br>${englishText}</p>
            `
        })
}
