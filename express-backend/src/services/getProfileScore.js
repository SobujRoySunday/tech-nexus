import Groq from "groq-sdk";
import logger from "../utils/logger.js";

const groq = new Groq();

async function getProfileScore(profile) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "JSON",
        },
        {
          role: "user",
          content: `Based on the provided student profile attributes, rate the profile on a scale of 0 to 50, considering the current job market. Your response should only contain the number and nothing else. ${profile}`,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 1,
      max_tokens: 1,
      top_p: 1,
      stream: false,
      stop: null,
    });

    logger(
      "LLM Score of the profile obtained: " +
        chatCompletion.choices[0].message.content
    );

    return parseInt(chatCompletion.choices[0].message.content);
  } catch (error) {
    logger(error.message);
    return 0;
  }
}

export default getProfileScore;
