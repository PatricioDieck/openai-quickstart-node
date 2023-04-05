import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
//Above are all the import statements and configuration stuff that I need to use the OpenAI API


//Below is the function that I want to use to generate the prompt- Prompt gets generated, destructured from the request body, and then passed into the OpenAI API call as the prompt. gets returned to the client as a JSON object in the response body 'res'

export default async function (req, res) {

  const {priceMin, priceMax, gender, age, hobbies} = req.body;
  const prompt = generatePrompt(priceMin, priceMax, gender, age, hobbies) 
  console.log(prompt);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.6,
    max_tokens: 1000,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
} //This is where the error catching logic usually goes

function generatePrompt(priceMin, priceMax, gender, age, hobbies) {
  return `Suggest three Christmas gift ideas between ${priceMin} and ${priceMax} for a ${age} year old ${gender} that is into ${hobbies}.`;  
}
