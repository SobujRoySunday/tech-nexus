import Groq from "groq-sdk";
import logger from "../utils/logger.js";

const groq = new Groq();

async function getRoadMap(topic) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "JSON",
        },
        {
          role: "user",
          content: `Generate a detailed learning roadmap for ${topic} in JSON format. Each step should include the following attributes: name (the name of the learning step), description (a brief explanation of the step), estimatedTime (how long it will take to learn this step), resources (a list of links to resources for learning), and subSteps (any smaller steps required to complete this step). If any field cannot be filled with useful information, it should be left empty or set to null. The output should be a structured JSON with nested steps where applicable. Do not include any other text except the JSON output.`,
        },
      ],
      model: "llama-3.1-70b-versatile",
      temperature: 1,
      max_tokens: 4096,
      top_p: 1,
      stream: false,
      response_format: {
        type: "json_object",
      },
      stop: null,
    });
    logger(chatCompletion.choices[0].message.content);
    const data = JSON.parse(chatCompletion.choices[0].message.content);
    return data;
  } catch (error) {
    logger(error.message);
    return null;
  }
}

export default getRoadMap;
