import vinextHandler from "./vinext-handler.js";

const fetchHandler =
  typeof vinextHandler === "function"
    ? vinextHandler
    : vinextHandler?.fetch?.bind(vinextHandler);

if (typeof fetchHandler !== "function") {
  throw new TypeError("The generated vinext server does not expose a fetch handler.");
}

export default {
  fetch(request, env, context) {
    return fetchHandler(request, env, context);
  },
};
