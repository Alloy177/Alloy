import FontFaceObserver from "fontfaceobserver";
import eruda from "eruda";
import "./style.css";

import Game from "./Game";

eruda.init();

new FontFaceObserver("Ubuntu").load().then(() => new Game());