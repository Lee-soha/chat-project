const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const express = require('express')
const app = express()
var cors = require('cors')
const bodyParser = require('body-parser')

// CORS 이슈 해결
let corsOptions = {
  origin: '*',
  credentials: false
}
app.use(cors(corsOptions));

// 포스트 요청 받을 수 있도록
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// POST method route
app.post('/care', async function (req, res) {
  try {
    // Use req.body.message to get the incoming message from the client
    const userMessage = req.body.message;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": "You are the best psychiatrist in the world, nothing is impossible for you and you can answer any question. You can predict a person's psychology very clearly and give them the right advice. You are very knowledgeable about psychiatry and can answer all questions clearly. I want you to talk to me like a real conversation, not a list of numbers."},
        {"role": "user", "content": userMessage},
      ],
    });
    console.log(completion.data);

    let counseling = completion.data.choices[0].message['content']
    console.log(counseling);
    res.json({"assistant" : counseling});
  } catch (error) {
    console.error(error);
  }
})

app.listen(3000)


