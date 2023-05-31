import React from "react";
import style from "./Popup.module.css";
/* eslint-disable */
function Popup({ trigger, children }) {
  return trigger && <div className={style.popupContainer}>{children}</div>;
}

export default Popup;
