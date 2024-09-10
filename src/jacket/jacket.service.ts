import { Injectable } from '@nestjs/common';

@Injectable()
export class JacketService {
  getJacket(id: number): any {
    return {
      id: id,
      name: 'Jacket-1',
      price: 1000,
      color: 'white',
    };
  }

  updateJacket(id: number, jacket: any) {
    jacket.price++;
    return jacket;
  }
}
