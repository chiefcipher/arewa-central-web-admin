import React from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorUI } from "../../atoms/errorUI/errorUI";
import { DeleteUI } from "../../molecules/deleteUI/deleteUI";
import { MessageList } from "../../organisms/messageList/messageList";
import { MessageAddNew } from "../../organisms/messageAddNew/messageAddNew";
import { MessageEdit } from "../../organisms/messageEdit/messageEdit";
import { MessageView } from "../../organisms/messageView/messageView";

export function Message(): JSX.Element {
  // api delete mutation
  const handleDelete: () => Promise<boolean> = async () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if ("a") {
          return resolve(true);
        }
        reject(false);
      }, 3000);
    });

  return (
    <Routes>
      <Route path="/" element={<MessageList />} />
      <Route path="/create" element={<MessageAddNew />} />
      <Route path="/edit/:messageId" element={<MessageEdit />} />
      <Route
        path="/delete/:deleteId"
        element={<DeleteUI handleDelete={handleDelete} cancelUrl="../" />}
      />
      <Route path="/:messageId" element={<MessageView />} />
      <Route path="*" element={<ErrorUI type={404} />} />
    </Routes>
  );
}
