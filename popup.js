
const extractButton = document.getElementById("extract-images");
const downloadButton = document.getElementById("downloadButton")
const imgContainer = document.getElementById("imageContainer")
const notOnDaraz = document.getElementById("not-on-daraz")

notOnDaraz.style.display ="none"
downloadButton.style.display = "none"

document.addEventListener("click", ()=>{ 
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const currentTabUrl = new URL(tabs[0].url)
        if (currentTabUrl.hostname === "www.daraz.pk" && currentTabUrl.pathname.startsWith("/products")){
            chrome.tabs.sendMessage(tabs[0].id, {action: "EXTRACT_IMAGES"} )
        }else{
            notOnDaraz.style.display = "block"
        }
    })
})

chrome.runtime.onMessage.addListener((message)=>{
    if(message.action === "DISPLAY_IMAGES"){
        const imageUrls = message.imgUrls
        if(imageUrls.length > 0){
            imgContainer.innerHTML = ""
            imageUrls.forEach((imgUrl) => {
                const imgElement = document.createElement("img")
                imgElement.src = imgUrl
                imgElement.style.width = "50px"
                imgElement.style.height= "auto"
                imgContainer.appendChild(imgElement)
            })
            downloadButton.style.display = "inline"
        } else {
            const noImage = document.createElement('p')
            noImage.innerHTML = "No image found"
            imgContainer.appendChild(noImage); 
        }
        
    }
})

downloadButton.addEventListener("click", () => {
    const imageDiv = document.getElementById("imageContainer")
    const imgs = imageDiv.querySelectorAll("img")
    const imgsUrl = []
    imgs.forEach((img) => {
        imgsUrl.push(img.src)
    })

    if(imgsUrl.length > 0){
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id ,{action: "DOWNLOAD_IMAGES", imagesUrl: imgsUrl})
        } )
    }
})