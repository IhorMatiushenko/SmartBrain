import {
  LOGIN_URL,
  REGISTER_URL,
} from '../api/smartBrainAPI';

class AuthService {

  /**
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Response | never | void>}
   */
  static login(email, password) {
    return fetch(LOGIN_URL, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch(console.log);
  }

  /**
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Response | never | void>}
   */
  static register(name, email, password) {
    return fetch(REGISTER_URL, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((user) => user)
      .catch(console.log);
  }

}

export default AuthService
