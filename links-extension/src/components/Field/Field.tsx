import { Ref, forwardRef, useState } from "react";
import { classNames } from "../../utils/classNames";

import styles from "./Field.module.css";

type Props = {
  label?: string;
  error?: string;
  name?: string;
  value?: string;
  obscure?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export const Field = forwardRef(
  (
    { label, name, value, error, obscure, onChange }: Props,
    ref: Ref<HTMLInputElement>
  ) => {
    const [active, setActive] = useState(false);

    const handleFocus = () => setActive(true);
    const handleBlur = () => setActive(false);

    return (
      <label
        className={classNames(
          styles.Field,
          active && styles.Active,
          error && styles.Error
        )}
      >
        {!!label && <span className={styles.Label}>{label}</span>}
        <input
          ref={ref}
          type={obscure ? "password" : "text"}
          className={styles.Input}
          name={name}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={onChange}
        />
        {!!error && <span className={styles.Error}>{error}</span>}
      </label>
    );
  }
);
