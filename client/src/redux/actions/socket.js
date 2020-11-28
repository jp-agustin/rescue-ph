import { SET_SOCKET } from "../types";

export const setSocket = socket => ({
  type: SET_SOCKET,
  socket
});
