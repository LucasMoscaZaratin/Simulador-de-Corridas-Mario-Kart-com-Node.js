const palyer1 = {
  NAME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};
const palyer2 = {
  NAME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
      break;
  }

  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // Draw block
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    // Roll the dice
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    // Skill test
    let totalTesteSkill1 = 0;
    let totalTesteSkill2 = 0;
    if (block == "RETA") {
      totalTesteSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTesteSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(character1.NAME, "velocidade", diceResult1, character1.VELOCIDADE);
      await logRollResult(character2.NAME, "velocidade", diceResult2, character2.VELOCIDADE);
    }
    if (block == "CURVA") {
      totalTesteSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTesteSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(character1.NAME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
      await logRollResult(character2.NAME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
    }
    if (block == "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      console.log(`${character1.NAME} confrontou com ${character2.NAME}! 🥊`);

      await logRollResult(character1.NAME, "poder", diceResult1, character1.PODER);
      await logRollResult(character2.NAME, "poder", diceResult2, character2.PODER);

      if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
        console.log(`${character1.NAME} venceu o confronto! ${character2.NAME} perdeu 1 ponto`);
        character2.PONTOS--;
      }
      if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
        console.log(`${character2.NAME} venceu o confronto! ${character1.NAME} perdeu 1 ponto`);
        character1.PONTOS--;
      }
      console.log(powerResult1 === powerResult2 ? "Confronto empatado, ninguem perdeu ponto" : "");
    }

    //Checking the winner
    if (totalTesteSkill1 > totalTesteSkill2) {
      console.log(`${character1.NAME} marcou 1 ponto!`);
      character1.PONTOS++;
    } else if (totalTesteSkill2 > totalTesteSkill1) {
      console.log(`${character2.NAME} marcou 1 ponto!`);
      character2.PONTOS++;
    }

    console.log("-------------------------------------------------------");
  }
}

async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.NAME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NAME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS) {
    console.log(`\n ${character1.NAME} venceu a corrida!\n Parabens!🏆`);
  } else if (character2.PONTOS > character1.PONTOS) {
    console.log(`\n ${character2.NAME} venceu a corrida!\n Parabens!🏆`);
  } else {
    console.log("A corrida terminou empatada!");
  }
}

(async function main() {
  console.log(`🏁🚦Corrida entre ${palyer1.NAME} e ${palyer2.NAME} começando....🚦🏁\n`);
  await playRaceEngine(palyer1, palyer2);
  await declareWinner(palyer1, palyer2);
})();
