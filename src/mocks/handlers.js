import { http, HttpResponse } from "msw";
import { catData } from "../data";
let storedData = catData;
export const handlers = [
  http.get("/api/cats", () => {
    if (localStorage?.getItem("cats")) {
      storedData = JSON.parse(localStorage.getItem("cats"));
    }
    return HttpResponse.json(storedData);
  }),
  http.post("/api/cats", async ({ request }) => {
    const updatedList = await request.json();
    localStorage.setItem("cats", JSON.stringify(updatedList));
    storedData = updatedList;
    return HttpResponse.json(storedData);
  }),
];
