
/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
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
'{1}, spin the bottle op wie het landt moet je een kusje geven. Anders 3 slokken',
'{1} ontvriendt een van je ouders op fb of drink {0}',
'Iedereen groter dan {1} drinkt {0}',
'Iedereen kleiner dan {1} drinkt {0}',
'Iemand zet een bekend liedje op (bijvoorbeeld K3 song) en stopt op willekeurig moment. Kan {1} niet verder zingen, dan post {2, choice, 0#hij|1#zij} zichzelf al zingend op social media of drinkt een adje',
'{1} beeldt iets uit, indien niemand het raadt dan drink je zelf {0}, anders mag diegene die het raadt {1} uitdelen',
'Per lettertype dat {1} kan opnoemen mag {2, choice, 0#hij|1#zij} een persoon een slok laten drinken',
'Per wereldwonder dat {1} kent mag {2, choice, 0#hij|1#zij} een persoon een slok laten drinken',
'{1}, doe een beetje drinken van de persoon rechts en links van jou in jouw glas',
'{1} maakt een heksendrankje (combineer wat je maar wil, wees creatief) - de eerste persoon die moet atten doet dit van de heksendrank of trakteert {1} op een drankje naar keuze',
'{1}, neem een slok met een gestrekte arm',
'{1}, ga naar de wc, kies of je je onderbroek achterstevoren gaat dragen. De rest moet zeggen of je gedraaid hebt of niet. Wie fout is drinkt {0}',
]

class SoloFacotry{
  constructor(path) {
    this.cards = soloCards.slice();
    this.index = 0;
    shuffleArray(this.cards);
  }

  getCard(slokken, name, male) {
    var text = this.cards[this.index];
    this.index = (this.index+1)%this.cards.length;

    text = text.replaceAll('{0}', slokken).replaceAll('{1}', name)
    if (male) {
      return text.replaceAll(/{2, choice, 0#(\w+)\|[^}]*\}/g, '$1');
    }
    else 
    return text.replaceAll(/{2, choice, 0#[^|]*\|1#(\w+)\}/g, '$1');
  }
}

export {SoloFacotry}

