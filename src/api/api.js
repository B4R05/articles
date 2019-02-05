import axios from "axios";

export default axios.create({
  baseURL: "https://5gc0frjfql.execute-api.us-east-1.amazonaws.com/dev",
  headers: {
    Authorization: ""
  }
});
