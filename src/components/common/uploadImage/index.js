import axios from "axios";
import { dnrUri } from "../../../api/axiosClient";

export const imageUpload = async (img) => {
  const data = new FormData();
  data.append("file", img);
  data.append("upload_preset", "webbanhang");
  data.append("clound_name", "dhotuzjtr");
  const image = await axios.post(dnrUri, data);
  return image.data.url;
};
