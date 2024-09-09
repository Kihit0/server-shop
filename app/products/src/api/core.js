import axios from 'axios';

class Api {
  _url = `http://actions-service:${process.env.PORT_ACTIONS}/api/actions`;

  async createActions(data) {
    try {
      const response = await axios.post(this._url, data);

      if (!response.data) {
        throw new Error('Bad request');
      }
    } catch (error) {
      throw error;
    }
  }
}

export default Api;
