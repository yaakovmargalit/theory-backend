const { default: axios } = require('axios')
const express = require('express')
const app = express()
const port = 3000

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

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})