"use client";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function ImageZoom({ children }) {
  return <Zoom>{children}</Zoom>;
}
