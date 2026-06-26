import AppAPIInstance from "../baseApi";
import { API } from "../constants";

export const getListPress = async (payload) => {
  const { params } = payload;
  return await AppAPIInstance.get(API.PRESS.LIST, {params:
    {...params},
  });
};

export const createPress = async (data) => {
  const newData = { ...data };
  return await AppAPIInstance.post(API.PRESS.CREATE, newData);
};

export const getPressDetail = async (id) => {
  return await AppAPIInstance.get(API.PRESS.DETAIL(id));
};

export const deletePress = async (id) => {
  return await AppAPIInstance.delete(API.PRESS.DELETE(id));
};

export const editPress = async (payload) => {
  const { id, data } = payload;
  return await AppAPIInstance.put(API.PRESS.EDIT(id), data);
};

export const listCustomLocation = async (payload) => {
  const { params } = payload;
  return await AppAPIInstance.get(API.PRESS.LIST_LOCATION, {params:
    {...params},
  });
};