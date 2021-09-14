import React from "react";
import './Cards.css';

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//# 0 = slokken, 1 = persoon, 2 = man
const soloCards = [
'{1}, draai je weg van de groep. Een andere speler tikt op je rug. Als je raadt wie het was moet de groep {0} drinken, anders moet je zelf drinken',
'{1}, doe een kledingstuk uit of drink {0}',
'{1}, Geef {0} aan de persoon die het best gekleed is',
'{1}, Geef {0} aan de knapste persoon',
'Wie als eerste in de ogen van {1} kijkt drinkt {0}',
'{1} kiest wie {2, choice, 0#zijn|1#haar} glas moet leegdrinken',
'{1} doet iemand uit deze groep na, wie het eerst raadt mag {0} uitdelen',
'{1}, welke film heb je laatst gezien? Wie deze niet heeft gezien drinkt {0}',
'Kop of munt! Als {1} juist is drinkt de groep {0}, anders drinkt {1} {0}',
'Dobbel met een dobbelsteen, aantal ogen = aantal slokken voor {1}',
'{1}, ga melk vragen bij de buren of drink je glas leeg',
'{1}, spin the bottle op wie het landt moet je een zoen geven. Anders 3 slokken',
'{1} ontvriendt een van je ouders op fb of drink {0}',
'Iedereen groter dan {1} drinkt {0}',
'Iedereen kleiner dan {1} drinkt {0}',
'Iemand zet een bekend liedje op (bijvoorbeeld K3 song) en stopt op willekeurig moment. Kan {1} niet verder zingen, dan post {2, choice, 0#hij|1#zij} zichzelf al zingend op social media of drinkt een adje',
'{1} beeldt iets uit, indien niemand het raadt dan drink je zelf {0}, anders mag diegene die het raadt {0} uitdelen',
'Per lettertype dat {1} kan opnoemen mag {2, choice, 0#hij|1#zij} een persoon een slok laten drinken',
'Per wereldwonder dat {1} kent mag {2, choice, 0#hij|1#zij} een persoon een slok laten drinken',
'{1}, doe een beetje drinken van de persoon rechts en links van jou in jouw glas',
'{1} maakt een heksendrankje (combineer wat je maar wil, wees creatief) - de eerste persoon die moet atten doet dit van de heksendrank of trakteert {1} op een drankje naar keuze',
'{1}, neem een slok met een gestrekte arm',
'{1}, ga naar de wc, kies of je je onderbroek achterstevoren gaat dragen. De rest moet zeggen of je gedraaid hebt of niet. Wie fout is drinkt {0}',
];

//# 0 = slokken, 1 = player1, 2 = player2, 3 = man1, 4 = man2
const duoCards = [
'{1} en {2} wisselen een kledingstuk',
'{1} mag iets tekenen op {2}',
'{1} en {2}, geef elkaar een zoen',
'{1} drinkt zoveel slokken als {3, choice, 0#hij|1#zij} wilt, {2} drinkt er dubbel zoveel',
'{1}, doe wat {2} zegt, als je het niet kan, drink {0}',
'{1} en {2} wisselen van gsm en verzenden een bericht',
'{1} en {2}, Neem om ter eerst een slok zonder handen of armen te gebruiken',
'{1} wissel van plaats met {2}',
'{1} en {2}, doe de macarena, de groep beslist wie het het meest sexy uitvoert. De verliezer verliest een kledingstuk',
'{1} doe een bodyshot bij {2}',
'{1} en {2} drinken om de beurt van {1} zijn glas, degene die het glas eindigt mag een opdracht skippen',
'{1} en {2}, maak een papieren vliegtuigje. Wie het verste vliegt mag {0} uidelen',
'{1}, wissel je glas met {2}'
];

