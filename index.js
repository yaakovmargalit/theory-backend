const { default: axios } = require('axios')
const mongoose = require('mongoose');
const express = require('express')
var cors = require('cors')
const app = express()
const Question = require('./models/Question')
const Problem = require('./models/Problem')
const PORT = process.env.PORT || 3030;
app.use(cors())
app.use(express.static('public'))
mongoose.connect('mongodb+srv://yaakov:1234@sunday.epfpu.mongodb.net/theory', {
    useNewUrlParser: true
}, () => {
    console.log("Connect to DB");
});
// mongoose.connect('mongodb://localhost:27017/theory', {
//     useNewUrlParser: true
// }, () => {
//     console.log("Connect to DB");
// });
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

app.get('/question/:num', async (req, res) => {
    console.log(req.params.num);
    const q = await Problem.find({ questionNumber: req.params.num })
    res.json(q)
})

// app.get('/set-data', async (req, res) => {
//     // let q
//     // let data
//     // let question
//     // for (let i = 510; i <= 511; i += 10) {
//     //     console.log(i);
//     //     data = await axios.post('https://www.gov.il/he/api/DataGovProxy/GetDGResults', {
//     //         from: i,
//     //         DynamicTemplateID: '7055a989-b7dc-47af-a1bb-a8194858a432',
//     //         QueryFilters: { skip: { Query: 0 } },
//     //     })
//     //     q = data.data["Results"]
//     //     // console.log(q[0]["Data"]["title2"]);
//     //     // console.log(q[0]["Data"]["description4"]["DescriptionHtmlString"]);
//     //     // console.log(num);
//     //     for (let j = 0; j < q.length; j++) {
//     //         question = new Question({
//     //             questionNumber:+q[j]["Data"]["title2"].slice(0, 4),
//     //             title: q[j]["Data"]["title2"],
//     //             description: q[j]["Data"]["description4"]["DescriptionHtmlString"]
//     //         })
//     //         await question.save()
//     //     }

//     // }

//     res.json({})
// })

// app.get('/new-hhh', async (req, res) => {
//     let final = {}
//     for (let i = 714; i < 2000; i++) {
//         const q = await Question.find({ questionNumber: i })
//         let data = q[0];
//         final.questionNumber = data["questionNumber"]
//         let question = data['title'];
//         question = question.slice(6, question.length);
//         final.question = question

//         let answers = data['description'];
//         const start = answers.indexOf('<ul>');
//         const end = answers.indexOf('</ul>');
//         let ul = answers.slice(start + 4, end);
//         const ansArray = [];
//         let src = '';
//         if (answers.indexOf('https') !== -1) {
//             src = answers.slice(
//                 answers.indexOf('http'),
//                 answers.indexOf('jpg') + 3
//             );
//         }
//         final.imageSrc = src
//         let rank = answers.slice(answers.indexOf('left'),answers.indexOf('</span></div></div>'),)
//         let ranks=[]
//         for (let v = 0; v < rank.length; v++) {
//             let startRank=rank.indexOf('«')
//             let endRank=rank.indexOf('»')
//             if(startRank!==-1&&endRank!==-1){
//                 ranks.push(rank.slice(startRank+1,endRank))
//                 rank=rank.slice(endRank+1,rank.length)
//                 // console.log(rank);
//             }
           
//         }
//         final.ranks=ranks
//         for (let j = 0; j < 4; j++) {
//             const startLi = ul.indexOf('<li>');
//             const endLi = ul.indexOf('</li>');
//             let ans = ul
//                 .slice(startLi + 4, endLi)
//                 .replaceAll('  ', '')
//                 .replaceAll('<span>', '')
//                 .replaceAll('</span>', '');
//             if (ans.indexOf('<span') !== -1) {
//                 final.correctAnswer = j + 1
//                 ans = ans.slice(ans.indexOf('>') + 1, ans.length);
//             }
//             ansArray.push(ans);
//             ul = ul.slice(endLi + 4, ul.length);
//         }
//         let anss = ansArray;
//         final.answers = anss
//       const problem = new Problem(final)
//         await problem.save()
//     }
//     res.json(final)
// })

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})