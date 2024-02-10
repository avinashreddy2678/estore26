export interface Products {
    Type: string,
    color: string,
    name: string,
    price: number,
    productImage: Array<string>,
    _id: string,
    size: {
      map(arg0: (item: any) => any): unknown;
      size: string,
      _id: string,
      quantity: string,
    };
  }
  export interface BillBoard{
    BillboardImage:string,
    BillboardTag:string,
    createdAt:Date,
    isActivated:boolean,
    _id:string;
  }
;


