const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get("/git", (req, res)=>{
  res.send({
    "hello":"hello"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})