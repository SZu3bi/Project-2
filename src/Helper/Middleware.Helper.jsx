import { useHistory } from "react-router-dom";

export let GlobalHistory = null;

function MiddlewareHelper() {
  GlobalHistory = useHistory();
  return null;
}

export { MiddlewareHelper as Middleware };