// Icon: http://www.freepik.com

const uri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiCQUWLhnaUfxEAAABIUlEQVRIx82VMS8EURSFvzuZRCKRbEOiIioFiX9gCwrRKfRqvY7olGJLiUgk+qXR+AsilJpNbCMkNOyKxVG4RmLNm+VNwmnuPbn3nLw778178Ncw1RnNre7a1keqBda66s8sohDqn71a/7ajmsSOkCIst6oufpHlfe+jp8wzkmtw8oU/2XjmNcUpQGpHcSNEf4PeDSo5XJeBbax5z6zOJUlt58M61Iskabqnc+By6dH5xo/OgQaZ8PTW40xWvE9oBbQdALvh2Pm2x73M8CxlkqFcg4bHZVaoss+m8x0GWKLJqnV+v39lwTQWGKEY16YH+iMMWiZFyCnlX2hG6e9iF/APYJoLXGnFaJheA5dqMdpJlBySEt6Fg8DTVoyr2AXE4w03nsbeSBczywAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wOS0wNVQyMjo0NjoyNSswMjowMOHBq3YAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDktMDVUMjI6NDY6MjUrMDI6MDCQnBPKAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=='
const $ = (e) => document.querySelector(e)
const go = (s) => {
    const key = 'aHTLlRQEVuTh2bBfAQ64-74lvY7FB0i0iSElt2HwFtn8uIF4k-74KO3FBXnSF22C'
    const app = 'https://api.genius.com/search?q=' + encodeURI(s) + '&access_token=' + key
    return app
}
const lyrics = (n) => {
    fetch(n).then((e)=>e.json()).then((i)=>{
        const item = i.response.hits[0].result.url
        open(item)
    })
}

let wait = setInterval(() => {
    let exists = !!$('.now-playing') // bool if the "now playing" element exists
    if(exists) {
        clearInterval(wait)
        let btn = document.createElement('button')
        btn.className = 'control-button'
        btn.innerHTML = '<img src="' + uri + '">'
        btn.style = "positon: fixed; left: -8px; top: 8px;"
        $('body').appendChild(btn)
        btn.addEventListener('click', () => {
        let name = $('.track-info__name').textContent
        let artist = $('.track-info__artists span').textContent
        let trackName = (artist + " - " + name).replace(/ \(feat. .+\)/g, '')
        const url = go(trackName)
        lyrics(url)
        console.log(trackName)
        if($('.ads-container')) $('.ads-container').style.display = "none" // Also, hide the banner ad.
        })
    }
}, 250) // 4x per second
