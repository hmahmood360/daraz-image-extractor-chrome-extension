
chrome.runtime.onMessage.addListener((message) => {
    if(message.action === "DOWNLOAD_IMAGES"){
        console.log('hello i am receiving message')
        imgsUrl = message.imagesUrl
        imgsUrl.forEach((url) => {
            chrome.downloads.download({url: url})
        })  
    }
})