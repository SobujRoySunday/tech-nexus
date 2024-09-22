import Groq from "groq-sdk";

const groq = new Groq();
async function getSuggestions(profile) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "JSON",
      },
      {
        role: "user",
        content: `This is a details of a student profile. Tell some suggestions for this profile considering current job market. Just tell the points, don't explain them. Your maximum token size of the output should be only 2048. Your output should be a string array containing the suggestions. Remove any other texts except the array. Your suggestions should be more profile improvement specific. If there is no profile specific suggestions then you can give other suggestions related to the user's career: ${profile}`,
      },
    ],
    model: "llama3-8b-8192",
    temperature: 1,
    max_tokens: 4096,
    top_p: 1,
    stream: false,
    stop: null,
  });

  let data = chatCompletion.choices[0].message.content;
  console.log(data);

  return JSON.parse(data);
}

export default getSuggestions;
