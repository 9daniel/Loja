import { Component } from '@angular/core';
import { DadosService } from '../servicos/dados.service';
import { ToastController } from '@ionic/angular';
import { IProduto } from '../interfaces/IProduto';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {


// Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
slideOpts = {
  initialSlide: 1,
  speed: 400
}

public carrinho = [];

  public listaProdutos = [

    {
      nome: "Nike Air Mag", descricao: "Tênis do futuro", valor: 10000,
      img: "https://hermemboys.files.wordpress.com/2016/04/nike-air-mag-e1404400240800.jpg?w=864",
      quantidade: 0
    },

    {
      nome: "Slyde Smarthwacth", descricao: "Relógio do futuro", valor: 9000,
      img: "https://mentesemfio.files.wordpress.com/2013/08/smartwatch.jpg",
      quantidade: 0
    },

    {
      nome: "Iphone 11", descricao: "Celular do futuro", valor: 12000,
      img: "https://www.nocreasnada.com/wp-content/uploads/2017/01/2017-01-18_587f35cc4412c_images40.jpg",
      quantidade: 0
    },
  ];


  constructor(public ds: DadosService, public toastController: ToastController) { }
 
  public async addCarrinhoToast(produto: IProduto) {

    const index = this.carrinho.indexOf(produto);

    if (index > -1){
      this.carrinho[index].quantidade +=1;
    }
    else
    {
      produto.quantidade = 1;
      this.carrinho.push(produto);
    }   

    this.ds.setDados('carrinho',this.carrinho);
    
    const toast = await this.toastController.create({
      message: produto.nome + ' adicionado ao Carrinho!!!',
      duration: 1500
    });
    toast.present();

}



}
