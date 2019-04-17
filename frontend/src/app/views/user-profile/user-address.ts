export class UserAddress {
  constructor(
    public id?: any,
    // public user_id?: any,
    public houseApNum?: string, // Array
    public street?: string,    // 0 - Female  1- Male  2-Other
    public city?: string,
    public state?: string,
    public zip?: any,
    public country?: string

  ) { }

  }
