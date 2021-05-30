import { Injectable } from '@angular/core';

@Injectable()
export class GlobalShared {

  // urlpath: string = ((window.location.href).substr(0, 5) === 'https') ? 'https://newtechserver2.herokuapp.com/' :
  //   'http://localhost:8080/';
  apiUrl: string = 'https://newtechadminapi.netlify.app/.netlify/functions/index';
  // apiUrl: string = 'http://localhost:8080';
  defaultimage: string = 'assets/images/default-placeholder.png'; 
  // imageUrl: string = 'http://localhost:8080/getFile?filename=';
  // imageUrl: string = 'https://newtechadminapi.netlify.app/.netlify/functions/index/getFile?filename=';
  imageUrl: string = 'https://main-newtech-p6g7tpooam6b2xjm-gtw.qovery.io';

}
