import { config, HttpServices } from '../config';
import { showError } from '../Helper/Tostify.Helper';

export const GetMainInfo_Case = async () => {
  const result = await HttpServices.get(
    `${config.server_address}`, {
    headers: {
      Authorization: `Bearer ${config.token}`,
    },
  }
  )
    .then((data_2) => data_2)
    .catch((error) => showError('Get Main Info Filed'));
  return result;
};


export const CreateMainInfo_Case = async (body) => {
  const result = await HttpServices.post(
    `${config.server_address}`, body, {
    headers: {
      Authorization: `Bearer ${config.token}`,
    },
  }
  )
    .then((data_2) => data_2)
    .catch((error) => showError('Create Filed'));
  return result;
};



export const DeleteInfo_Case = async (id) => {
  const result = await HttpServices.delete(
    `${config.server_address}/${id}`, {
    headers: {
      Authorization: `Bearer ${config.token}`,
    },
  }
  )
    .then((data) => data)
    .catch((error) => showError('Delete Filed'));
  return result;
};

export const EditInfo_Case = async (id, body) => {
  const result = await HttpServices.put(
    `${config.server_address}/${id}`, body, {
    headers: {
      Authorization: `Bearer ${config.token}`,
    },
  }
  )
    .then((data) => data)
    .catch((error) => showError('Edit Filed'));
  return result;
};
