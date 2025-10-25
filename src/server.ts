import { ENV } from "./config/env.js";
import app from "./bin/app.js";

const port = process.env.PORT;

app.listen(ENV.PORT, () => {
  console.log(`App Running On : http://localhost:${port}`);
});
