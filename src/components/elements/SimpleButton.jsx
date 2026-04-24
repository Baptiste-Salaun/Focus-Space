import { useState } from "react";
import styles from "./SimpleButton.module.css";

function SimpleButton({content,color,onClick}){

    return(<button className={styles[color]} onClick={onClick}>{content}</button>);

}
export default SimpleButton;