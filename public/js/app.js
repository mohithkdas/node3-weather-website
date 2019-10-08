console.log("Client side JS loaded")

/* fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})*/

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'js'


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()// prevents defsult page refresh when submiting form - feature used in old systems
    const location = search.value
    console.log(location)

    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                /* console.log(data.error) */
                messageOne.textContent = 'Error: ' + data.error
            } else {
                /* console.log(data.location)
                console.log(data.forecast) */
                messageOne.textContent = 'Location: ' + data.location
                messageTwo.textContent = 'Forecast: ' + data.forecast
            }
        })
    })
})

