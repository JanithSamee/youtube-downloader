import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getVideoData = (url, format) =>
    axios.get(`${BACKEND_URL}/download?videoUrl=${url()}&format=${format()}`);
export { getVideoData };
