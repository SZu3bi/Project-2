import { config, HttpServices, configContact, HttpServices_Contact } from '../config';
import { showError } from '../Helper/Tostify.Helper';

export const GetMainInfo_Case = async () => {
  const result = await HttpServices.get(
    `${config.server_address}`, {
    headers: {
      Authorization: `Bearer ${config.token}`,
    },
  }
  )
    .then((data) => data)
    .catch((error) => showError('Get Main Info Filed'));
  return result;
};
export const GetMainInfo_Contact = async () => {
  const result = await HttpServices.get(
    `${configContact.server_address_Contact}`, {
    headers: {
      Authorization: `Bearer ${config.token}`,
    },
  }
  )
    .then((data) => data)
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
    .then((data) => data)
    .catch((error) => showError('Create Filed'));
  return result;
};

export const CreateMainInfo_Contact = async (contact) => {
  const results = await HttpServices_Contact.post_contact(
    `${configContact.server_address_Contact}`, contact, {
    headers: {
      Authorization: `Bearer ${configContact.token_2}`,
    },
  }
  )
    .then((data_c) => data_c)
    .catch((error) => showError('Create Filed'));
  return results;
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
export const DeleteInfo_Contact = async (id) => {
  const result = await HttpServices.delete(
    `${configContact.server_address_Contact}/${id}`, {
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
