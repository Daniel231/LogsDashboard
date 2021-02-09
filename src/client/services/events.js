/**
 * The module is responisible for all the api requests to events resource.
 * 
 */

import axios from 'axios'
import api from '../constant/api'


const baseUrl = api.api_base_url

export const getEvents = async () => {
    const response = await axios({
      method: 'get',
      url: `${baseUrl}/event`,
      headers: {
        'content-type': 'application/json',
      },
    })

    return response.data;
}