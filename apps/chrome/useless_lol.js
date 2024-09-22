document.getElementById('google-search').addEventListener('click', openUltraviolet)
document.getElementById('search-box').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        openUltraviolet();
    }
});

function openUltraviolet() {
    if (typeof Ultraviolet !== 'undefined') {
        const uv = new Ultraviolet();

        const url = document.querySelector('.search-box');

        const inputUrl = url.value
        if (inputUrl != "https://google.com/") {
            const xorEncoded = encodeURIComponent(inputUrl.toString().split('').map((char, ind) => 
                ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char
            ).join(''));
            let rewrittenUrl = uv.rewriteUrl(xorEncoded);

            rewrittenUrl = rewrittenUrl.replace(/%25/g, '%');

            rewrittenUrl = "https://doge-v4-jade.vercel.app" + rewrittenUrl
        }
        else {
            rewrittenUrl = "https://doge-v4-jade.vercel.app/service/hvtrs8%2F-wuw%2Cgmoelg.aoo%2F"
        }

        document.body.innerHTML = '<iframe id="ultraviolet-iframe" src="" style="margin: 0px; border: none; padding: 0px; width: 100%; height: 100%;"></iframe>';
        document.getElementById('ultraviolet-iframe').src = "https://doge-v4-jade.vercel.app/service/hvtrs8%2F-wuw%2Cgmoelg.aoo%2F"
        console.log(rewrittenUrl)
    } else {
        console.error("Ultraviolet is not defined. Please check your script paths.");
    }
}