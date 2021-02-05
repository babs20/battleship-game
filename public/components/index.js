/* eslint-disable no-undef */
$(() => {
  // let carrierCoords = '';
  // let battleshipCoords = '';
  // let cruiserCoords = '';
  // let submarineCoords = '';
  // let destroyerCoords = '';
  let shipIndex = 0;

  const shipsToAdd = [
    {
      name: 'carrier',
      class: '.carrier',
      shipLength: 5,
    },
    {
      name: 'battleship',
      class: '.battleship',
      shipLength: 4,
    },
    {
      name: 'cruiser',
      class: '.cruiser',
      shipLength: 3,
    },
    {
      name: 'submarine',
      class: '.submarine',
      shipLength: 3,
    },
    {
      name: 'destroyer',
      class: '.destroyer',
      shipLength: 2,
    },
  ];

  const shipPositions = {
    carrier: '',
    battleship: '',
    cruiser: '',
    submarine: '',
    destroyer: '',
  };

  // INSERT SHIP ONTO SCREEN
  $('.game-bounding-box').prepend(`<div class="boat ${shipsToAdd[shipIndex].name}"></div>`);

  // CREATE CONTROLS FOR THE SHIP
  $(document).on('keydown', (event) => {
    const currentShipClass = shipsToAdd[shipIndex].class;
    const shipSpaceNum = 11 - shipsToAdd[shipIndex].shipLength;
    let rs = Number($(`${currentShipClass}`).css('grid-row-start'));
    let cs = Number($(`${currentShipClass}`).css('grid-column-start'));
    let re = Number($(`${currentShipClass}`).css('grid-row-end'));
    let ce = Number($(`${currentShipClass}`).css('grid-column-end'));
    // console.log('RS:', rs, 'CS:', cs, 'RE:', re, 'CE:', ce);

    switch (event.which) {
      case 37: // left
      case 65: // left
        cs -= 1;
        ce -= 1;
        $(`${currentShipClass}`).css('grid-area', `${rs} / ${cs} / ${re} / ${ce}`);
        break;

      case 38:
      case 87: // up
        rs -= 1;
        re -= 1;
        $(`${currentShipClass}`).css('grid-area', `${rs} / ${cs} / ${re} / ${ce}`);
        break;

      case 39:
      case 68: // right
        if ((cs === shipSpaceNum && ce === 11)) {
          $(`${currentShipClass}`).css('grid-area', `${rs} / 1 / ${re} / ${shipsToAdd[shipIndex].shipLength + 1}`);
        } else if ((cs === 10 && ce === 11)) {
          $(`${currentShipClass}`).css('grid-area', `${rs} / 1 / ${re} / 2`);
        } else {
          cs += 1;
          ce += 1;
          $(`${currentShipClass}`).css('grid-area', `${rs} / ${cs} / ${re} / ${ce}`);
        }
        break;
      case 40: // down
      case 83: // down
        if ((rs === 10 && re === 11)) {
          $(`${currentShipClass}`).css('grid-area', `1 / ${cs} / 2 / ${ce}`);
        } else if ((rs === shipSpaceNum && re === 11)) {
          $(`${currentShipClass}`).css('grid-area', `1 / ${cs} / ${shipsToAdd[shipIndex].shipLength + 1} / ${ce}`);
        } else {
          rs += 1;
          re += 1;
          $(`${currentShipClass}`).css('grid-area', `${rs} / ${cs} / ${re} / ${ce}`);
        }
        break;
      case 82: // rotate
        $(`${currentShipClass}`).css('grid-area', `${cs} / ${rs} / ${ce} / ${re}`);
        break;
      default:
    }
  });

  // CONFIRM PLACEMENT, STORE VALUES, CYLCE TO NEXT SHIP
  $(document).on('click', '.confirm-ship', () => {
    const currentShipClass = shipsToAdd[shipIndex].class;
    const rs = Number($(`${currentShipClass}`).css('grid-row-start'));
    const cs = Number($(`${currentShipClass}`).css('grid-column-start'));
    const re = Number($(`${currentShipClass}`).css('grid-row-end'));
    const ce = Number($(`${currentShipClass}`).css('grid-column-end'));

    // *** FEATURE: COLLISION DETECTION ***
    // const rowRange = [rs, re];
    // const colRange = [cs, ce];
    // const invalidRowSpaces = [];
    // const invalidColSpaces = [];

    const coords = `${rs}, ${cs}, ${re}, ${ce}`;
    shipPositions[shipsToAdd[shipIndex].name] = coords;
    shipIndex += 1;
    $('.game-bounding-box').prepend(`<div class="boat ${shipsToAdd[shipIndex].name}"></div>`);
  });

  // SEND INFO TO MAIN PAGE
  $(document).on('click', '.start-game', () => {
    const data = JSON.stringify(shipPositions);
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/',
      data: shipPositions,
    });
  });
});
