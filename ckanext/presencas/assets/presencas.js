ckan.module("presencas-data-inicio", function ($, _) {

    "use strict";

    return {

        options: {
            debug: false,
        },

        initialize: function () {
            this.restauraMinMax = this.restauraMinMax.bind(this);
            this.removeParametros = this.removeParametros.bind(this);
            this.adicionaParametros = this.adicionaParametros.bind(this);
            this.ESPACO_MAXIMO = 1;     // Máximo de um ano de diferença
            this.sliderEsquerda = this.$('.slide:nth-of-type(1)');
            this.sliderDireita = this.$('.slide:nth-of-type(2)');
            this.intervaloSlide = this.$('.intervalo-slide');
            this.valorMinimoSlider = this.sliderEsquerda.attr('min');
            this.valorMaximoSlider = this.sliderEsquerda.attr('max');

            this.$('.slide:nth-of-type(1)').on('input', () => {

                if (parseInt(this.sliderDireita.val()) - parseInt(this.sliderEsquerda.val()) <= this.ESPACO_MAXIMO)
                    this.sliderEsquerda.val(parseInt(this.sliderDireita.val()) - this.ESPACO_MAXIMO);

                this.$('.slide1-val').first().text(this.sliderEsquerda.val());

                this.preencheIntervalosSliders();
            });

            this.$('.slide:nth-of-type(2)').on('input', () => {

                if (parseInt(this.sliderDireita.val()) - parseInt(this.sliderEsquerda.val()) <= this.ESPACO_MAXIMO)
                    this.sliderDireita.val(parseInt(this.sliderEsquerda.val()) + this.ESPACO_MAXIMO);

                this.$('.slide2-val').first().text(this.sliderDireita.val());

                this.preencheIntervalosSliders();
            });

            this.verificaExistenciaDataInicio();
            this.sliderEsquerda.trigger('input');
            this.sliderDireita.trigger('input');
            this.$('button:nth-of-type(1)').on('click', this.restauraMinMax);
            this.$('button:nth-of-type(2)').on('click', this.removeParametros);
            this.$('button:nth-of-type(3)').on('click', this.adicionaParametros);
            },

            preencheIntervalosSliders:  function () {

                let porcentagemEsquerda = ( (this.sliderEsquerda.val() - this.valorMinimoSlider) /
                                        (this.valorMaximoSlider - this.valorMinimoSlider) ) * 100;
                let porcentagemDireita = ( (this.sliderDireita.val() - this.valorMinimoSlider) /
                                        (this.valorMaximoSlider - this.valorMinimoSlider) ) * 100;
                this.intervaloSlide.css('background', `linear-gradient(90deg, #e1e7f6 ${porcentagemEsquerda}% ,
                    #ef0614 ${porcentagemEsquerda}% , #ef0614 ${porcentagemDireita}%, #e1e7f6 ${porcentagemDireita}%)`);
            },

            verificaExistenciaDataInicio:  function () {

                const url = new URL(window.location.href);

                if (url.searchParams.has('data_inicio'))
                {
                    let data_inicio = url.searchParams.get('data_inicio');

                    let [min, max] = data_inicio.match(/[0-9]+/g);

                    this.sliderEsquerda.val(min);
                    this.sliderDireita.val(max);
                }
            },

            restauraMinMax:  function () {

                let primeiroInput = this.$('.slide:nth-of-type(1)');
                let segundoInput = this.$('.slide:nth-of-type(2)');

                primeiroInput.val(primeiroInput.attr('min'));
                segundoInput.val(segundoInput.attr('max'));

                this.sliderEsquerda.trigger('input');
                this.sliderDireita.trigger('input');
            },

            removeParametros:  function () {

                const url = new URL(window.location.href);

                if (url.searchParams.has('data_inicio'))
                {
                    url.searchParams.delete('data_inicio');

                    window.location = url;
                }
            },

            adicionaParametros: function () {

                const url = new URL(window.location.href);

                url.searchParams.set('data_inicio', `[${this.sliderEsquerda.val()} TO ${this.sliderDireita.val()}]`);

                window.location = url;
            }
        };
});