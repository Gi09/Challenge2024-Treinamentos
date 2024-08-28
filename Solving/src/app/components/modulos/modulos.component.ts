import { Component, OnInit } from '@angular/core';
import { Treinamentos } from '../../interfaces/treinamentos';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TreinamentosService } from '../../services/treinamentos.service';
import { Location } from '@angular/common';
import { Modulos } from '../../interfaces/modulos';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-modulos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './modulos.component.html',
  styleUrl: './modulos.component.css'
})
export class ModulosComponent {
  modulos = [
    {
      titulo: 'Introdução à Eurofarma',
      descricao: 'A Eurofarma é uma empresa farmacêutica brasileira...',
      certificacao: true,
      preRequisitos: 'Nenhum',
      publico: 'Funcionários e parceiros',
      obrigatorio: true,
      imagem: '/assets/img/5.png',
    },
    {
      titulo: 'Pesquisa e Desenvolvimento',
      descricao: 'Este módulo explora as iniciativas de P&D da Eurofarma...',
      certificacao: true,
      preRequisitos: 'Introdução à Eurofarma',
      publico: 'Profissionais de P&D',
      obrigatorio: true,
      video: '/assets/videos/introducao-erofarma.mp4'
    },
    {
      titulo: 'Produção e Qualidade',
      descricao: 'Neste módulo, exploraremos em profundidade os processos envolvidos na produção de medicamentos na Eurofarma, com um foco especial no controle de qualidade. Você aprenderá sobre as diferentes etapas do ciclo de produção, desde o desenvolvimento das fórmulas até a embalagem final dos produtos. Será abordado como a Eurofarma implementa rigorosos padrões de controle de qualidade para garantir a eficácia e segurança de seus medicamentos, cumprindo as normas internacionais de boas práticas de fabricação. O módulo também inclui uma análise das tecnologias avançadas utilizadas na produção, as metodologias de validação de processos e a importância da manutenção contínua de equipamentos para evitar contaminações e garantir a precisão dos produtos. Ao final, você terá uma compreensão abrangente dos sistemas de gestão de qualidade e das práticas operacionais que asseguram a excelência dos produtos da Eurofarma.',
      certificacao: true,
      preRequisitos: 'Pesquisa e Desenvolvimento',
      publico: 'Engenheiros e Técnicos',
      obrigatorio: true
    }
    ,
    {
      titulo: 'Marketing e Vendas',
      descricao: 'Neste módulo, mergulharemos nas estratégias de marketing e vendas que são fundamentais para o sucesso comercial da Eurofarma. A aula começará com uma introdução aos princípios básicos de marketing, incluindo a definição de mercado-alvo, segmentação de clientes e o desenvolvimento de mensagens de marketing eficazes. Discutiremos as principais técnicas de promoção utilizadas pela Eurofarma para criar e manter uma presença de marca forte no mercado, como campanhas publicitárias, marketing digital e eventos promocionais. Além disso, abordaremos as estratégias de vendas, incluindo a gestão de equipes de vendas, técnicas de negociação e fechamento de negócios. Você aprenderá como as estratégias de marketing e vendas são integradas para maximizar a penetração de mercado e impulsionar o crescimento das receitas. O módulo também inclui estudos de caso práticos que ilustram como a Eurofarma aplica essas estratégias no mundo real, além de ferramentas e métricas usadas para medir a eficácia das campanhas e ajustar as abordagens conforme necessário. Ao final deste módulo, você terá uma compreensão abrangente das melhores práticas de marketing e vendas e como elas podem ser aplicadas para alcançar resultados excepcionais na área comercial.',
      certificacao: true,
      preRequisitos: 'Nenhum',
      publico: 'Área Comercial',
      obrigatorio: false,
      imagem: '/assets/img/7.png',
    }
    ,
    {
      titulo: 'Normas regulamentadoras',
      descricao: 'Normas regulamentadoras existentes e suas principais caracteristicas',
      certificacao: true,
      preRequisitos: 'Nenhum',
      publico: 'Geral',
      obrigatorio: false,
      video: '/assets/videos/normas.mp4'
    }
  ];

  moduloAtual = 0;
  moduloSelecionado: any;
  sanitizedVideoUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer, private location: Location) {
    this.selecionarModulo(this.moduloAtual);
  }

  selecionarModulo(index: number): void {
    this.moduloAtual = index;
    this.moduloSelecionado = this.modulos[index];
    this.sanitizedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.moduloSelecionado.video);
  }

  proximoModulo(): void {
    if (this.moduloAtual < this.modulos.length - 1) {
      this.selecionarModulo(this.moduloAtual + 1);
    }
  }

  voltarPagina(): void {
    this.location.back();
  }
}
