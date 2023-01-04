import { DisplayData } from "../models/DisplayData";
import { ActivityData, AverageDay, PerformanceData, User } from "../utils/types/types";

/**
 * @description This class is used to fetch data from a REST API
 */
export class Api {
  private readonly _baseUrl: string;

  constructor(url: string) {
    this._baseUrl = url;
  }

  /**
   * @param {string} path - The uri path to fetch
   * @param {Headers} headers - The headers to send with the request
   * @return {Promise<any>} - The response from the API
   */
  async get(path: string, headers: Headers): Promise<any> {
    return await this._handleResponse(path, { headers, method: "GET" });
  }

  async delete(path: string, headers: Headers): Promise<any> {
    return this._handleResponse(path, { headers, method: "delete" });
  }

  async post(path: string, headers: Headers, data: BodyInit): Promise<any> {
    return this._handleResponse(path, { headers, method: "post", body: data });
  }

  async patch(path: string, headers: Headers, data: BodyInit): Promise<any> {
    return this._handleResponse(path, { headers, method: "patch", body: data });
  }

  /**
   * Handle the response from the API and convert it to JSON if possible
   * @param {string} path - The uri path to fetch
   * @param {RequestInit} requestInit - The request options (method, headers, body...)
   * @return {Promise<any>}
   * @private
   */
  private async _handleResponse(path: string, requestInit: RequestInit) {
    const res = await fetch(`${this._baseUrl}${path}`, requestInit);
    const data = await res.json();
    if (res.ok && res.status >= 200 && res.status < 300) {
      return data;
    } else {
      throw new Error(data.message || data || "An error occurred. Please try again later.");
    }
  }
}

/**
 * @description This class is used to fetch data from the Rest API
 * It will contain the different methods and endpoints to fetch data that will be used in the app
 */
class Store {
  private readonly _api: Api;
  private dataModels: DisplayData;

  constructor() {
    this._api = new Api("http://localhost:3000");
    this.dataModels = new DisplayData();
  }

  /**
   * @param {string} userId - The user id to be used in the request
   * @return {Promise<AverageDay[]>} - Data for the Line chart
   */
  async averageSessions(userId: string): Promise<any> {
    return await this._api
      .get(`/user/${userId}/average-sessions`, new Headers())
      .then((data) => data);
  }

  /**
   * @param {string} userId - The user id to be used in the request
   * @return {Promise<PerformanceData[]>} - Data for the Radar chart
   */
  async performance(userId: string): Promise<any> {
    return await this._api
      .get(`/user/${userId}/performance`, new Headers())
      .then((data) => data);
  }

  /**
   * @param {string} userId - The user id to be used in the request
   * @return {Promise<ActivityData[]>} - Data for the Bar chart
   */
  async activity(userId: string): Promise<any> {
    return await this._api
      .get(`/user/${userId}/activity`, new Headers())
      .then((data) => data);
  }

  /**
   * @param {string} userId - The user id to be used in the request
   * @return {Promise<User>} - User first name, data for radial chart and key data
   */
  async user(userId: string): Promise<any> {
    return await this._api
      .get(`/user/${userId}`, new Headers())
      .then((data) => data);
  }
}

export default new Store();
