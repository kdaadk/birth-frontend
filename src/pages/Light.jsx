import React from "react";
import { detectMobile } from "../shared/detectMobile"
import {MobileLightMode} from "../components/LightMode/MobileLightMode";
import {DesktopLightMode} from "../components/LightMode/DesktopLightMode";

export function Light(props) {
  return (
      detectMobile() ? <MobileLightMode /> : <DesktopLightMode />
  );
}

export default Light; 
