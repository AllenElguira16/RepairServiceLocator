import Axios from 'axios';
import * as io from 'socket.io-client'

class Module{
  public static getUser(){
    return Axios.post("/api/userDetails");
  }

  public static getUserContacts(){
    return Axios.get("/api/contacts");
  }

  public static runSocket(){
    let socket = io("https://www.repairservicelocator.test:8000");
    return socket;
  }

  public static getChats(id: number){
    return Axios.get(`/api/chats/${id}`);
  }

  public static sendChat(id: number, content: Object){
    return Axios.post(`/api/chats/${id}`, content);
  }

  public static getShops(category: string, shopName: string){
    return Axios.get(`/api/shops/${category}/${shopName}`);
  }

  public static getTotalRatings(id: number){
    return Axios.get(`/api/shops/${id}/reviews/total`);
  }

  public static addToContacts(form: any){
    return Axios.post("/api/addToContacts", form);
  }
  public static dataURLtoFile(dataurl: any, filename: any) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
}
export default Module;