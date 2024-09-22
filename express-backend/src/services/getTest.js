import Groq from "groq-sdk";

const groq = new Groq();
async function getTest(skill) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "JSON",
      },
      {
        role: "user",
        content: `Generate a list of 10 MCQ questions for a 1 year-experience in ${skill}. it should be into json format and provide me. Your response should not contain any other text except the JSON output. The json output should look like this:\n[\n{\nquestion: \"Question 1\",\noptions: [\"option 1\",\"option 1\",\"option 1\",\"option 1\"],\nanswer: 4 // this is the index of the correct option\n},\n{\nquestion: \"Question 2\",\noptions: [\"option 1\",\"option 1\",\"option 1\",\"option 1\"],\nanswer: 2\n}\n]`,
      },
    ],
    model: "llama3-8b-8192",
    temperature: 1,
    max_tokens: 8000,
    top_p: 1,
    stream: false,
    stop: null,
  });

  let data = chatCompletion.choices[0].message.content;
  console.log(data);

  return JSON.parse(data);
}

export default getTest;
