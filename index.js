//apiKey:"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",

const { Configuration, OpenAIApi } = require("openai");
const express=require('express')
const cors=require('cors')
const json=require('body-parser')

const configuration = new Configuration({
    organization: "org-3UJENqaG6eREJVcg9AJsSz4w",
    apiKey:"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",
});
const openai = new OpenAIApi(configuration);

const app=express()

app.use(json())
app.use(cors())


const port=3080

app.post('/', async(req,res)=>{
    const {message,currentModel}=req.body;
    console.log(message,"message")
    console.log(currentModel)
    console.log(currentModel)
    const response = await openai.createCompletion({
         model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });
      console.log(response.data.choices[0].text)
    res.json({
        message:response.data.choices[0].text
    })
    
})


app.get('/models',async(req,res)=>{
    const response = await openai.listEngines();
    console.log(response.data.data)
    res.json({
        models:response.data.data
    })
    console.log(response.data.data)
})


app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
})