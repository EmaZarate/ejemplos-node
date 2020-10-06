import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateHeader'
})
export class TranslateHeaderPipe implements PipeTransform {

  transform(value: string, isPercent: string): any {
    const percent = isPercent ? 'porcentaje' : 'bonificación';
    switch (value) {
      case 'name': return 'nombre';
      case 'percent': return percent;
      case 'code': return 'código';
      case 'minimumLimit': return 'Límite mínimo';
      case 'businessName': return 'razón social';
      case 'cellphone': return 'celular';
      case 'username': return 'usuario';
      case 'isNotLocked': return 'usuario habilitado';
      case 'packingName': return 'paquete';
      case 'productName': return 'producto';
      case 'quantity': return 'cantidad';
      case 'state': return 'estado';
      case 'mercadopagopaymentid': return 'ID Mercado Pago';
      case 'price' : return 'Precio';
      case 'packing' : return 'Empaquetado';
      default: return value;
    }
  }

}
