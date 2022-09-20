const { default: axios } = require('axios')
const mongoose = require('mongoose');
const express = require('express')
var cors = require('cors')
const app = express()
const Question = require('./models/Question')
const PORT = process.env.PORT || 3030;
app.use(cors())
app.use(express.static('public'))
mongoose.connect('mongodb+srv://yaakov:1234@sunday.epfpu.mongodb.net/theory', {
    useNewUrlParser: true
}, () => {
    console.log("Connect to DB");
});
app.get('/get-questions', async (req, res) => {
    const questionNum = req.query.questionNum
    if (questionNum == 713 || questionNum > 1803) {
        res.send("not found")
        return
    }
    const from = questionNum < 713 ? questionNum - 1 : questionNum - 2
    const data = await axios.post('https://www.gov.il/he/api/DataGovProxy/GetDGResults', {
        from,
        DynamicTemplateID: '7055a989-b7dc-47af-a1bb-a8194858a432',
        QueryFilters: { skip: { Query: 0 } },
    })
    res.json(data.data["Results"][0])


})

app.get('/question/:num',async(req,res)=>{
    console.log(req.params.num);
    const q = await Question.find({questionNumber :req.params.num })
    res.json(q)
})

app.get('/set-data', async (req, res) => {
    // let q
    // let data
    // let question
    // for (let i = 510; i <= 511; i += 10) {
    //     console.log(i);
    //     data = await axios.post('https://www.gov.il/he/api/DataGovProxy/GetDGResults', {
    //         from: i,
    //         DynamicTemplateID: '7055a989-b7dc-47af-a1bb-a8194858a432',
    //         QueryFilters: { skip: { Query: 0 } },
    //     })
    //     q = data.data["Results"]
    //     // console.log(q[0]["Data"]["title2"]);
    //     // console.log(q[0]["Data"]["description4"]["DescriptionHtmlString"]);
    //     // console.log(num);
    //     for (let j = 0; j < q.length; j++) {
    //         question = new Question({
    //             questionNumber:+q[j]["Data"]["title2"].slice(0, 4),
    //             title: q[j]["Data"]["title2"],
    //             description: q[j]["Data"]["description4"]["DescriptionHtmlString"]
    //         })
    //         await question.save()
    //     }

    // }

    res.json({})
})

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})