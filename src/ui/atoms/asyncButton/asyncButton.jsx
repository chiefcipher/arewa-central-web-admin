import React from "react";
import styles from "./asyncButton.module.scss";
export const AsyncButton = ({ isAsync, text, handleSubmit }) => {
  return (
    <button className={styles.asyncBtn} onSubmit={handleSubmit} type="submit">
      {isAsync ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.05em"
          height="1em"
          viewBox="0 0 25 24"
        >
          <path
            fill="currentColor"
            d="M4.818 6.664h-.001a1.847 1.847 0 1 1 1.306-.541a1.773 1.773 0 0 1-1.277.541h-.029zm-2.97 7.182h-.001a1.847 1.847 0 1 1 1.306-.541a1.773 1.773 0 0 1-1.278.541h-.031h.002zM12 3.692h-.001a1.847 1.847 0 1 1 1.306-.541a1.773 1.773 0 0 1-1.277.541h-.029zM4.818 21.029h-.001a1.847 1.847 0 1 1 1.306-.541a1.769 1.769 0 0 1-1.276.541h-.031zM19.182 7.125a2.308 2.308 0 1 1 0-4.615a2.308 2.308 0 0 1 0 4.615zM12 24h-.001a1.847 1.847 0 1 1 1.306-.541a1.773 1.773 0 0 1-1.277.541h-.029zm10.154-9.231h-.048c-.75 0-1.428-.309-1.913-.807l-.001-.001c-.499-.503-.808-1.196-.808-1.961s.308-1.458.808-1.962a2.663 2.663 0 0 1 1.914-.808h.05h-.003h.048c.75 0 1.427.309 1.913.807l.001.001c.499.503.808 1.196.808 1.961s-.308 1.458-.808 1.962a2.664 2.664 0 0 1-1.915.809h-.049h.002zm-2.971 7.643h-.05a3.097 3.097 0 0 1-2.236-.951l-.001-.001c-.584-.584-.945-1.391-.945-2.283s.361-1.698.945-2.283a3.106 3.106 0 0 1 2.234-.945h.054h-.003h.042c.877 0 1.67.362 2.237.944l.001.001c.588.582.952 1.39.952 2.283s-.364 1.7-.952 2.282a3.102 3.102 0 0 1-2.24.953h-.04z"
          />
        </svg>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};
