// deploy-commands.js
require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
  {
    name: "espolio",
    description: "Cria um espólio de missão",
    options: [
      { name: 'nome', description: 'Nome da missão', type: ApplicationCommandOptionType.String, required: true },
      { name: 'mestre', description: 'Nome do mestre', type: ApplicationCommandOptionType.String, required: true },
      { name: 'xp', description: 'XP concedido', type: ApplicationCommandOptionType.Integer, required: true },
      { name: 'ouro', description: 'Ouro concedido', type: ApplicationCommandOptionType.Integer, required: true },
      { name: 'inspiracao', description: 'Inspiração?', type: ApplicationCommandOptionType.Boolean, required: true },

      // JOGADORES (marcar com @)
      { name: 'jogador1', description: 'Jogador 1 (@)', type: ApplicationCommandOptionType.User, required: false },
      { name: 'jogador2', description: 'Jogador 2 (@)', type: ApplicationCommandOptionType.User, required: false },
      { name: 'jogador3', description: 'Jogador 3 (@)', type: ApplicationCommandOptionType.User, required: false },
      { name: 'jogador4', description: 'Jogador 4 (@)', type: ApplicationCommandOptionType.User, required: false },
      { name: 'jogador5', description: 'Jogador 5 (@)', type: ApplicationCommandOptionType.User, required: false },
      { name: 'jogador6', description: 'Jogador 6 (@)', type: ApplicationCommandOptionType.User, required: false },

      // PJs — Nomes livres (sem @)
      { name: 'pj1', description: 'Nome do personagem 1', type: ApplicationCommandOptionType.String, required: false },
      { name: 'pj2', description: 'Nome do personagem 2', type: ApplicationCommandOptionType.String, required: false },
      { name: 'pj3', description: 'Nome do personagem 3', type: ApplicationCommandOptionType.String, required: false },
      { name: 'pj4', description: 'Nome do personagem 4', type: ApplicationCommandOptionType.String, required: false },
      { name: 'pj5', description: 'Nome do personagem 5', type: ApplicationCommandOptionType.String, required: false },
      { name: 'pj6', description: 'Nome do personagem 6', type: ApplicationCommandOptionType.String, required: false },

      { name: 'observacao', description: 'Observações', type: ApplicationCommandOptionType.String, required: false }
    ]
  },

  // ============================
  // RELATORIO
  // ============================
  {
    name: "relatorio",
    description: "Cria um relatório de missão",
    options: [
      { name: "missao", description: "Nome da missão", type: ApplicationCommandOptionType.String, required: true },
      { name: "mestre", description: "Mestre da missão (@)", type: ApplicationCommandOptionType.User, required: true },
      { name: "escritor", description: "Quem escreveu o relatório (@)", type: ApplicationCommandOptionType.User, required: true },
      { name: "relatorio", description: "Texto do relatório", type: ApplicationCommandOptionType.String, required: true },

      // Opcionais
      { name: "imagem", description: "Link da imagem", type: ApplicationCommandOptionType.String, required: false }
    ]
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("⏳ Registrando comandos...");

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log("✔ Comandos registrados com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao registrar comandos:", err);
  }
})();
