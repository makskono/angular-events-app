const APP = require("./backend/app");

const PORT = process.env.PORT || 3000;

APP.listen(PORT, () => console.log("Server running on localhost: " + PORT));
