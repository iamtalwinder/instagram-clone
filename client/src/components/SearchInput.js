import React, { useEffect, useRef } from "react";
import styles from "./SearchInput.module.css";
import Spinner from "./Spinner";
import EmptyButtom from "./EmptyButton";
import Icon from "@mdi/react";
import { mdiCloseCircleOutline, mdiSearchWeb } from "@mdi/js";

export default function SearchInput({
  name,
  value,
  setValue,
  onChange,
  onFocus,
  loading,
}) {
  const isMounted = useRef(true);
  const container = useRef(null);
  const input = useRef(null);

  const ICON_SIZE = 1;
  const COLOR = "#262626";

  useEffect(() => {
    input.current.addEventListener("focus", () => {
      container.current.style.borderColor = "#262626";
      if (onFocus) {
        onFocus();
      }
    });

    input.current.addEventListener("blur", () => {
      if (isMounted.current) {
        container.current.style.borderColor = "#cfccca";
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, [onFocus]);

  return (
    <div className={styles.container} ref={container}>
      <div className={styles.box}>
        <Icon path={mdiSearchWeb} size={ICON_SIZE} horizontal color={COLOR} />
      </div>
      <input
        ref={input}
        className={styles.input}
        name={name}
        type="text"
        placeholder="search"
        value={value}
        onChange={onChange}
      />
      {/* <label className={styles.label}>{"plceholder"}</label> */}
      <div className={styles.box}>
        {loading ? (
          <Spinner color={COLOR} />
        ) : (
          <EmptyButtom
            onClick={() => {
              setValue("");
            }}
          >
            <Icon
              path={mdiCloseCircleOutline}
              size={ICON_SIZE}
              horizontal
              color={COLOR}
            />
          </EmptyButtom>
        )}
      </div>
    </div>
  );
}
