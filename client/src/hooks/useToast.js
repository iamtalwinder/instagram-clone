import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function useToast() {
  return new Notyf({
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
  });
}
