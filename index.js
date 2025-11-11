// index.js
require("dotenv").config();
console.log("TOKEN LIDO:", process.env.DISCORD_TOKEN);
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.on("clientReady", () => {
  console.log(`🤖 Bot logado como ${client.user.tag}`);
});

// =========================
//  /ESPOLIO
// =========================
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "espolio") {

    // DADOS BÁSICOS
    const nome = interaction.options.getString("nome");
    const mestre = interaction.options.getString("mestre");
    const xp = interaction.options.getInteger("xp");
    const ouro = interaction.options.getInteger("ouro");
    const inspiracao = interaction.options.getBoolean("inspiracao");

    // Jogadores marcáveis com @
    const jogadores = [];
    for (let i = 1; i <= 6; i++) {
      const jogador = interaction.options.getUser(`jogador${i}`);
      const pj = interaction.options.getString(`pj${i}`);

      if (jogador || pj) {
        jogadores.push(
          `**Jogador ${i}:** ${jogador ? jogador : "—"}\n**Personagem:** ${pj ? pj : "—"}`
        );
      }
    }

    // CRIA EMBED
    const embed = new EmbedBuilder()
      .setTitle(`📜 Espólio — ${nome}`)
      .setColor("Gold")
      .addFields(
        { name: "🎲 Mestre", value: mestre },
        { name: "⭐ XP", value: `${xp} XP` },
        { name: "💰 Ouro", value: `${ouro} PO` },
        { name: "✨ Inspiração", value: inspiracao ? "Sim" : "Não" },
      );

    if (jogadores.length > 0) {
      embed.addFields({
        name: "🧙 Participantes",
        value: jogadores.join("\n\n")
      });
    }

    const obs = interaction.options.getString("observacao");
    if (obs) {
      embed.addFields({ name: "📝 Observação", value: obs });
    }

    await interaction.reply({ embeds: [embed] });
  }

  // =========================
  //  /RELATORIO (mantido igual)
  // =========================
  if (interaction.commandName === "relatorio") {
    const embed = new EmbedBuilder()
      .setTitle(`📘 Relatório — ${interaction.options.getString("missao")}`)
      .setColor("Blue")
      .setDescription(interaction.options.getString("relatorio"))
      .addFields(
        { name: "🎲 Mestre", value: interaction.options.getString("mestre") },
        { name: "✍ Escritor", value: interaction.options.getString("escritor") }
      );

    const img = interaction.options.getString("imagem");
    if (img) embed.setImage(img);

    await interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.DISCORD_TOKEN);
