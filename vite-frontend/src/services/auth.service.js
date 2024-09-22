import axios from "axios";
import { backendURL } from "../conf/conf.js";

export class AuthService {
  serviceEndpoint;

  constructor() {
    this.serviceEndpoint = backendURL;
  }

  async register(data) {
    try {
      await axios.post(`${this.serviceEndpoint}/user/register`, data);
      return 201;
    } catch (error) {
      if (error.response.status && error.response.status === 409) {
        return 409;
      } else if (error.response.status && error.response.status === 400) {
        return 400;
      } else if (error.response.status && error.response.status === 500) {
        return 500;
      } else {
        return null;
      }
    }
  }

  async login({ email, password }) {
    try {
      await axios.post(`${this.serviceEndpoint}/user/login`, {
        email,
        password,
      });

      return 200;
    } catch (error) {
      if (error.response.status && error.response.status === 404) {
        return 404;
      } else if (error.response.status && error.response.status === 401) {
        return 401;
      } else if (error.response.status && error.response.status === 500) {
        return 500;
      } else {
        return null;
      }
    }
  }

  // withCredentials: true
  async getUser() {
    try {
      const response = await axios.get(
        `${this.serviceEndpoint}/user/getThisUser`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      if (error.response.status && error.response.status === 401) {
        return 401;
      } else if (error.response.status && error.response.status === 500) {
        return 500;
      } else {
        return null;
      }
    }
  }

  async getProfile() {
    try {
      const response = await axios.get(`${this.serviceEndpoint}/user/profile`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      if (error.response.status && error.response.status === 404) {
        return 404;
      } else if (error.response.status && error.response.status === 401) {
        return 401;
      } else if (error.response.status && error.response.status === 500) {
        return 500;
      } else {
        return null;
      }
    }
  }

  async createProfile(data) {
    try {
      await axios.post(`${this.serviceEndpoint}/user/newProfile`, data, {
        withCredentials: true,
      });
      return 201;
    } catch (error) {
      if (error.response.status && error.response.status === 400) {
        return 400;
      } else if (error.response.status && error.response.status === 500) {
        return 500;
      } else {
        return null;
      }
    }
  }

  async logout() {
    try {
      const response = await axios.post(`${this.serviceEndpoint}/user/logout`, {
        withCredentials: true,
      });
      return 200;
    } catch (error) {
      if (error.response.status && error.response.status === 401) {
        // unauthorized
        return 401;
      } else {
        // something went wrong
        return null;
      }
    }
  }

  async getProfileRank() {
    try {
      const response = await axios.get(
        `${this.serviceEndpoint}/user/getProfileRank`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      return null;
    }
  }

  async getProfileSuggestions() {
    try {
      const response = await axios.get(
        `${this.serviceEndpoint}/user/getProfileSuggestion`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      return null;
    }
  }

  async getTest(skill) {
    try {
      // get skill and convert it into urlencoded form
      const skillEncoded = encodeURIComponent(skill);
      const response = await axios.get(
        `${this.serviceEndpoint}/user/getTest?skill=${skillEncoded}`,
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      return null;
    }
  }

  async addSkillToProfile(skill) {
    try {
      const response = await axios.post(
        `${this.serviceEndpoint}/user/addSkillToProfile`,
        {
          skill,
        },
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (error) {
      return null;
    }
  }
}

const authService = new AuthService();
export default authService;
