import { UserAddress } from './user-address';


export class UserProfile {
  constructor(
    public id?: any,
    public user_id?: any,
    public userAddress?: UserAddress, // Array
    public gender?: string,    // 0 - Female  1- Male  2-Other
    public firstName?: string,
    public lastName?: string,
    public phoneHome?: any,
    public phoneComercial?: any,
    public mobile?: any  ,
    public photo?: any   ,
    public status?: any  , // 1-admin 2-Colaborador 3-User Premium 4-UsÃ¡rio PadrÃ£o,
    public lang_id?: any ,  // System language
    public birthdate?: any

  ) { }

  }
