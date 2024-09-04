import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }), //same as the useState
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
