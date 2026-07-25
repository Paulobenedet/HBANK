import app from "./app";
import { env } from "./shared/config/env";

app.listen(env.PORT, () => {
  console.log(`🚀 HBANK API rodando em http://localhost:${env.PORT}`);
});