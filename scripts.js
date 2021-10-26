/**
 * Skæri, blað, steinn.
 * Spilað gegnum console.
 */
const MAX_BEST_OF = 10;
let wins = 0;
let losses = 0;

//-------------------------------------------------------------------------------------------------
/**
 * Athugar hvort gefin tala sé gild sem best-of gildi.
 * @param {number} bestOf Tala sem skal athuga
 * @return {boolean} true eða false
 */
function isValidBestOf(bestOf) {

  var n = parseInt(bestOf);

  if ((0 < n) && (n % 2 !== 0) && (n < MAX_BEST_OF)) return true;

  return false;
}
//console.assert(isValidBestOf(1) === true, '1 er valid best of');
//console.assert(isValidBestOf(2) === false, '2 er ekki er valid best of');
//console.assert(isValidBestOf(9) === true, '9 er valid best of');

//-------------------------------------------------------------------------------------------------
function playAsText(play) {

  if      (play === '1') return "Skæri";
  else if (play === '2') return "Blað";
  else if (play === '3') return "Steinn";

  return "Óþekkt";
}
//console.assert(playAsText('1') === 'Skæri', '1 táknar skæri');
//console.assert(playAsText('2') === 'Blað', '2 táknar blað');
//console.assert(playAsText('3') === 'Steinn', '3 táknar steinn');
//console.assert(playAsText('foo') === 'Óþekkt', 'Annað er óþekkt');

//-------------------------------------------------------------------------------------------------
function checkGame(player, computer) {
  
  if  (playAsText(player) === "Óþekkt") return -1;

  player   = parseInt(player);
  computer = parseInt(computer);

  if      (player === computer)          return 0;
  else if ((player % 3) + 1 == computer) return 1;
  
  return -1;
}
//console.assert(checkGame('1', '2') === 1, 'Skæri vinnur blað');
//console.assert(checkGame('2', '3') === 1, 'Blað vinnur stein');
//console.assert(checkGame('3', '1') === 1, 'Steinn vinnur skæri');
//console.assert(checkGame('1', '1') === 0, 'Skæri og skæri eru jafntefli');
//console.assert(checkGame('1', '3') === -1, 'Skæri tapar fyrir stein');

//-------------------------------------------------------------------------------------------------
/**
 * Spilar einn leik.
 * @return {boolean} -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function round() {

  var handPlayer = prompt("Hvað setur þú út? Skæri(1), blað(2), eða steinn(3)?");

  if (handPlayer === null) return null;

  var handComputer = Math.floor(Math.random() * 3) + 1;
  handComputer = handComputer.toString();
  var winner = checkGame(handPlayer, handComputer);
  var outcome = "Jafntefli, gerðu aftur.";

  if      (winner === 1)  outcome = "Þú sigrar.";
  else if (winner === -1) outcome = "Tölva sigrar.";

  alert(
    "Þú spilaðir: "     + playAsText(handPlayer) + 
    "\nTölva spilaði: " + playAsText(handComputer) + 
    "\n\n" + outcome
  )

  if (outcome === "Jafntefli, gerðu aftur.") return round();

  return winner;
}

//-------------------------------------------------------------------------------------------------
function play() {

  let amount = prompt("Besta af hve mörgun leikjum? Verður að vera jákvæð oddatala minni en 10.");
  let valid = isValidBestOf(amount);

  if (!valid) {
    //Ef inntak = Escape
    if (amount === null) return;
    //Önnur ólögleg inntök
    console.error(amount + " er ekki löglegt gildi.");
    return;
  }

  //Keyri þetta þar til annaðhvort notandinn eða tölvan vinnur
  var roundWins = 0;
  var roundLosses = 0;

  for (var i = 0; i < amount; i++) {

    var currRound = round();

    if      (currRound === 1)    roundWins++;
    else if (currRound === -1)   roundLosses++;
    else if (currRound === null) break;

    if (roundWins > (amount / 2)) {
      wins++;
      alert("Þú vinnur!!!");
      break;
    }
    else if (roundLosses > (amount / 2)) {
      losses++;
      alert("Tölva vinnur :(");
      break;
    }
  }
}

//-------------------------------------------------------------------------------------------------
//Skoða fjölda leikja og hlutfall sigra hjá notanda
function games() {

  var total = wins + losses;

  if (total === 1) console.log("Þú hefur spilað " + total + " leik.");
  else             console.log("Þú hefur spilað " + total + " leiki.");

  if (total > 0) {
      console.log(
        "Þú hefur unnið " + 
        wins + ", eða " + ((100*wins)/total).toFixed(2) + "% af heild. " + 
        "\nÞú hefur tapað " +
        losses + ", eða " + ((100*losses)/total).toFixed(2) + "% af heild." 
      );
  }
}
