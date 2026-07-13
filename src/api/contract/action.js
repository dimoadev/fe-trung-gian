import AppAPIInstance from "../baseApi";
import { API } from "../constants";

export const getListContract = async (payload) => {
  const {page} = payload;
  try {
    return await AppAPIInstance.get(`${API.CONTRACT.LIST}?page=${page}`);
  } catch (err) {
    console.log(err);
  }
};

export const getListSpinByUser = async (payload) => {
  const {id, page} = payload;
  try {
    return await AppAPIInstance.get(`${API.SPIN.LIST}/${id}/user?page=${page}`);
  } catch (err) {
    console.log(err);
  }
};

export const getListSpinByTicket = async (payload) => {
  const {id, page} = payload;
  try {
    return await AppAPIInstance.get(`${API.SPIN.LIST}/${id}/ticket?page=${page}`);
  } catch (err) {
    console.log(err);
  }
};

export const createContract = async (payload) => {
  try {
    return await AppAPIInstance.post(`${API.CONTRACT.LIST}`, payload);
  } catch (err) {
    console.log(err);
  }
};

export const updateContract = async (payload) => {
  const {id, data} = payload;
  try {
    return await AppAPIInstance.patch(`${API.CONTRACT.LIST}/${id}`, data);
  } catch (err) {
    console.log(err);
  }
};

export const addPartyB = async (payload) => {
  const {id, data} = payload;
  try {
    return await AppAPIInstance.patch(API.CONTRACT.ADD_B(id), data);
  } catch (err) {
    console.log(err);
  }
};

export const update655Running = async (payload) => {
  const {id} = payload;
  try {
    return await AppAPIInstance.patch(`${API.SPIN.LIST}/${id}/waiting`);
  } catch (err) {
    console.log(err);
  }
};

export const join655 = async (payload) => {
  const {id, data} = payload;
  try {
    return await AppAPIInstance.post(`${API.SPIN.LIST}/${id}/join`, data);
  } catch (err) {
    console.log(err);
  }
};

export const listTicket655Admin = async (payload) => {
  const {page} = payload;
  try {
    return await AppAPIInstance.get(`${API.SPIN.LIST}/ticket-admin?page=${page}`);
  } catch (err) {
    console.log(err);
  }
};

export const updateStatusTicket655 = async (payload) => {
  const {id} = payload;
  try {
    return await AppAPIInstance.patch(`${API.SPIN.LIST}/ticket/${id}/close`);
  } catch (err) {
    console.log(err);
  }
};

export const updateInfoSession655 = async (payload) => {
  const {id, data} = payload;
  try {
    return await AppAPIInstance.post(`${API.SPIN.LIST}/${id}/result`, data);
  } catch (err) {
    console.log(err);
  }
};

export const detailContract = async (payload) => {
  const {id} = payload;
  try {
    return await AppAPIInstance.get(`${API.CONTRACT.LIST}/${id}`,);
  } catch (err) {
    console.log(err);
  }
};

export const sessionInfo655Admin = async (payload) => {
  const {id} = payload;
  try {
    return await AppAPIInstance.get(`${API.SPIN.LIST}/${id}/info-session-admin`,);
  } catch (err) {
    console.log(err);
  }
};

export const splitMoney655Admin = async (payload) => {
  const {id} = payload;
  try {
    return await AppAPIInstance.post(`${API.SPIN.LIST}/${id}/split-money`,);
  } catch (err) {
    console.log(err);
  }
};

export const updateMoneyTicket655 = async (payload) => {
  const {id, data} = payload;
  try {
    return await AppAPIInstance.post(`${API.SPIN.LIST}/${id}/money-result`, data);
  } catch (err) {
    console.log(err);
  }
};

export const uploadMedia = async (payload) => {
  const { file } = payload;
  const form = new FormData();
  form.append("file", file?.originFileObj);
  return await AppAPIInstance.post('/uploads', form, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};

export const sendChatContract = async (payload) => {
  try {
    return await AppAPIInstance.post(`${API.CHAT.CREATE}/send`, payload);
  } catch (err) {
    console.log(err);
  }
};

export const getChatGroup = async (payload) => {
  const {id } = payload;
  try {
    return await AppAPIInstance.get(`${API.CHAT.LIST}/${id}/messages`);
  } catch (err) {
    console.log(err);
  }
};