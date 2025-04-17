
// Classe base dos personagens

/*
    - Race : raça do personagem
    - Level : level do personagem
    - PointsPerLevel : pontos ganhados por level
    - FreePoints : Pontos que você pode usar em qualquer stat (1 por level em qualquer raça)
    - Stats : {
        Health max,
        Ki max,
        Melee damage,
        Ki damage,
        Melee resistance,
        Ki resistance,
        Speed
    }
    - Prestige
    - Rebirth

    -- Para namekuseijins! --
    Adicionar mais 40 (20 do Kami e 20 do Nail) pontos livres.


*/

const listaRaças = [{ "Namekian": 2, "Human": 2, "Majin": 2, "Arcosian": 2, "Android": 1, "Saiyan": 3 }];


export default class Character {
    constructor(Race) {
        this.Race = Race;
        this.PointsPerLevel = -1; // Se o loop não detectar nada, ele vai deixar nesse valor
        this.FreePoints = 2; // Todos começam com 2 pontos logo de início
        this.AlocatedPoints = 0; // Pontos já alocados pelo jogador.
        this.NamekPoints = 0;
        this.Level = 1;

        for (const [k, v] of Object.entries(listaRaças[0])) {
            if (k == Race) {
                if (k == "Namekian") { this.NamekPoints = 40 } // Pontos extras pro namek
                this.PointsPerLevel = v;
                break;
            }
        }

        this.Stats = {
            "HealthMax": 0,
            "KiMax": 0,
            "MeleeDamage": 0,
            "KiDamage": 0,
            "MeleeResistance": 0,
            "KiResistance": 0,
            "Speed": 0,
        };

        this.Prestige = 0;
        this.isDead = false;
        this.Rebirth = false;
    }

    calcPoints(oldLevel) {

        /*
            Cálculo porcentagem do rebirth e prestige:

            Exemplo : Melee * (porcentagem) = valor rebirth/prestige
            1000 * 0.2 = 200 pontos em melee após o prestige



            Pontos atuais + pontos novos; <- Lógica básica

            pontos novos == levelNovo - levelAnterior
            Exemplo: 10 - 9 = +1 ponto pra adicionar
            Exemplo: 5 - 10 = -5 pontos pra adicionar

            Checar se pode dar ponto:

            LevelAtual / PontosPorLevel
            Se for 0, entao pode adicionar
            Se nao, só ignora


        */

        let thisPointsPerLevel = this.PointsPerLevel;
        if (this.isDead) { thisPointsPerLevel = 1; }

        let pointsToAdd = (this.Level - oldLevel) / thisPointsPerLevel;
        let currentPoints;
        if (pointsToAdd < 0) { currentPoints = Math.ceil(pointsToAdd) } else { currentPoints = Math.floor(pointsToAdd) }

        console.log(currentPoints);

        for (const i of Object.keys(this.Stats)) {

            /*if (pointsModule != 0) {
                let moduleIndex = 1;
                let newModule = (this.Level - moduleIndex) % this.PointsPerLevel;

                while (newModule != 0 && moduleIndex < this.Level) { moduleIndex++ }

                currentPoints = Math.floor(((this.Level - moduleIndex) - oldLevel) / this.PointsPerLevel);
            }*/


            this.Stats[i] += currentPoints;
            if (this.Stats[i] < 0) { this.Stats[i] = 0; }

        }

        this.FreePoints = this.FreePoints + (this.Level - oldLevel) + this.NamekPoints;

    }

    doPrestige() {
        // Calcular  20% de todos os stats
        // Aumentar o contador de prestiges
        // Mudar os stats base para os novos
        // Setar o level pra 1
        let newStats = {};

        for (const i of Object.keys(this.Stats)) {
            newStats[i] = Math.floor(this.Stats[i] * 0.2)
            if (this.Rebirth) { newStats[i] += 300 }
        }

        this.Stats = newStats;


        this.Prestige++;
        this.Level = 1;

    }

    goToHeaven() {

        if (this.Rebirth) { return; }

        this.isDead = !this.isDead;

    }

    doRebirth() {
        // Setar que deu rebirth pra true
        // Calcular 10% dos stats
        // Mudar os stats base para os novos
        // Setar o level pra 1


        if (this.Rebirth) { return; }

        this.Rebirth = !this.Rebirth;
        this.isDead = false;

        this.Level = 1;

        let newStats = {};

        for (const i of Object.keys(this.Stats)) {
            newStats[i] = Math.floor(this.Stats[i] * 0.1) + 300
        }

        if (this.Race == "Namekian") { this.NamekPoints = 40; }

        this.Stats = newStats;






    }

    addSkillPoints(target, quantity) {
        if (quantity > this.FreePoints + this.NamekPoints || quantity < 0) { return; }

        let newQuantity = quantity;

        if (this.NamekPoints > 0) {
            this.Stats[target] += Math.abs(this.NamekPoints - quantity);
            this.NamekPoints = Math.max(0, this.NamekPoints - quantity);
            newQuantity = Math.max(0, quantity - this.NamekPoints)
        }

        this.Stats[target] += newQuantity;
        this.FreePoints -= newQuantity;
    }

}
