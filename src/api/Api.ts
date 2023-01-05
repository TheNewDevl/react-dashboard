import { DisplayData } from "../models/DisplayData";
import {
  ActivityResponse,
  AverageResponse,
  GetMethodReturns,
  PerformanceResponse,
  UserResponse
} from "../utils/types/types";

/**
 * @description REST API calls (get, post..)
 */
export class Api {
  private readonly _baseUrl: string;

  /** @param {string} url - The base url of the API */
  constructor(url: string) {
    this._baseUrl = url;
  }

  /**
   * Return data or throw an error if the response is not ok
   * @param {string} path - The uri path to fetch
   * @param {Headers} headers - The headers to send with the request
   * @return {Promise<any> | undefined} - The response from the API
   */
  async get(path: string, headers: Headers): Promise<GetMethodReturns> {
    return await this._handleResponse(path, { headers, method: "GET" });
  }

  async delete(path: string, headers: Headers): Promise<Response> {
    return this._handleResponse(path, { headers, method: "delete" });
  }

  async post(path: string, headers: Headers, data: BodyInit): Promise<Response> {
    return this._handleResponse(path, { headers, method: "post", body: data });
  }

  async patch(path: string, headers: Headers, data: BodyInit): Promise<Response> {
    return this._handleResponse(path, { headers, method: "patch", body: data });
  }

  /**
   * Handle the response from the API and convert it to JSON if possible
   * Throw an error if the response is not ok
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
 * @description This class is used consume the REST API class
 * Methods represent the different endpoints of the API.
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
   * @return {Promise<AverageResponse>} - Data for the Line chart
   */
  async averageSessions(userId: string): Promise<AverageResponse> {
    return await this._api.get(`/user/${userId}/average-sessions`, new Headers())
  }

  /**
   * @param {string} userId - The user id to be used in the request
   * @return {Promise<PerformanceResponse>} - Data for the Radar chart
   */
  async performance(userId: string): Promise<PerformanceResponse> {
    return await this._api.get(`/user/${userId}/performance`, new Headers())
  }

  /**
   * @param {string} userId - The user id to be used in the request
   * @return {Promise<ActivityResponse>} - Data for the Bar chart
   */
  async activity(userId: string): Promise<ActivityResponse> {
    return await this._api.get(`/user/${userId}/activity`, new Headers())
  }

  /**
   * @param {string} userId - The user id to be used in the request
   * @return {Promise<UserResponse>} - User first name, data for radial chart and key data
   */
  async user(userId: string): Promise<UserResponse> {
    return await this._api.get(`/user/${userId}`, new Headers())
  }
}

export default new Store();
