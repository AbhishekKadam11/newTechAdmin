import { Injectable } from '@angular/core';

@Injectable()
export class GlobalShared {

  urlpath: string = ((window.location.href).substr(0,5 ) === 'https') ? 'https://newtechserver2.herokuapp.com/' :
    'http://localhost:8080/' ;
  // apiUrl: string = ((window.location.href).substr(0,5 ) === 'https') ? 'https://newtechadmin.netlify.app/.netlify/functions/index' :'http://localhost:8080';
  apiUrl: string = 'https://newtechadmin.netlify.app/.netlify/functions/index';
  //  serverpath: string = 'https://newtechserver2.herokuapp.com/graphql/';
  defaultimage: string = 'assets/images/default-placeholder.png'; // '../assets/images/default-placeholder.png'

}
