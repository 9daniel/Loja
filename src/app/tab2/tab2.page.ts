import { Component } from '@angular/core';
import { DadosService } from '../servicos/dados.service';
import { IProduto } from '../interfaces/IProduto';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public carrinho = [];

  constructor(public ds:DadosService ,public alertController: AlertController, public rota:Router) {
     }
  

  ionViewDidEnter(){
    this.carrinho = this.ds.getDados('carrinho');
   
  }

  public somatotal(){
    let total=0;
    for (let itens of this.carrinho){
      total += itens.quantidade * itens.valor;
    }
    return total;
  }

  public async finalizarCompra() {
    const alert = await this.alertController.create({
      header: 'Finalizar Compra!',
      message: 'Deseja realmente <strong>Finalizar a sua compra</strong>?',
      buttons: [
        {
          text: 'NÃO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: compra');
          }
        }, {
          text: 'Sim',
          handler: () => {
            let listaCompras = [];
            listaCompras = this.ds.getDados('listaCompras');

            if (listaCompras) {
              listaCompras.push(this.totalProduto());
            } else {
              listaCompras = [];
              listaCompras.push(this.totalProduto());
            }
            this.ds.setDados('listaCompras', listaCompras);
            this.ds.removeDados(false, 'carrinho');
          }
        }
      ]
    });

    await alert.present();

  }
  }