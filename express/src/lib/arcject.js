import arcjet, { shield, detectBot, tokenBucket , slidingWindow } from "@arcjet/node";
import "dotenv/config"

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    // detectBot({
    //   mode: "LIVE",
    //   allow: ["CATEGORY:SEARCH_ENGINE"]
    // }),
    slidingWindow({
      mode : "LIVE" ,
      max : 100 ,
      interval : 60 // s
    })
  ],
});

export default aj 
