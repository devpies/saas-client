import { Auth } from "aws-amplify";

class APIService {
  public baseUrl: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_BACKEND || "http://localhost/api";
  }

  post<T>(path: string, data: T) {
    return this.request<T>("POST", path, data);
  }

  put<T>(path: string, data: T) {
    return this.request<T>("PUT", path, data);
  }

  patch<T>(path: string, data: T) {
    return this.request<T>("PATCH", path, data);
  }

  get(path: string) {
    return this.request("GET", path);
  }

  delete(path: string) {
    return this.request("DELETE", path);
  }

  get headers() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "Strict-Transport-Security": "max-age=15768000;includeSubdomains",
    };
  }

  getBasePath() {
    return window.location.pathname.split("/")[1];
  }

  async request<T>(method: string, path: string, data?: T) {
    const url = `${this.baseUrl}${path}`;
    const session = await Auth.currentSession();
    const accessToken = session.getIdToken().getJwtToken();
    const options = {
      method,
      body: JSON.stringify(data),
      headers: {
        ...this.headers,
        BasePath: this.getBasePath(),
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      return fetch(url, options).then(async (res) => {
        const json = await res.json();
        if (!res.ok) {
          let error = json?.error;
          if (res.status >= 500) {
            error = "Something went wrong. Please try again later.";
          }
          throw new Error(error);
        }
        return json;
      });
    } catch (err) {
      return err;
    }
  }
}

export const client = new APIService();
