const players = document.querySelectorAll('.player');
let playerTurn = 0;
const table = document.querySelector('.table');

const rules = () => {
  alert(`Reguły:
  - Wersja dla dwóch graczy. 
  - Podajemy liczbę zapałek w grze (10 -150)
  - Ruch polega na zabraniu jednej, dwóch albo trzech zapałek.
  - Przegrywa osoba, która weźmie ostatnią zapałkę.`)
}

const displayMatches = amount => {
  for (let i = 0; i < amount; i++) {
    let match = document.createElement('img');
    match.setAttribute('src', 'match.png');
    document.querySelector('.table').appendChild(match);
  }
  document.querySelectorAll('.matchesLeft').forEach(e => {
    e.textContent = ` ${amount}`;
  });
  document.querySelectorAll('.matchesTaken').forEach(e => {
    e.textContent = 0;
  });
}

while (true) {
  let matchesAmount = Number(prompt('Podaj liczbę zapałek w grze (od 10 do 150):'));
  if (!(matchesAmount < 10) & !(matchesAmount > 150) & !(isNaN(matchesAmount))) {
    while (true) {
      let nickName1 = prompt('Podaj nick pierwszego gracza: ');
      if (nickName1) {
        while (true) {
          let nickName2 = prompt('Podaj nick drugiego gracza: ')
          if (nickName2) {
            let nick2 = document.querySelector('#nick2');
            nick2.textContent = ` ${nickName2}`;
            break;
          }
        }
        let nick1 = document.querySelector('#nick1');
        nick1.textContent = ` ${nickName1}`;
        break;
      }

    }
    displayMatches(matchesAmount);
    break;
  }
}

const removeMatch = (amount, player) => {
  //usuwanie zapałek ze stołu
  for (let i = 0; i < amount; i++) {
    document.querySelector('.table').removeChild(document.querySelector('.table img'));
    if (table.childElementCount < 1) {
      alert(`koniec gry! Wygrał${playerTurn ? document.querySelector('#nick1').textContent : document.querySelector('#nick2').textContent}`);
    }
  }
  //wypisanie ilości pozostałych zapałek u obu graczy
  let matchesAmount = document.querySelector('.matchesLeft').textContent;
  matchesAmount -= amount;
  document.querySelectorAll('.matchesLeft').forEach(e => {
    e.textContent = ` ${matchesAmount}`;
  });
  //określenie ilości pobranych zapałek u każdego gracza podczas jego tury
  if (player == 1) {
    const matchesTaken1 = document.querySelector('.matchesTaken1');
    let currentMatchesTaken1 = Number(matchesTaken1.textContent);
    let newMatchesTaken1 = currentMatchesTaken1 += amount;
    matchesTaken1.textContent = newMatchesTaken1;

  } else {
    const matchesTaken2 = document.querySelector('.matchesTaken2');
    let currentMatchesTaken2 = Number(matchesTaken2.textContent);
    let newMatchesTaken2 = currentMatchesTaken2 += amount;
    matchesTaken2.textContent = newMatchesTaken2;
  }
  //zmiana koloru tła gracza mającego ruch
  players.forEach((player) => player.classList.toggle('active'));

}

const turn = () => {
  let btns1 = document.querySelectorAll('.player1 .btn');
  let btns2 = document.querySelectorAll('.player2 .btn');

  btns1.forEach((btn1) => {
    btn1.addEventListener('click', function () {
      if (btn1.getAttribute('class').includes('one')) {
        if (!playerTurn) {
          removeMatch(1, 1);
        }
        playerTurn = 1;
      } else if (btn1.getAttribute('class').includes('two')) {
        if (!playerTurn) {
          removeMatch(2, 1);
        }
        playerTurn = 1;
      } else if (btn1.getAttribute('class').includes('three')) {
        if (!playerTurn) {
          removeMatch(3, 1);
        }
        playerTurn = 1;
      }
    })
  });

  btns2.forEach((btn2) => {
    btn2.addEventListener('click', function () {
      if (btn2.getAttribute('class').includes('one')) {
        if (playerTurn) {
          removeMatch(1, 2);
        }
        playerTurn = 0;
      } else if (btn2.getAttribute('class').includes('two')) {
        if (playerTurn) {
          removeMatch(2, 2);
        }
        playerTurn = 0;
      } else if (btn2.getAttribute('class').includes('three')) {
        if (playerTurn) {
          removeMatch(3, 2);
        }
        playerTurn = 0;
      }
    })
  });
};

turn();