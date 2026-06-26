import AppAPIInstance from "../baseApi";
import { API } from "../constants";

export const getListClient = async (payload) => {
  const { params } = payload;
  return await AppAPIInstance.get(API.CLIENT.LIST, {params:
    {...params, order: "created_date desc"},
  });
};

export const createClient = async (data) => {
  const newData = { ...data };
  return await AppAPIInstance.post(API.CLIENT.CREATE, newData);
};

export const getClientDetail = async (id) => {
  return await AppAPIInstance.get(API.CLIENT.DETAIL(id));
};

export const deleteClient = async (id) => {
  return await AppAPIInstance.delete(API.CLIENT.DELETE(id));
};

export const editClient = async (payload) => {
  const { id, data } = payload;
  return await AppAPIInstance.put(API.CLIENT.EDIT(id), data);
};