import { DataModels } from "../model/DataModels";
import { mockPerfData, mockSessions } from "../mocks/mockData";

export class Api {
  private readonly _baseUrl: string;

  constructor(url: string) {
    this._baseUrl = url;
  }

  async get(path: string, headers: Headers): Promise<any> {
    return this._handleResponse(
      await fetch(`${this._baseUrl}${path}`, { headers, method: "GET" })
    ).catch((e) => console.log(e));
  }

  async delete(path: string, headers: Headers): Promise<any> {
    return this._handleResponse(
      await fetch(`${this._baseUrl}${path}`, { headers, method: "delete" })
    ).catch((e) => console.log(e));
  }

  async post(path: string, headers: Headers, data: BodyInit): Promise<any> {
    return this._handleResponse(
      await fetch(`${this._baseUrl}${path}`, { headers, method: "post", body: data })
    ).catch((e) => console.log(e));
  }

  async patch(path: string, headers: Headers, data: BodyInit): Promise<any> {
    return this._handleResponse(
      await fetch(`${this._baseUrl}${path}`, { headers, method: "patch", body: data })
    ).catch((e) => console.log(e));
  }

  private _handleResponse = async (response: Response) => {
    if (response.ok) {
      return await response.json();
    }
    throw new Error((await response.json()).message);
  };
}

class Store {
  private readonly _api: Api;
  private dataModels: DataModels;

  constructor() {
    this._api = new Api("http://localhost:3000/user/");
    this.dataModels = new DataModels();
  }

  async averageSessions(userId: string | null): Promise<any> {
    return userId === "sample"
      ? mockSessions
      : this.dataModels.averageSessions(
          await this._api.get(`${userId}/average-sessions`, new Headers())
        );
  }

  async performance(userId: string | null): Promise<any> {
    return userId === "sample"
      ? mockPerfData
      : this.dataModels.performance(await this._api.get(`${userId}/performance`, new Headers()));
  }

  async activity(userId: string | null): Promise<any> {
    return userId === "sample"
      ? mockPerfData
      : this.dataModels.activity(await this._api.get(`${userId}/activity`, new Headers()));
  }

  async user(userId: string | null): Promise<any> {
    return userId === "sample"
      ? mockPerfData
      : this.dataModels.user(await this._api.get(`${userId}`, new Headers()));
  }
}

export default new Store();
