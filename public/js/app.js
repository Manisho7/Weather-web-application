console.log('client side javascript is loaded!')

function disp(){
    const place = document.getElementById('place').value
    const one = document.getElementById('one')
    const two = document.getElementById('two')

    one.innerText = 'Loading...'
    two.innerHTML = ' '

    fetch('http://localhost:3000/weather?address='+ place +'').then((response) => {
            response.json().then( (data) =>{
                if(data.error){
                    one.innerText = ''
                    two.innerText = data.error
                }
                else if(data.location === undefined){
                    one.innerText = ''
                    two.innerText = 'Enter a place to search!'
                }
                else{
                    one.innerText = 'Location :' + data.location
                    two.innerText = 'Forecast :' + data.forecast
                 }    
            })
         })
     }

/*fetch('http://localhost:3000/weather?address=!').then( (response) => {
    response.json().then( (data) => {
        if(data.error){
            console.log(data.error)
        }
        else{
            console.log(data.location)
            console.log(data.forecast)
            
        }
    })
})*/