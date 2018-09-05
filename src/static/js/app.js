(function ($) {
  $(function () {


    /**
     * form styler
     */

    $('input[type=checkbox], input[type=radio], select').styler();


    /**
     * header search box
     */

    $('.search-button').on('click', (event) => {
      console.log($('.logo:not(.logo--footer)'));
      if (window.innerWidth >= 992) {
        $(`.header-nav, .search-box, .search-form, .${Array.from(event.currentTarget.classList.values()).join('.')}`).toggleClass('active');
      } else if (window.innerWidth >= 768) {
        $(`.search-box, .search-form, .${Array.from(event.currentTarget.classList.values()).join('.')}`).toggleClass('active');
      } else if (window.innerWidth >= 576) {
        $(`.logo:not(.logo--footer), .search-box, .search-form, .${Array.from(event.currentTarget.classList.values()).join('.')}`).toggleClass('active');
      } else {
        $(`.search-box, .search-form, .${Array.from(event.currentTarget.classList.values()).join('.')}`).toggleClass('active');
      }
    });


    /**
     * header xs nav
     */

    const $headerNav = $('.header-nav');

    $('.hamburger-button').on('click', (event) => {
      if (window.innerWidth < 992) {
        $(`.${Array.from(event.currentTarget.classList.values()).join('.')}`).toggleClass('active');
        $headerNav.toggleClass('xs-nav')
      }
    });


    /**
     * header user box
     */

    $('.user-button').on('click', (event) => {
      if (window.innerWidth < 992) {
        $(`.auth-box, .${Array.from(event.currentTarget.classList.values()).join('.')}`).toggleClass('active');
      }
    });


    /**
     * tabs
     */

    $('[data-js-tabs_caption]').on('click', ':not(.active)', (event) => {
      const $current = $(event.currentTarget);
      $current
        .addClass('active')
        .siblings().removeClass('active')
        .closest('[data-js-tabs]').find('[data-js-tabs_content]').removeClass('active')
        .eq($current.index()).addClass('active');
    });


    /**
     * article audio
     */

    const $articleAudioButtons = $('[data-js-audio]');

    $articleAudioButtons.on('click', () => {
      $articleAudioButtons.toggleClass('active')
    });


    /**
     * slider
     */

    const caption = document.querySelector('[data-js-slider-caption]');
    const sliderElement = document.querySelector('[data-js-slider]');
    const similarSliderElement = document.querySelector('[data-js-similar-slider]');
    const sidebarSliderElement = document.querySelector('[data-js-sidebar_slider]');

    if (sliderElement) {
      new Flickity(sliderElement, {
        adaptiveHeight: true,
        cellSelector: '.slider-cell',
        imagesLoaded: true,
        pageDots: false,
        wrapAround: true,
        on: {
          select: function () {
            caption.innerHTML = this.selectedElement.firstElementChild.alt
          }
        }
      });
    }

    if (similarSliderElement && window.innerWidth < 768) {
      new Flickity(similarSliderElement, {
        cellSelector: '.article-card',
        contain: true,
        pageDots: false
      })
    }

    if (window.innerWidth < 992) {

      const groupNodes = (lst, groupBy) => {
        const list = [].slice.call(lst);
        const parent = list[0].parentElement;

        for (let i = 0; i < list.length; i += groupBy) {
          const lastWrapper = document.createElement('div');
          lastWrapper.className = 'wrapper';
          parent.appendChild(lastWrapper);

          [].forEach.call(list.slice(i, i + groupBy), (x) => {
            lastWrapper.appendChild(x);
          });
        }
      };

      groupNodes(document.querySelectorAll('[data-js-tabs_item]'), 3);

      new Flickity(sidebarSliderElement, {
        cellSelector: '.wrapper',
        adaptiveHeight: true,
        percentPosition: false,
        prevNextButtons: false,
        wrapAround: true
      })
    }

  });
})(jQuery);
