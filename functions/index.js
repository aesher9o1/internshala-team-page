const functions = require('firebase-functions')
const axios = require('axios')
const cheerio = require('cheerio')
const cors = require('cors')({
    origin: true
})

exports.getInternshalaTeam = functions.https.onRequest((request, resolve) => {
    cors(request, resolve, () => {
        resolve.set('Cache-Control', 'public, max-age=21600, s-maxage=21600')
        axios.get("https://internshala.com/about_us").then(res => {
            const data = []
            const html = res.data
            const $ = cheerio.load(html)

            $("#current-team").find('.pagecontent').each((_index, element) => {
                const _$ = cheerio.load($(element).html())

                const img = _$('img').attr('src')
                const name = _$('b').text()
                const desc = _$('p').text().split(": ")[1]


                data.push({
                    img: "https://s3-ap-southeast-1.amazonaws.com/internshala-" + img.slice(1, img.length),
                    name: name,
                    desc: desc
                })
            })


            resolve.send(data)
            axios.put('https://internshala-team.firebaseio.com/team.json', data)
            return

        }).catch((err) => {
            resolve.send("SERVER DED")
            console.log(err)
            return ""
        })
    })
})