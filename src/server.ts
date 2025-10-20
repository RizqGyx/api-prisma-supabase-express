const { ENV } = require("./config/env");
const app = require("./bin/app");

const port = process.env.PORT;

app.listen(ENV.PORT, () => {
  console.log(`App Running On : http://localhost:${port}`);
});
