class Token {
  setToken = (key: string, value: any) => {
    localStorage.setItem(key, value);
  };

  getToken = (key: string) => {
    return localStorage.getItem(key);
  };

  delToken = (key: string) => {
    localStorage.removeItem(key);
  };
}

export default new Token();
