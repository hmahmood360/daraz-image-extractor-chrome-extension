
chrome.runtime.onMessage.addListener(function({action}){
  if(action === "EXTRACT_IMAGES"){
    const imageDiv = document.querySelector(".next-slick-list")
    const imageElements = imageDiv.querySelectorAll("img")
    const imgUrls = []
    imageElements.forEach((imgElement) => {
      const imgUrl = imgElement.src
      imgUrls.push(imgUrl)
    })
    chrome.runtime.sendMessage({action: "DISPLAY_IMAGES", imgUrls: imgUrls})
  }
})