import axios from "axios";

export const deleteData = async (endpoint) => {
  const confirmDelete = confirm("Are you sure to delete this data?");

  if (!confirmDelete) return false;

  try {
    await axios.delete(endpoint, {
      withCredentials: true,
    });

    return true;
  } catch (error) {
    return false;
  }
};
