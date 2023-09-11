import app from "./app";
import { PORT } from "./config";
import { connectDb } from "./config/dbConfig";

(async function () {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log("Error in starting server", err);
  }
})();
