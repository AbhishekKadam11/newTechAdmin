import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class GlobalShared {

  urlpath: string = ((window.location.href).substr(0,5 ) === 'https') ? 'https://newtechserver2.herokuapp.com/' :
    'http://localhost:8080/' ;
  apiUrl: string = ((window.location.href).substr(0,5 ) === 'https') ? 'https://newtechadmin.netlify.app/.netlify/functions/index' :'http://localhost:8080';
  // urlpath: string = 'http://localhost:8080/';
  //  serverpath: string = 'https://newtechserver2.herokuapp.com/graphql/';
  defaultimage: string = 'assets/images/default-placeholder.png'; // '../assets/images/default-placeholder.png'

}
