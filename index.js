const { default: axios } = require('axios')
const express = require('express')
var cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3030;
app.use(cors())

app.get('/get-questions', async (req, res) => {
    const questionNum = req.query.questionNum
    if(questionNum==713||questionNum>1803){
        res.send("not found")
        return
    }
    const from=questionNum<713?questionNum-1:questionNum-2
    const data = await axios.post('https://www.gov.il/he/api/DataGovProxy/GetDGResults', {
        from,
        DynamicTemplateID: '7055a989-b7dc-47af-a1bb-a8194858a432',
        QueryFilters: { skip: { Query: 0 } },
    })
        res.json( data.data["Results"][0] )


})

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})