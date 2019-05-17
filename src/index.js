import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import { createRoutes } from "./routes";

const routes = createRoutes();

ReactDOM.render(routes, document.getElementById("root"));
