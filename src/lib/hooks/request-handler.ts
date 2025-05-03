import axios from "./http.service";
import { toast } from "sonner";

export default async function requestHandler({
  url,
  data = undefined,
  method,
  waiting = true,
}: any) {
  try {
    const response =
      method === "post"
        ? await axios.post(url, data, waiting)
        : await axios.get(url, waiting);

    const resData = response.data;

    if (resData.message) {
      toast.info(resData.message);
    }

    if (resData.statusCode === 200) {
      return resData.data;
    }

    return null;
  } catch (e: any) {
    const errMsg = e?.response?.data?.message || "Something went wrong";
    toast.error(errMsg);
    return null;
  }
}
