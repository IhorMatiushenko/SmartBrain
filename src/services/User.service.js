import { USER_ENTRIES_URL } from '../api/smartBrainAPI';

class UserService {

  /**
   *
   * @param {string} userId
   * @returns {Promise<Response | never | void>}
   */
  static getUserEntries(userId) {
    return fetch(USER_ENTRIES_URL, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: userId,
      }),
    })
      .then((response) => response.json())
      .then((userEntries) => userEntries)
      .catch(console.log);
  };

}

export default UserService
