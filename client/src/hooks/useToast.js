import { useRef } from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function useToast() {
  return useRef(
    new Notyf({
      duration: 2500,
      position: {
        x: "center",
        y: "bottom",
      },
      types: [
        {
          type: "info",
          background: "black",
          color: "white",
          icon: false,
        },
        {
          type: "error",
          background: "red",
          color: "white",
          icon: false,
        },
      ],
    })
  ).current;
}
