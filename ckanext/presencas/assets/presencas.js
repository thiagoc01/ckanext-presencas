const ESPACO_MAXIMO = 1;     // Máximo de um ano de diferença
let sliderEsquerda = $('.slide:nth-of-type(1)');
let sliderDireita = $('.slide:nth-of-type(2)');
let intervaloSlide = $('.intervalo-slide');
const valorMinimoSlider = sliderEsquerda.attr('min');
const valorMaximoSlider = sliderEsquerda.attr('max');

$('.slide:nth-of-type(1)').on('input change', () => {

    if (parseInt(sliderDireita.val()) - parseInt(sliderEsquerda.val()) <= ESPACO_MAXIMO)
        sliderEsquerda.val(parseInt(sliderDireita.val()) - ESPACO_MAXIMO);

    $('.slide1-val').first().text(sliderEsquerda.val());

    preencheIntervalosSliders();
})

$('.slide:nth-of-type(2)').on('input change', () => {

    if (parseInt(sliderDireita.val()) - parseInt(sliderEsquerda.val()) <= ESPACO_MAXIMO)
        sliderDireita.val(parseInt(sliderEsquerda.val()) + ESPACO_MAXIMO);

    $('.slide2-val').first().text(sliderDireita.val());

    preencheIntervalosSliders();
});

function preencheIntervalosSliders()
{
    porcentagemEsquerda = ( (sliderEsquerda.val() - valorMinimoSlider) / (valorMaximoSlider - valorMinimoSlider) ) * 100;
    porcentagemDireita = ( (sliderDireita.val() - valorMinimoSlider) / (valorMaximoSlider - valorMinimoSlider) ) * 100;
    intervaloSlide.css('background', `linear-gradient(90deg, #e1e7f6 ${porcentagemEsquerda}% ,
        #ef0614 ${porcentagemEsquerda}% , #ef0614 ${porcentagemDireita}%, #e1e7f6 ${porcentagemDireita}%)`);
}

function restauraMinMax()
{
    let primeiroInput = $('.slide:nth-of-type(1)')
    let segundoInput = $('.slide:nth-of-type(2)')

    primeiroInput.val(primeiroInput.attr('min'))
    segundoInput.val(segundoInput.attr('max'))

    sliderEsquerda.trigger('input')
    sliderDireita.trigger('input')
}

function removeParametros()
{
    const url = new URL(window.location.href);

    if (url.searchParams.has('data_inicio'))
    {
        url.searchParams.delete('data_inicio');
        
        window.location = url;
    }
}

function adicionaParametros()
{
    const url = new URL(window.location.href);
    url.searchParams.set('data_inicio', `[${sliderEsquerda.val()} TO ${sliderDireita.val()}]`);
    window.location = url;
}

function verificaExistenciaDataInicio()
{
    const url = new URL(window.location.href);

    if (url.searchParams.has('data_inicio'))
    {
        let data_inicio = url.searchParams.get('data_inicio');

        let [min, max] = data_inicio.match(/[0-9]+/g);

        sliderEsquerda.val(min);
        sliderDireita.val(max);
    }
}

verificaExistenciaDataInicio()
sliderEsquerda.trigger('input')
sliderDireita.trigger('input')

ckan.module("presencas-module", function ($, _) {
  "use strict";
  return {
    options: {
      debug: false,
    },

    initialize: function () {},
  };
});