//# 0 = slokken
const groupCards = [
'Doe met z\'n allen een dansje',
'Wie ooit voetbal heeft gespeeld/speelt, drinkt {0}',
'Wie ooit heeft geturnd, drinkt {0}',
'Wie ooit handbal heeft gespeeld/speelt, drinkt {0}',
'Wie ooit aan muurklimmen heeft gedaan, drinkt {0}',
'Wie een kat heeft, drinkt {0}',
'Wie een hond heeft, drinkt {0}',
'Handen omhoog! Wie laatst is drinkt {0}',
'Iedereen drinkt {0} en leest zijn laatste verzonden bericht voor naar iemand buiten deze groep',
'Ik ga kamperen en neem mee… De eerste die verkeerd is drinkt {0}',
'Als je ooit iemand gekust hebt uit deze groep, drink {0}',
'Wie de skinnieste broek draagt, drinkt {0}',
'Sta recht! Wie laatst is, drinkt {0}',
'Wie fruitsap drinkt, drinkt {0}',
'Wie deze avond iets gemorst heeft, drinkt {0}',
'Wijs allemaal naar een speler, diegene die het meest is aangeduid drinkt {0}',
'Degene met 1 lettergreep in hun naam, drinken {0}',
'Kijk allemaal naar de grond, tel af, kijk naar iemand. Wie in elkaars ogen kijken moeten {0} drinken',
'Waterval!',
'Piramide!',
'Fuck the dealer!',
'Gezamenlijk shotje!',
'De grond is lava! Laatste die de grond nog aanraakt drinkt {0}',
'Iedereen stemt hond of kat en minderheid drinkt {0}',
'Leg allemaal de gsm op tafel, wie als eerste een melding krijgt drinkt {0}',
'Neem een leuke groepsfoto en stuur hem naar de saaie mensen die er niet konden zijn',
'Tik de grond! Laatste drinkt {0}',
'Raak het plafond! Laatste drinkt {0}',
'Limbotijd! Speel de limbo',
'De laatste persoon op de toiletkamer drinkt {0}',
'Zeg om de beurt een automerk, wie niet meer kan moet het zonder schoenen verder doen',
'Noem om de beurt een porno categorie, wie niet meer kan moet een ronde op een persoon naar keus zijn schoot verder',
'De persoon met de langste naam drinkt {0}',
'De persoon met de grootste snor mag een snorretje tekenen bij iemand zonder of die persoon drinkt 2 slokken',
'Iedereen schuift een plaats op met de klok mee',
'Iedereen schuift een plaats op tegen de klok in',
'Schrijf allemaal een aantal slokken op en doe de papiertjes in een kom. Trek elk een kaart en drink wat er op het kaartje staat',
'De eerste persoon kiest een letter en begint met een land op te noemen dat met deze letter begint. Speel verder tot iemand geen land meer weet, deze drinkt {0}',
'Zeg de naam van een personage van “avatar the last airbender”, wie niet kan aanvullen neemt 4 slokken met telkens een bijpassende move',
]

const nhieCards = [
'Ik heb nog nooit opgeschept over iets wat niet waar is',
'Ik heb nog nooit iets gestolen',
'Ik heb nog nooit gespiekt bij een toets',
'Ik heb nog nooit gelogen in dit spel',
'Ik ben nog nooit uit een café gezet geweest',
'Ik heb nog nooit kauwgom onder een tafel of bank gehangen',
'Ik heb nog nooit naaktfoto’s gestuurd',
'Ik heb nog nooit een kus geweigerd',
'Ik heb nog nooit iemand van hetzelfde geslacht gekust',
'Ik heb nog nooit naakt gezwommen',
'Ik heb nog nooit iemand gekust zonder de naam te weten',
'Ik ben nog nooit in de trein/bus in slaap gevallen en daardoor mijn halte gemist',
'Ik heb nog nooit een crush gehad op een leerkracht',
'Ik heb nog nooit een crush gehad op de broer/zus van een vriend',
'Ik heb nog nooit een verkeersboete gehad',
'Ik heb nog nooit een valse naam gegeven',
'Ik heb het nog nooit uit gemaakt via sms',
'Ik heb nog nooit een vakantievriend(in) gehad',
'Ik heb nog nooit sex gehad in een publieke plaats',
'Ik heb nog nooit een sexy sms naar de verkeerde persoon gestuurd',
'Ik ben nog nooit betrapt geweest tijdens sex/masturberen',
'Ik heb nog nooit geweend tijdens een kinderfilm',
'Ik heb nog nooit mijn ouders bezig gehoord in bed',
'Ik heb nog nooit geslapen in gewone kleren',
'Ik heb nog nooit een cartoon character sexy gevonden',
'Ik heb nog nooit candy Crush gespeeld',
'Ik heb nog nooit een duck face gemaakt bij een selfie',
'Ik heb nog nooit een sms herlezen nadat hij juist verzonden is',
'Ik heb nog nooit een cadeau doorgegeven die ik niet leuk vond',
'Ik heb nog nooit mijn zonnenbril gezocht terwijl hij op mijn hoofd stond',
'Ik heb nog nooit gelogen over mijn leeftijd',
'Ik heb nog nooit de Titanic gezien',
'Ik heb nog nooit kauwgom in mijn haar gehad',
'Ik ben nog nooit naar de directeur gestuurd geweest',
'Ik heb nog nooit een hele dag in pyjama gezeten',
'Ik heb nog nooit mama/papa tegen een leerkracht gezegd',
'Ik heb nog nooit mijn eigen haar geknipt',
'Ik heb nog nooit een pamper ververst',
'Ik heb nog nooit snoep/drinken mee gesmokkeld in de cinema',
'Ik ben nog nooit door het rood gereden',
'Ik heb geen alcohol gedronken voor ik 16 was',
'Ik heb nog nooit gedanst op tafel',
'Ik heb nog nooit een dronken sms gestuurd waar ik later spijt van had',
'Ik ben nog nooit speels geweest met slagroom',
'Ik heb nog nooit met mezelf gespeeld bij het kijken van Youtube videos',
'Ik heb nog nooit gezegd dat ik nooit meer drink',
'Ik heb nog nooit gefantaseerd over iemand uit mijn klas',
'Ik ben nog nooit speels geweest met choco'
];

