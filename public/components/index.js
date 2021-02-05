$(() => {
  // INSERT SHIP ONTO SCREEN
  $('.game-bounding-box').prepend('<div class="boat carrier"></div>');

  // CREATE CONTROLS FOR THE SHIP
  $(document).on('keydown', (event) => {
    let rs = Number($('.carrier').css('grid-row-start'));
    let cs = Number($('.carrier').css('grid-column-start'));
    let re = Number($('.carrier').css('grid-row-end'));
    let ce = Number($('.carrier').css('grid-column-end'));
    console.log('RS:', rs, 'CS:', cs, 'RE:', re, 'CE:', ce);

    // if ((rs === 6 || re === 11) && re - rs === 5) {
    //   rs = 0;
    //   re = 5;
    // }

    // if ((cs === 6 || ce === 11) && ce - cs === 5) {
    //   cs = 0;
    //   ce = 5;
    // }

    switch (event.which) {
      case 37: // left
        cs -= 1;
        ce -= 1;
        $('.boat.carrier').css('grid-area', `${rs} / ${cs} / ${re} / ${ce}`);
        break;

      case 38: // up
        rs -= 1;
        re -= 1;
        $('.boat.carrier').css('grid-area', `${rs} / ${cs} / ${re} / ${ce}`);
        break;

      case 39: { // right
        if ((cs === 6 && ce === 11)) { // bottom fall off
          $('.boat.carrier').css('grid-area', `${rs} / 1 / ${re} / 6`);
        } else if ((cs === 10 && ce === 11)) {
          $('.boat.carrier').css('grid-area', `${rs} / 1 / ${re} / 2`);
        } else {
          cs += 1;
          ce += 1;
          $('.boat.carrier').css('grid-area', `${rs} / ${cs} / ${re} / ${ce}`);
        }
        break;
      }
      case 40: // down
        if ((rs === 10 && re === 11)) { // bottom fall off
          $('.boat.carrier').css('grid-area', `1 / ${cs} / 2 / ${ce}`);
        } else if ((rs === 6 && re === 11)) {
          $('.boat.carrier').css('grid-area', `1 / ${cs} / 6 / ${ce}`);
        } else {
          rs += 1;
          re += 1;
          $('.boat.carrier').css('grid-area', `${rs} / ${cs} / ${re} / ${ce}`);
        }
        break;
      case 82: // rotate
        $('.boat.carrier').css('grid-area', `${cs} / ${rs} / ${ce} / ${re}`);
        console.log('Rotate');
        break;

      default:
    }
  });

  // CONFIRM PLACEMENT AND STORE VALUES

  // REPEAT ABOVE FOR EACH SHIP

  // SEND INFO TO MAIN PAGE
});
