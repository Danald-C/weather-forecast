const searchForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value;
    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''
    /* fetch('localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
                // console.log(data.error)
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    }) */
    // fetch('http://localhost:3000/weather?address='+location).then(response => response.json()).then(data => {
    fetch('/weather?address='+location).then(response => response.json()).then(data => {
        if(data.error){
            messageOne.textContent = data.error
            // console.log(data.error)
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
    // console.log(search.value)
})