// # min;max;opdracht;samenvatting met: 0 = slokken, 1 = persoon, 2 = man
const stayingSoloCards = [
  '1;20;Spreek geen Nederlands {1}, Als je betrapt wordt: drink {0};Als {1} Nederlands praat: {0}',
  '10;1;Leugenaar! Als iemand {1} betrapt op de waarheid, drinkt {2, choice, 0#hij|1#zij} {0}; Als {1} de waarheid zegt: {0}',
  '3;5;Elke keer {1} {2, choice, 0#zijn|1#haar} glas wilt bijvullen, moet {2, choice, 0#hij|1#zij} bewijzen dat {2, choice, 0#zijn|1#haar} glas leeg is door het omgekeerd boven {2, choice, 0#zijn|1#haar} hoofd te houden. Indien vergeten: adje; Als {1} {2, choice, 0#zijn|1#haar} glas leeg is: Boven hoofd, anders adje',
  '2;4;{1} is duimkoning. Als hij zijn duim op tafel legt moet iedereen volgen. Wie laatst is drinkt {0};{1} de duimkoning',
  '1;2;{1} wordt vanaf nu aangesproken met {2, choice, 0#meneer|1#mevrouw} de geweldige superieure toffe mens, de eerste die dit niet doet moet op zijn knieën om vergiffenis vragen; Spreek {1} aan met {2, choice, 0#meneer|1#mevrouw} de geweldige superieure toffe mens, anders om vergiffenis vragen'
];

function getCardCounts() {
  return {solo: soloCards.length, duo: duoCards.length, group: groupCards.length, nhie: nhieCards.length, stayingSolo: stayingSoloCards.length};
}


class SoloFactory{
  constructor() {
    this.cards = soloCards.slice();
    shuffleArray(this.cards);
  }

