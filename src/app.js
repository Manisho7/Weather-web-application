const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
//sets heroku port 
const port = process.env.PORT || 3000
//Define paths for express config
const pathDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//sets up static directory 
app.use(express.static(pathDirectory))

//we dont need to use below code cause it checks additional path to show 
/*app.get('', (req,res) =>{
  res.send('hello express')
})*/

//TO use handlebars(hbs) engine and views path
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res) =>{
  res.render('index',{
    title:'Weather App',
    name: 'Manish'
  })
})

app.get('/about',(req,res)=>{
  res.render('about', {
    title:'About me',
    name: 'Manish'
  })
})

/*app.get('/people',(req,res)=>{
  res.send([{
      name: 'manish',
      age: 20
     },
     {
         name: 'madan',
         age: '12'
     }])
})*/

app.get('/weather',(req,res)=>{
 const address = req.query.address
  if(!address)
  {
    return res.send({
      Error:'Provide Correct Address!'})
  }
    geocode(address, (error, {longitude,lattitude,location} = {}) =>
       {
         if(error){
           return res.send({error})
         }
         forecast(longitude,lattitude,location, (error,forecastData) => {
          if (error){
            return res.send({error})
           }
           res.send({
           forecast:forecastData,
           location,
           address: req.query.address
          })
        })
      })

    /*res.send({
    forecast:'little high',
    temperature:'cool around',
    address: req.query.address
  })*/

})

app.get('/help', (req,res)=>{
  res.render('help',{
      title: 'HELP',
      helpText: 'Provides all helpfull content'
  })
})

//without using return we'll be sending response twice(cant send more than one response)
app.get('/products', (req,res)=>{
  if(!req.query.search)
  {
    return res.send('No search item provided')
  }
//we can use else if return not provided above
  res.send({
    products:[]
  })
})

app.get('/help/*', (req,res)=>{
  res.render('404',{
    title: 'No More Help Articles Found'
  })
})

app.get('*', (req,res) =>{
  res.render('404',{
    title: '404 Page Not Found'
  })
})

app.listen(port, ()=>{
    console.log('working on port '+ port)
})