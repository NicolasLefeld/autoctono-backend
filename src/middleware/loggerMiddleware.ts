import morgan from "morgan";
import { getStatusEmoji } from "../utils/const";
// Middleware de logs
const loggerMiddleware = morgan((tokens, req, res) => {
  const method = tokens.method(req, res) || "UNKNOWN_METHOD";
  const url = tokens.url(req, res) || "UNKNOWN_URL";
  const status = parseInt(tokens.status(req, res) || "500");
  const emoji = getStatusEmoji(status);
  const responseTime = tokens["response-time"](req, res) || "0";
  const date = tokens.date(req, res, "iso") || new Date().toISOString();

  return `[${date}] ${method} ${url} - ${status} ${emoji} (${responseTime} ms)`;
});

export default loggerMiddleware;