  getCard(slokken, name, male) {
    if (this.cards.length === 0) {
      this.cards = soloCards.slice();
      shuffleArray(this.cards);
    }

    var text = this.cards.pop();

    text = text.replaceAll('{0}', slokken).replaceAll('{1}', name)
    if (male) {
      text = text.replaceAll(/{2, choice, 0#(\w+)\|[^}]*\}/g, '$1');
    }
    else {
      text = text.replaceAll(/{2, choice, 0#[^|]*\|1#(\w+)\}/g, '$1');
    }
    return <SoloCard text={text} />;
  }

  cardCount() {
    return this.cards.length;
  }
};

class SoloCard extends React.Component {
  render() {
    return (
      <div className="solo-card card">
          <span>{this.props.text}</span>
      </div>
    );
  }
}

class DuoFactory{
  constructor() {
    this.cards = duoCards.slice();
    shuffleArray(this.cards);
  }

  getCard(slokken, name1, name2, male1, male2) {

    if (this.cards.length === 0) {
      this.cards = duoCards.slice();
      shuffleArray(this.cards);
    }

    var text = this.cards.pop();

    text = text.replaceAll('{0}', slokken).replaceAll('{1}', name1).replaceAll('{2}', name2);
    if (male1) {
      text = text.replaceAll(/{3, choice, 0#(\w+)\|[^}]*\}/g, '$1');
    }
    else {
      text = text.replaceAll(/{3, choice, 0#[^|]*\|1#(\w+)\}/g, '$1');
    }
    if (male2) {
      text = text.replaceAll(/{4, choice, 0#(\w+)\|[^}]*\}/g, '$1');
    }
    else {
      text = text.replaceAll(/{4, choice, 0#[^|]*\|1#(\w+)\}/g, '$1');
    }
    return <DuoCard text={text} />;
  }

  cardCount() {
    return this.cards.length;
  }
};

class DuoCard extends React.Component {
  render() {
    return (
      <div className="duo-card card">
          <span>{this.props.text}</span>
      </div>
    );
  }
}

class GroupFactory{
  constructor() {
    this.cards = groupCards.slice();
    shuffleArray(this.cards);
  }

  getCard(slokken) { // TODO toch naam voor sommigen

    if (this.cards.length === 0) {
      this.cards = groupCards.slice();
      shuffleArray(this.cards);
    }

    var text = this.cards.pop();

    return <Groupcard text={text.replaceAll('{0}', slokken)} />;
  }

  cardCount() {
    return this.cards.length;
  }
};

class Groupcard extends React.Component {
  render() {
    return (
      <div className="group-card card">
          <span>{this.props.text}</span>
      </div>
    );
  }
}

class NhieFactory{
  constructor() {
    this.cards = nhieCards.slice();
    shuffleArray(this.cards);
  }

  getCard() {

    if (this.cards.length === 0) {
      this.cards = nhieCards.slice();
      shuffleArray(this.cards);
    }

    var text = this.cards.pop();

    return <NhieCard text={text} />;
    
  }

  cardCount() {
    return this.cards.length;
  }
}

class NhieCard extends React.Component {
  render() {
    return (
      <div className="nhie-card card">
        <div className='nhie-title'>Never have I ever...</div>
        <div className='nhie-text'><span>{this.props.text}</span></div>        
      </div>
    );
  }
}

// # min;max;opdracht;samenvatting met: 0 = slokken, 1 = persoon, 2 = man


class StayingSoloFactory {
  constructor(playerCount) {
    this.playerCount = playerCount;
    this.cards = stayingSoloCards.slice();
    shuffleArray(this.cards);
  }

  getCard(slokken, name, male) {

    if (this.cards.length === 0) {
      this.cards = stayingSoloCards.slice();
      shuffleArray(this.cards);
    }


    var text = this.cards.pop();

    const min = this.playerCount * text.match(/(^[^;]+)/)[0];
    const max = this.playerCount * text.match(/^[^;]+;([^;]+);/)[1];
    var samenvatting = text.match(/^[^;]+;[^;]+;[^;]+;(.*)$/)[1]

    text = text.match(/^[^;]+;[^;]+;(.*);.*$/)[1];

    this.index = (this.index+1)%this.cards.length;

    text = text.replaceAll('{0}', slokken).replaceAll('{1}', name)
    if (male) {
      text = text.replaceAll(/{2, choice, 0#(\w+)\|[^}]*\}/g, '$1');
    }
    else {
      text = text.replaceAll(/{2, choice, 0#[^|]*\|1#(\w+)\}/g, '$1');
    }

    samenvatting = samenvatting.replaceAll('{0}', slokken).replaceAll('{1}', name)
    if (male) {
      samenvatting = samenvatting.replaceAll(/{2, choice, 0#(\w+)\|[^}]*\}/g, '$1');
    }
    else {
      samenvatting = samenvatting.replaceAll(/{2, choice, 0#[^|]*\|1#(\w+)\}/g, '$1');
    }
    
    return [<StayingSoloCard text={text} />, {text:samenvatting, turns:getRandomInt(min, max)}];
  }

  cardCount() {
    return this.cards.length;
  }
};

class StayingSoloCard extends React.Component {
  render() {
    return (
      <div className="staying-solo-card card">
          <span>{this.props.text}</span>
      </div>
    );
  }
}

class MiniCard extends React.Component {
  render() {
    return (
      <div className="card-mini">
          <span>{this.props.text}</span>
      </div>
    );
  }
}

export {getCardCounts, SoloFactory, DuoFactory, GroupFactory, NhieFactory, StayingSoloFactory, MiniCard};
