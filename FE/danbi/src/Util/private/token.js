export class Token{
  #accessToken = "";
  #accessTokenExpireTime = "";

  setAccessToken(payload){
    this.#accessToken = payload;
  }
  getAccessToken(){
    return this.#accessToken;
  }

  setAccessTokenExpireTime(payload){
    this.#accessTokenExpireTime = payload;
  }
  getAccessTokenExpireTime(){
    return this.#accessTokenExpireTime;
  }

  clear(){
    this.#accessTokenExpireTime = "";
    this.#accessToken = "";
  }

  check(){
    return this.#accessToken==="" || (new Date()) >= (new Date(this.#accessTokenExpireTime));
  }
}