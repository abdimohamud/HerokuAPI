const express = require("express");
const helmet = require("helmet");
const server = express();
server.use(helmet());
server.use(express.json());
server.get("/", (req, res) => {
  res.status(200).json({ hello: "RUNNING" });
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`API RUNNING ON PORT ${PORT}`));