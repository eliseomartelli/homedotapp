import axios from "axios";

const callService = async (url, id, service, bearer, data) => {
  return await axios.post(
    `${url}services/${service}`,
    { entity_id: id, data: data },
    {
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
    }
  );
};

const updateState = async (url, id, bearer) => {
  try {
    const response = await axios.get(`${url}states/${id}`, {
      headers: { Authorization: `Bearer ${bearer}` },
    });
    return response.data || {};
  } catch (err) {
    return err;
  }
};

export { callService, updateState };
