import React, { ChangeEvent, useRef } from "react";
import styles from "./fields.module.scss";
import { Icon } from "@iconify/react";

interface I_InputFieldProp {
  name: string;
  value: string | number;
  handleChange: (a: ChangeEvent<any>) => void;
  type: "text" | "tel" | "number";
  placeholder: string;
  error?: string | false;
  label: string;
}
export function PrimaryInputField({
  name,
  value,
  handleChange,
  error,
  type,
  placeholder,
  label,
}: I_InputFieldProp): JSX.Element {
  return (
    <p className={styles.primaryInputField}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        name={name}
      />
      <span>{error ? error : ""}</span>
    </p>
  );
}

export function PrimaryTextAreaField({
  name,
  value,
  handleChange,
  error,
  placeholder,
  label,
  type = "text",
}: I_InputFieldProp): JSX.Element {
  return (
    <p className={styles.primaryTextAreaField}>
      <label htmlFor={name}>{label}</label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        name={name}
      />
      <span>{error ? error : ""}</span>
    </p>
  );
}

interface I_SelectFieldProp {
  name: string;
  value: string | number;
  handleChange: (a: ChangeEvent<any>) => void;
  error?: string | false;
  label: string;
  options: Array<{ content: string; id: string }>;
}
export function PrimarySelectField({
  name,
  value,
  handleChange,
  error,
  label,
  options,
}: I_SelectFieldProp): JSX.Element {
  return (
    <p className={styles.primarySelectField}>
      <label htmlFor={name}>{label}</label>
      <select name={name} value={value} onChange={handleChange}>
        <option value="">Select</option>
        {options.map((option, i) => (
          <option key={option.id + i} value={option.id}>
            {option.content}
          </option>
        ))}
      </select>
      <span>{error ? error : ""}</span>
    </p>
  );
}
interface I_ViewFieldProp {
  name: string;
  value: string | number;
  type: string;
  label: string;
}

// only used for read only stuff no change handler
export function PrimaryViewField({
  name,
  value,
  type,
  label,
}: I_ViewFieldProp): JSX.Element {
  return (
    <p className={styles.primaryInputField}>
      <label htmlFor={name}>{label}</label>
      <input type={type} readOnly value={value} name={name} />
    </p>
  );
}

interface I_VariableSelectorProps {
  name: string;
  inputValue: string;
  handleChange: (a: ChangeEvent<any>) => void;
  type: "text" | "tel" | "number";
  placeholder: string;
  error?: string | false;
  label: string;
  addedValues: string[];
  addValue: () => void;
  removeValue: (value: string) => void;
}
// allow section of things like colors into an array
export function PrimaryVariableSelectorField({
  name,
  inputValue,

  handleChange,
  error,
  type,
  placeholder,
  label,
  addedValues,
  addValue,
  removeValue,
}: I_VariableSelectorProps): JSX.Element {
  return (
    <div className={styles.primaryVariableSelectorField}>
      <label htmlFor={name}>{label}</label>
      <p>
        <input
          type={type}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          name={name}
        />
        <button type="button" onClick={addValue}>
          Add +{" "}
        </button>
      </p>
      <p>
        {addedValues.map((addedValue, i) => (
          <button
            key={addedValue + i}
            type="button"
            onClick={() => removeValue(addedValue)}
            title="click to remove"
          >
            <Icon icon="iconoir:cancel" />
            <span>{addedValue}</span>
          </button>
        ))}
      </p>
      <p>{error ? error : ""}</p>
      <button></button>
    </div>
  );
}

interface I_PrimaryFileField {
  handleChange: (a: ChangeEvent<any>) => void;
  error?: string | false;
  label: string;
  name: string;
  base64Images: Array<string>;
}
export function PrimarySelectMultipleImageField({
  handleChange,
  error,
  label,
  name,
  base64Images,
}: I_PrimaryFileField): JSX.Element {
  const inputRef = useRef(null);
  const handleBtnClick = () => {
    const node = inputRef.current as HTMLInputElement | null;
    if (node) node.click();
  };
  return (
    <div className={styles.primaryMultipleImagesField}>
      <label htmlFor={name}>{label}</label>

      <p>
        <input
          type={"file"}
          ref={inputRef}
          onChange={handleChange}
          name={name}
          multiple
        />
        <span>
          Min:3 and Max: 5 (all must be less than 2MB (advised ratio of 1:1)){" "}
        </span>
        <button onClick={handleBtnClick} type="button">
          Select files
        </button>
      </p>
      <p>Image preview</p>
      <p>
        {base64Images.map((img, i) => (
          <img src={img} key={i} alt={`${i + 1}`} />
        ))}
      </p>
      <span>{error ? error : ""}</span>
    </div>
  );
}
