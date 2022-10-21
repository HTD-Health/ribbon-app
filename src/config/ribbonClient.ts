import { Ribbon } from "ribbon-client";

export default new Ribbon({
  url: import.meta.env.VITE_API_URL,
  target: "proxy",
});
