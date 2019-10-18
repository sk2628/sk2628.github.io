console.log("Connnected");

//...............................................................................................................
//...............................ojj..............................SSSSSS.........................................
//.PPPPPPPPPP....................ojj.....111.....................SSSSSSSS...Sttt.................................
//.PPPPPPPPPP....................ojj....1111.................... SSSSSSSSS..Sttt.................................
//.PPPPPPPPPPP...................ojj..j11111.................... SSSSSSSSS..Sttt.................................
//.PPPP...PPPP.Prrrrr..ooooooo...ojj..j11111................... SS...SSSSSSStttt..eeeeee..eevv..vvvv..eeeeee....
//.PPPP...PPPP.Prrrrr.roooooooo..ojj..j11111................... SSSS......SStttt.teeeeeee.eevv..vvvv.veeeeeee...
//.PPPPPPPPPPP.Prrrrrrrooooooooo.ojj.....111.................... SSSSSSSS..SStttttteeeeeeeeeevv..vvvvvveeeeeeee..
//.PPPPPPPPPPP.Prrr..rroo...oooo.ojj.....111........ ----...... SSSSSSSSS..Sttt.ttee..eeee.evvvvvvv.vvee..eeee..
//.PPPPPPPPPP..Prr...rroo...oooo.ojj.....111........ ----........SSSSSSSSS.Sttt.tteeeeeeee.evvvvvvv.vveeeeeeee..
//.PPPPPPPPP...Prr...rroo...oooo.ojj.....111........ ----..... SS..SSSSSS.Sttt.tteeeeeeee.evvvvvvv.vveeeeeeee..
//.PPPP........Prr...rroo...oooo.ojj.....111........ ----..... SS....SSSS.Sttt.ttee........vvvvvv..vvee........
//.PPPP........Prr...rrooooooooo.ojj.....111................... SSSSSSSSSS.Sttt.tteeeeeeee..vvvvvv..vveeeeeeee..
//.PPPP........Prr....roooooooo..ojj.....111.................... SSSSSSSSS..Stttttteeeeeee...vvvvvv..vveeeeeee...
//.PPPP........Prr.....ooooooo...ojj.....111.....................SSSSSSSSS..Stttt.teeeeeee....vvvv....veeeeeee...
//......................ooooo....ojj..............................SSSSSS......ttt...eeee................eeee.....
//.............................ooojj.............................................................................
//.............................ooojj.............................................................................
//.............................ooojj.............................................................................
//...............................................................................................................
//.Comment Generator Courtesy: https://codepen.io/sakri/pen/Iklgx................................................


//................................................................
//......CCC................................SSSSSS......SSSSSS.....
//....CCCCCCCC...LLLL..........AAAAA......SSSSSSSS....SSSSSSSS....
//...CCCCCCCCCC..LLLL..........AAAAA.....SSSSSSSSSS..SSSSSSSSSS...
//..CCCCCCCCCCC..LLLL.........AAAAAAA....SSSSSSSSSS..SSSSSSSSSS...
//..CCCC...CCCCC.LLLL.........AAAAAAA...SSSS...SSSSSSSSS...SSSSS..
//.CCCCC....CCCC.LLLL.........AAAAAAA...SSSSSS......SSSSSS........
//.CCCC..........LLLL........AAAAAAAAA...SSSSSSSSS...SSSSSSSSS....
//.CCCC..........LLLL........AAAA.AAAA...SSSSSSSSSS..SSSSSSSSSS...
//.CCCC..........LLLL........AAAAAAAAAA....SSSSSSSSS...SSSSSSSSS..
//.CCCCC....CCCC.LLLL.......AAAAAAAAAAA.SSSS..SSSSSSSSSS..SSSSSS..
//..CCCC...CCCCC.LLLL.......AAAAAAAAAAA.SSSS....SSSSSSSS....SSSS..
//..CCCCCCCCCCC..LLLLLLLLLL.AAAAAAAAAAAASSSSSSSSSSSSSSSSSSSSSSSS..
//...CCCCCCCCCC..LLLLLLLLLLAAAAA....AAAA.SSSSSSSSSS..SSSSSSSSSS...
//....CCCCCCCC...LLLLLLLLLLAAAA.....AAAA..SSSSSSSSS...SSSSSSSSS...
//.....CCCCC...............................SSSSSS......SSSSSS.....
//................................................................

//Card class to store the individual card
class Card {
    constructor(image, value, suit, code, valueNumeric){
        this.image = image;
        this.value = value;
        this.suit = suit;
        this.code = code;
        this.valueNumeric = valueNumeric;
    }
}

//Player class to store individual player info
class Player {
    constructor(playerId, currentBalance, isDealer = false, playerName, isBigBlind = false, isSmallBlind = false){
        this.playerId = playerId;
        this.isDealer = isDealer;
        this.playerName = playerName;
        this.isBigBlind = isBigBlind;
        this.isSmallBlind = isSmallBlind;
        this.currentBalance = currentBalance;
        this.gameAccAmount = 0; //Current game accumulated amount
        this.blindAmount = 0;
        this.preFlopAmount = 0;
        this.preFlopHoldingAmount = 0; //Unconfirmed amount
        this.flopAmount = 0;
        this.flopHoldingAmount = 0; //Unconfirmed amount
        this.turnAmount = 0;
        this.turnHoldingAmount = 0; //Unconfirmed amount
        this.riverAmount = 0;
        this.riverHoldingAmount = 0; //Unconfirmed amount
        this.isTurn = false;
    }

    updateBalance(amount){
        console.log("Updating Balance..." + amount);
        this.currentBalance += parseInt(amount);
        console.log("Updated Balance..." + this.currentBalance);
    }
}

//Settings class
class Settings {
    constructor (textToSpeech = false){
        this.textToSpeech = textToSpeech;
    }
}

//Game class to control the entire game flow and process
class Game {
    constructor(player, deckCount, deckId, minimumAmount = 50){
        this.playerCount = player;
        this.deckCount = deckCount;
        this.deckId = deckId;
        this.minimumAmount = minimumAmount;
        this.dealerCards = [];  //1st and 3rd cards
        this.playerCards = [];  //2nd and 4th cards
        this.communityCards = [];   //5th to 9th cards
        this.players = [];
        this.totalCardCount = 0;
        this.dealerByHighestCard = [];
        this.playerByHighestCard = [];
        this.dealerPair = [];
        this.playerPair = [];
        this.currentRoundPlayerAccBet = 0;
        this.winnerFound = false;
    }

    preFlopCardCount () {
        return (this.playerCount * 2) + 3;
    }

    getTotalCardCount () {
        return (this.totalCardCount);
    }

    generatePlayerProfile (initialBalance) {
        let myPlayer;

        for (let i = 0; i < this.playerCount; i++){
            if(i === 0){
                myPlayer = new Player("id-"+i, initialBalance, true, null, true, false); //Always create dealer first
            }
            else{
                myPlayer = new Player("id-"+i, initialBalance, false, null, false, true); //Create the rest of the players
            }
            this.players.push(myPlayer);
        }
    }

    sortBySuit (arrayParam) {
        // sort by name
        arrayParam.sort(function(a, b) {
            var nameA = a.suit.toUpperCase(); // ignore upper and lowercase
            var nameB = b.suit.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        return arrayParam;
    }

    sortByValue (arrayParam) {
        arrayParam.sort(function (a, b) {
            return a.valueNumeric - b.valueNumeric;
        });
        return arrayParam;
    }

    sortByLargestValue (arrayParam) {
        arrayParam.sort(function (a, b) {
            return b.valueNumeric - a.valueNumeric;
        });
        return arrayParam;
    }

    returnLargestValue (arrayParam) {
        arrayParam.sort(function (a, b) {
            return b.valueNumeric - a.valueNumeric;
        });
        return arrayParam[0].valueNumeric;
    }

    gameReset() {
        this.dealerCards = [];  //1st and 3rd cards
        this.playerCards = [];  //2nd and 4th cards
        this.communityCards = [];   //5th to 9th cards
        this.totalCardCount = 0;
        this.dealerByHighestCard = [];
        this.playerByHighestCard = [];
        this.dealerPair = [];
        this.playerPair = [];
        this.currentRoundPlayerAccBet = 0;
        this.players[0].preFlopHoldingAmount = 0;
        this.players[0].flopHoldingAmount = 0;
        this.players[0].turnHoldingAmount = 0;
        this.players[0].riverHoldingAmount = 0;
        this.players[1].preFlopHoldingAmount = 0;
        this.players[1].flopHoldingAmount = 0;
        this.players[1].turnHoldingAmount = 0;
        this.players[1].riverHoldingAmount = 0;
        this.winnerFound = false;
    }
}

//Helper class is used to perform some handy stuffs
class Helper {
    static formatAmount = (value) => {
        return "$ " + value.toLocaleString();
    }

    //Search helper function - only 1 dealer possible
    static findDealer = (array) => {
        for (var i=0; i < array.length; i++) {
            if (array[i].isDealer == true) {
                return array[i];
            }
        }
    }

    static printMsg = (message, clearMsg) => {
       // if(clearMsg == true){
           $('#status').children().remove();
        //}
        $('<div>').text(message).prependTo('#status');
        console.log(message);
    }

    static printWinningMsg = (message, clearMsg) => {
       if(clearMsg == true){
          $('#winningStatus').children().remove();
        }
        $('<div>').text(message).prependTo('#winningStatus').addClass('tracking-in-contract-bck');
        console.log(message);
    }

    static readOutLoud = (message, activated) => {
        if(activated){
            let apiKey = "4e30f4ad61ac45bf9bb52143f638d1f7";
            let contentLanguage = "en-gb";

            $('#textToSpeech')
                .removeAttr('src')
                .attr('src','http://api.voicerss.org/?key=' + apiKey + '&r=1' + '&hl=' + contentLanguage + '&src=' + message)[0].play();
        }
    }

    static playChipSound = () => {
        $('#textToSpeech')
            .removeAttr('src')
            .attr('src','resources/cleaned/chip.mp3')[0].play();
    }
}

$(() => {
    //Initialize variables
    let responseData, myCard, myGame;
    let myDealer, myPlayer;
    let minimumAmount = 50;
    let tableAmount = 0;
    let currentRound = 0;

    let mySettings = new Settings();
    mySettings.textToSpeech = true;

    const startGame = () => {
        Helper.readOutLoud("Game Started. Good Luck!", mySettings.textToSpeech);
        myGame = new Game();
        myGame.playerCount = 2;
        myGame.deckCount = 4;
        myGame.minimumAmount = minimumAmount;
        myGame.generatePlayerProfile(5000); // Default Amount as $5,000
        myDealer = myGame.players[0];
        myPlayer = myGame.players[1];

        populateInitialBalance(myDealer, myPlayer);
        startNewRound();
    }

    const startNewRound = () => {
        Helper.printWinningMsg("",true);
        createNewDeck();
        startGameDefaultButton();
        populateSmallBigBlind();
    }

//................................
//.....AAAAA.....PPPPPPPPPP..III..
//.....AAAAA.....PPPPPPPPPP..III..
//....AAAAAAA....PPPPPPPPPPP.III..
//....AAAAAAA....PPPP...PPPP.III..
//....AAAAAAA....PPPP...PPPP.III..
//...AAAAAAAAA...PPPPPPPPPPP.III..
//...AAAA.AAAA...PPPPPPPPPPP.III..
//...AAAAAAAAAA..PPPPPPPPPP..III..
//..AAAAAAAAAAA..PPPPPPPPP...III..
//..AAAAAAAAAAA..PPPP........III..
//..AAAAAAAAAAAA.PPPP........III..
//.AAAAA....AAAA.PPPP........III..
//.AAAA.....AAAA.PPPP........III..
//................................
    //Create New Deck and return the deck ID
    const createNewDeck = () => {

        $.ajax({
                url:'https://deckofcardsapi.com/api/deck/new/shuffle/' +
                    '?deck_count=' + myGame.deckCount
            }).done(
                (data)=>{
                    populateNewDeck(data);
                },
                ()=>{
                    console.log('bad request');
                }
        );
    }

    //Draw all cards. and store them in an local array for processing
    const startPreFlop = (deckId) => {
        $.ajax({
                url:'https://deckofcardsapi.com/api/deck/' + deckId +
                    '/draw/?count=' + myGame.getTotalCardCount()

            }).done(
                (data)=>{
                    populatePreFlopCards(data);
                    console.log(data);
                },
                ()=>{
                    console.log('bad request');
                }
        );
    }

//......................................................
//......CCC.............................................
//....CCCCCCCC......AAAAA.....RRRRRRRRRR...DDDDDDDDD....
//...CCCCCCCCCC.....AAAAA.....RRRRRRRRRRR..DDDDDDDDDDD..
//..CCCCCCCCCCC....AAAAAAA....RRRRRRRRRRR..DDDDDDDDDDD..
//..CCCC...CCCCC...AAAAAAA....RRRR...RRRRR.DDDD...DDDD..
//.CCCCC....CCCC...AAAAAAA....RRRR...RRRRR.DDDD....DDD..
//.CCCC...........AAAAAAAAA...RRRRRRRRRRR..DDDD....DDD..
//.CCCC...........AAAA.AAAA...RRRRRRRRRRR..DDDD....DDD..
//.CCCC...........AAAAAAAAAA..RRRRRRRRRRR..DDDD....DDD..
//.CCCCC....CCCC.AAAAAAAAAAA..RRRR..RRRRR..DDDD...DDDD..
//..CCCC...CCCCC.AAAAAAAAAAA..RRRR...RRRR..DDDD...DDDD..
//..CCCCCCCCCCC..AAAAAAAAAAAA.RRRR...RRRR..DDDDDDDDDDD..
//...CCCCCCCCCC.AAAAA....AAAA.RRRR...RRRR..DDDDDDDDDD...
//....CCCCCCCC..AAAA.....AAAA.RRRR...RRRRR.DDDDDDDDD....
//.....CCCCC............................................
//......................................................

    function drawAndRevealCard (round) {
        if (round === 2){ //Flop Stage
            console.log("start");
            setTimeout(drawAndRevealCardSingle, 200, "c1");
            setTimeout(drawAndRevealCardSingle, 1200, "c2");
            setTimeout(drawAndRevealCardSingle, 2200, "c3");
        }
        else if(round === 3){
            setTimeout(drawAndRevealCardSingle, 200, "c4");
        }
        else if(round === 4){
            setTimeout(drawAndRevealCardSingle, 200, "c5");
        }
        else if (round === 5){
            setTimeout(drawAndRevealCardSingle, 200, "d1");
            setTimeout(drawAndRevealCardSingle, 1200, "d2");
        }
    }

    function drawAndRevealCardSingle (card) {
        console.log(myGame.dealerCards[0].image);
        console.log(myGame.dealerCards[1].image);

        switch(card){
            case "c1":
                $('#community1').removeClass('community-card-face-down').css('background-image','url(' + myGame.communityCards[0].image + ')').addClass('communityCards').addClass('community1').addClass('flip-in-ver-left');
                break;
            case "c2":
                $('#community2').removeClass('community-card-face-down').css('background-image','url(' + myGame.communityCards[1].image + ')').addClass('communityCards').addClass('community2').addClass('flip-in-ver-left');
                break;
            case "c3":
                $('#community3').removeClass('community-card-face-down').css('background-image','url(' + myGame.communityCards[2].image + ')').addClass('communityCards').addClass('community3').addClass('flip-in-ver-left');
                break;
            case "c4":
                $('#community4').removeClass('community-card-face-down').css('background-image','url(' + myGame.communityCards[3].image + ')').addClass('communityCards').addClass('community4').addClass('flip-in-ver-left');
                break;
            case "c5":
                $('#community5').removeClass('community-card-face-down').css('background-image','url(' + myGame.communityCards[4].image + ')').addClass('communityCards').addClass('community5').addClass('flip-in-ver-left');
                break;
            case "d1":
                $('#dealer1').removeClass('card-face-down-rotated-dealer1').css('background-image','url(' + myGame.dealerCards[0].image + ')');
                break;
            case "d2":
                $('#dealer2').removeClass('card-face-down-rotated-dealer2').css('background-image','url(' + myGame.dealerCards[1].image + ')');
                break;
            default:
                break;
        }
    }

//............................................................................
//....................................................OOOOOO..................
//.BBBBBBBBBB...UUUU...UUUU.UTTTTTTTTTTTTTTTTTTTTT..OOOOOOOOO...ONNNN...NNNN..
//.BBBBBBBBBBB..UUUU...UUUU.UTTTTTTTTTTTTTTTTTTTTT.OOOOOOOOOOO..ONNNNN..NNNN..
//.BBBBBBBBBBB..UUUU...UUUU.UTTTTTTTTTTTTTTTTTTTTT.OOOOOOOOOOOO.ONNNNN..NNNN..
//.BBBB...BBBB..UUUU...UUUU.....TTTT.......TTTT...TOOOO....OOOO.ONNNNNN.NNNN..
//.BBBB..BBBBB..UUUU...UUUU.....TTTT.......TTTT...TOOO.....OOOO.ONNNNNN.NNNN..
//.BBBBBBBBBBB..UUUU...UUUU.....TTTT.......TTTT...TOOO......OOOOONNNNNNNNNNN..
//.BBBBBBBBBBB..UUUU...UUUU.....TTTT.......TTTT...TOOO......OOOOONNNNNNNNNNN..
//.BBBBBBBBBBB..UUUU...UUUU.....TTTT.......TTTT...TOOO......OOOOONNN.NNNNNNN..
//.BBBB....BBBB.UUUU...UUUU.....TTTT.......TTTT...TOOO.....OOOO.ONNN.NNNNNNN..
//.BBBB...BBBBB.UUUU...UUUU.....TTTT.......TTTT...TOOOO....OOOO.ONNN..NNNNNN..
//.BBBBBBBBBBB..UUUUUUUUUUU.....TTTT.......TTTT....OOOOOOOOOOOO.ONNN...NNNNN..
//.BBBBBBBBBBB..UUUUUUUUUUU.....TTTT.......TTTT.....OOOOOOOOOO..ONNN...NNNNN..
//.BBBBBBBBBB....UUUUUUUUU......TTTT.......TTTT.....OOOOOOOOO...ONNN....NNNN..
//.................UUUUU..............................OOOOOO..................
//............................................................................

    const disabledButton = (button) => {
        button.removeClass().addClass('btn').addClass('btn-secondary').addClass('disabled').addClass('disabledButton');
    }

    const enabledButton = (button) => {
        button.removeClass().addClass('btn').addClass('btn-primary');
    }

    const defaultButton = () => {
        console.log("defaultButton clicked");
        disabledButton($('#betCallBtn'));
        disabledButton($('#checkBtn'));
        disabledButton($('#foldBtn'));
        disabledButton($('#newRoundBtn'));
        //disabledButton($('#startBtn'));
    }

    const checkButtonControl = () => {
         if(currentRound >= 2){ //Enabling check button from round 2 onwards
            enabledButton($('#checkBtn'));
        }
    }

    const startGameDefaultButton = () => {
        enabledButton($('#betCallBtn'));
        disabledButton($('#checkBtn'));
        enabledButton($('#foldBtn'));
        disabledButton($('#startBtn'));
        disabledButton($('#newRoundBtn'));
    }

    const newRoundDefaultButton = () => {
        disabledButton($('#betCallBtn'));
        enabledButton($('#newRoundBtn'));
        disabledButton($('#checkBtn'));
        disabledButton($('#foldBtn'));
    }

    const check = (round) => {
        setAndRotateTurn(myDealer, myPlayer);

        currentRound++;
        setAndRotateTurn(myDealer, myPlayer);

        Helper.printMsg("Round " + round + " completed. Place your bet!");
        drawAndRevealCard(currentRound);

        if (currentRound === 5){
            calculateWinner();
            newRoundDefaultButton();
        }
    }

    const fold = () => {
        myDealer.updateBalance(tableAmount);
        processWinner("Player fold. Dealer won!");
        Helper.readOutLoud("Player fold. Dealer won!", mySettings.textToSpeech);
        newRoundDefaultButton();
        currentRound = 0;
    }

    const betCall = (round) => {
        //PreFlop Round, move the bets to the table, and take turn
        let dealerMatchAmount = 0;

        if(round == 1){
            dealerMatchAmount = (myGame.currentRoundPlayerAccBet + myPlayer.blindAmount) - myDealer.blindAmount;
        }
        else if (round == 2){
            dealerMatchAmount = myGame.currentRoundPlayerAccBet - myDealer.flopHoldingAmount;
        }
        else if (round == 3){
            dealerMatchAmount = myGame.currentRoundPlayerAccBet - myDealer.turnHoldingAmount;
        }
        else if (round == 4){
            dealerMatchAmount = myGame.currentRoundPlayerAccBet - myDealer.riverHoldingAmount;
        }

        //If Dealer does not have the require match amount, then dealer will consider as "ALL-IN"
        if(dealerMatchAmount > myDealer.currentBalance){
            dealerMatchAmount = myDealer.currentBalance;
            Helper.printMsg("Dealer All-In!");
            Helper.readOutLoud("Dealer All-In!", mySettings.textToSpeech);
        }

        if (dealerMatchAmount < 0){
            Helper.printMsg("Please place an additional: " +  Helper.formatAmount(Math.abs(dealerMatchAmount)) + " or more");
            Helper.readOutLoud("Please place an additional: " +  Helper.formatAmount(Math.abs(dealerMatchAmount)) + " or more", mySettings.textToSpeech);
        }

        //No chip was placed. For Pre-flop (Round 1). allow to match against the big blind amount
        else if (dealerMatchAmount === 0 && round > 1){
            Helper.printMsg("Place some chip to bet!");
            Helper.readOutLoud("Place some chip to bet!", mySettings.textToSpeech);
        }

        else if(dealerMatchAmount >= 0){ //Bet match the minimum placed by dealer. proceed to the next stage
            //Update Table after player
            setTableBalance(myGame.currentRoundPlayerAccBet);
            Helper.printMsg("Moved " + myGame.currentRoundPlayerAccBet + " from Player to Table.");
            Helper.readOutLoud("Player bet " + Helper.formatAmount(myGame.currentRoundPlayerAccBet), mySettings.textToSpeech);

            myGame.currentRoundPlayerAccBet = 0; //Reset current bet amount to 0
            populatePlayerBet(myGame.currentRoundPlayerAccBet);

            //Table Handling
            setTableBalance(dealerMatchAmount);
            populateTableBalance();

            //if player raise amount higher than the preflop amount, dealer will automatically match it
            setAndRotateTurn(myDealer, myPlayer);
            updateDealerBet(dealerMatchAmount, currentRound);
            Helper.printMsg("Dealer match with " + Helper.formatAmount(dealerMatchAmount));

            currentRound++;
            checkButtonControl();
            setAndRotateTurn(myDealer, myPlayer);

            Helper.printMsg("Round " + round + " completed. Place your bet!");
            drawAndRevealCard(currentRound);

            if (currentRound === 5){
                calculateWinner();
                newRoundDefaultButton();
            }
        }
    }

//...........................................
//.................OOOOOO....................
//.DDDDDDDDD......OOOOOOOOO...MMMMM...MMMMM..
//.DDDDDDDDDDD...OOOOOOOOOO...MMMMM...MMMMM..
//.DDDDDDDDDDD..OOOOOOOOOOOO..MMMMMM..MMMMM..
//.DDDD...DDDDD.OOOO....OOOO..MMMMMM.MMMMMM..
//.DDDD....DDDD.OOOO....OOOOO.MMMMMM.MMMMMM..
//.DDDD....DDDDDOOO......OOOO.MMMMMM.MMMMMM..
//.DDDD....DDDDDOOO......OOOO.MMMMMM.MMMMMM..
//.DDDD....DDDDDOOO......OOOO.MMMMMMMMMMMMM..
//.DDDD...DDDDD.OOOO....OOOOO.MMM.MMMMMMMMM..
//.DDDD...DDDD..OOOO....OOOO..MMM.MMMMM.MMM..
//.DDDDDDDDDDD..OOOOOOOOOOOO..MMM.MMMMM.MMM..
//.DDDDDDDDDD....OOOOOOOOOO...MMM.MMMMM.MMM..
//.DDDDDDDDD......OOOOOOOOO...MMM.MMMMM.MMM..
//.................OOOOOO....................
//...........................................

    const populateTableBalance = () => {
        $('#tableBetLabel').empty();
        $('#tableBetLabel').text(Helper.formatAmount(tableAmount));
    }

    const setTableBalance = (amount) => {
        tableAmount += parseInt(amount);
    }

    const displayPreFlopCards = () => {

        // $('#dealer1').css('background-image','url(' + myGame.dealerCards[0].image + ')');
        $('#dealer1').removeClass().css('background-image', '').addClass('dealer1').addClass('card-face-down-rotated-dealer1');
        $('#player1').removeClass().css('background-image','').addClass('player1').css('background-image','url(' + myGame.playerCards[0].image + ')');
        // $('#dealer2').css('background-image','url(' + myGame.dealerCards[1].image + ')');
        $('#dealer2').removeClass().css('background-image', '').addClass('dealer2').addClass('card-face-down-rotated-dealer2');
        $('#player2').removeClass().css('background-image','').addClass('player2').css('background-image','url(' + myGame.playerCards[1].image + ')');

        //Display community cards
        $('#community1').removeClass().css('background-image', '').addClass('communityCards').addClass('community1').addClass('community-card-face-down');
        $('#community2').removeClass().css('background-image', '').addClass('communityCards').addClass('community2').addClass('community-card-face-down');
        $('#community3').removeClass().css('background-image', '').addClass('communityCards').addClass('community3').addClass('community-card-face-down');
        $('#community4').removeClass().css('background-image', '');
        $('#community5').removeClass().css('background-image', '');
    }

    const rotateBlind = () => {
        myDealer.isBigBlind = !myDealer.isBigBlind; //take turn to be big blind
        myDealer.isSmallBlind = !myDealer.isSmallBlind; //take turn to be big blind
        myPlayer.isBigBlind = !myPlayer.isBigBlind; //take turn to be small blind
        myPlayer.isSmallBlind = !myPlayer.isSmallBlind; //take turn to be small blind
    }

    const setMinAmount = () => {
        if (typeof myGame != "undefined") {
            myGame.minimumAmount = $('#minAmount').val();
            $('#minAmount').removeAttr('value').attr('placeholder',myGame.minimumAmount);
        }
        else {
            minimumAmount = $('#minAmount').val();
            $('#minAmount').removeAttr('value').attr('placeholder',minimumAmount);
        }
    }

    const setAndRotateTurn = (dealer, player) => {
        dealer.isTurn = !dealer.isTurn;
        player.isTurn = !player.isTurn;

        if(dealer.isTurn){
            disabledButton($('#betCallBtn'));
            Helper.printMsg("Dealer's Turn");
        }
        else{
            enabledButton($('#betCallBtn'));
            Helper.printMsg("Player's Turn");
        }
        populateTurnImage(currentRound);
    }

    const setBetAmount = (value, round) => {
        let amount;

        if(round >= 5){
            Helper.printMsg("Game completed. No chips is allowed. ");
            return;
        }

        switch(value){
            case "blueChipArea":
                amount = 25;
                break;
            case "greenChipArea":
                amount = 50;
                break;
            case "blackChipArea":
                amount = 100;
                break;
            case "redChipArea":
                amount = 200;
                break;
            default:
                amount = 0;
        }

        //Do not allow user to go lower than available balance
        if(amount > myPlayer.currentBalance){
            Helper.printMsg("You do not have " + Helper.formatAmount(amount) + ". Current balance is " + Helper.formatAmount(myPlayer.currentBalance));
            Helper.readOutLoud("You do not have " + amount + ". Current balance is " + myPlayer.currentBalance, mySettings.textToSpeech);
            return;
        }
        else{
            updatePlayerBet(amount, round);
        }
    }

    //DOM MANIPULATIONS
    const populateNewDeck = (response) => {
        myGame.totalCardCount = response.remaining;
        myGame.deckId = response.deck_id;;
        startPreFlop(myGame.deckId);
    }

    const populateInitialBalance = (dealer, player) => {
        $('#dealerBalance').empty();
        $('#playerBalance').empty();

        let dealerBalance = dealer.currentBalance;
        let playerBalance = player.currentBalance;
        let $dealerLabel = $('#dealerLabel');
        let $playerLabel = $('#playerLabel');

        $('#dealerBalance').prepend(Helper.formatAmount(dealerBalance));
        $('#playerBalance').prepend(Helper.formatAmount(playerBalance));
    }

    const substituteSuitValueNumeric = (input) => {
        if(input === "JACK"){
            return 11;
        }
        else if (input === "QUEEN"){
            return 12;
        }
        else if (input === "KING"){
            return 13;
        }
        else if (input === "ACE"){
            return 14;
        }
        else{
            return parseInt(input);
        }
    }

    const populatePreFlopCards = (response) => {
        let myCard;
        let cardSequence = 0;

        console.log(response);

        //assign cards to variable
        while(cardSequence < 9){
            for (let i = 0; i < response.cards.length; i++){
                //assign 1st and 3rd card to dealer
                if(response.cards[i].code !== "XX" && (cardSequence === 0 || cardSequence === 2)){ //If Joker Card, then skip next
                    myCard = new Card();
                    myCard.image = response.cards[i].images['svg'];
                    myCard.value = response.cards[i].value;
                    myCard.suit = response.cards[i].suit;
                    myCard.code = response.cards[i].code;
                    myCard.valueNumeric = substituteSuitValueNumeric(response.cards[i].value);
                    myGame.dealerCards.push(myCard);
                    cardSequence++;
                }
                //assign 2nd and 4th card to player
                else if(response.cards[i].code !== "XX" && (cardSequence === 1 || cardSequence === 3)){//If Joker Card, then skip next
                    myCard = new Card();
                    myCard.image = response.cards[i].images['svg'];
                    myCard.value = response.cards[i].value;
                    myCard.suit = response.cards[i].suit;
                    myCard.code = response.cards[i].code;
                    myCard.valueNumeric = substituteSuitValueNumeric(response.cards[i].value);
                    myGame.playerCards.push(myCard);
                    cardSequence++;
                }
                //assign the rest of the card to community (on table)
                else if(response.cards[i].code !== "XX" && (cardSequence >= 4 && cardSequence <= 8)){ //Drawing 5 community card
                    myCard = new Card();
                    myCard.image = response.cards[i].images['svg'];
                    myCard.value = response.cards[i].value;
                    myCard.suit = response.cards[i].suit;
                    myCard.code = response.cards[i].code;
                    myCard.valueNumeric = substituteSuitValueNumeric(response.cards[i].value);
                    myGame.communityCards.push(myCard);
                    cardSequence++;
                }
            }
        }
        //Display the cards on table
        displayPreFlopCards();
    }

    const populateTurnImage = (round) => {
        Helper.printMsg("Round: " + round);
        if(round == 0){
            $('#playerTurn').toggleClass('hide'); //Player Starts first
        }
        else{
            $('#dealerTurn').toggleClass('hide');
            $('#playerTurn').toggleClass('hide');
        }
    }

    //Pre-Flop (Round 1)
    const populateSmallBigBlind = () => {
        let bigBlindAmount = myGame.minimumAmount;
        let placedAmount = 0; //To prevent going below 0
        Helper.printMsg("Big Blind Amount: " + bigBlindAmount, true);
        $('#dealerBigBlind').toggleClass('hide');

        if(myDealer.isBigBlind == true){
            myPlayer.isTurn = true; //Small blind starts first
            myDealer.blindAmount = parseInt(bigBlindAmount);
            myPlayer.blindAmount = parseInt(bigBlindAmount) * 0.5;
            myDealer.updateBalance(-(myDealer.blindAmount));
            myPlayer.updateBalance(-(myPlayer.blindAmount));
            tableAmount = myDealer.blindAmount + myPlayer.blindAmount;
            //$('#dealerBigBlind').toggleClass('hide');
        }
        else if(myPlayer.isBigBlind == true){
            myDealer.isTurn = true; //Small blind starts first
            myPlayer.blindAmount = parseInt(bigBlindAmount);
            myDealer.blindAmount = parseInt(bigBlindAmount) * 0.5;
            myDealer.updateBalance(-(myDealer.blindAmount));
            myPlayer.updateBalance(-(myPlayer.blindAmount));
            tableAmount = myDealer.blindAmount + myPlayer.blindAmount;
            $('#playerBigBlind').toggleClass('hide');
        }

        populateTurnImage(currentRound);
        updateDealerBet(0, currentRound);
        updatePlayerBet(0, currentRound);

        //set Current Round to 1 after setting blinds
        currentRound = 1;
        Helper.printMsg("Current Round: " + currentRound);
    }

    const updateDealerBet = (amount, round) => {
        let tempAmount = parseInt(amount);

        //Round 1 - Preflop
        if(round === 0){
            //$('#dealerBetLabel').text(Helper.formatAmount(myDealer.preFlopHoldingAmount));
            populateDealerBalance();
            populateTableBalance();
            //populateTableBalance(myDealer, '#dealerBalance'); //Refresh table amount
            // populateTableBet(myDealer.preFlopHoldingAmount); //Refresh table amount
        }
        else {
            Helper.printMsg("Dealer adding... " + tempAmount);

            // myDealer.currentBalance -= tempAmount;
            myDealer.updateBalance(-(tempAmount));
            populateDealerBet(Helper.formatAmount(myGame.currentRoundPlayerAccBet));
            populateDealerBalance();
            populateTableBalance();
            Helper.printMsg("Dealer added... " + myGame.currentRoundPlayerAccBet);
            Helper.printMsg("Dealer balance is now... " +  myDealer.currentBalance);
            //populateTableBalance(myDealer, '#dealerBalance'); //Refresh table amount
        }
    }

    const updatePlayerBet = (amount, round) => {
        let tempAmount = parseInt(amount);
        myGame.currentRoundPlayerAccBet += amount;

        if(round === 0){
            populatePlayerBalance();
            populateTableBalance();
        }
        else {  //All Rounds
            Helper.printMsg("Player adding... " + Helper.formatAmount(tempAmount));
            //myPlayer.preFlopHoldingAmount += tempAmount;
            myPlayer.updateBalance(-(tempAmount));
            populatePlayerBet(Helper.formatAmount(myGame.currentRoundPlayerAccBet));
            populatePlayerBalance();
            populateTableBalance();
            Helper.printMsg("Player adding... " + Helper.formatAmount(myGame.currentRoundPlayerAccBet));
            // Helper.printMsg("Player balance is now... " + myPlayer.currentBalance);
            //populateTableBalance(myPlayer, '#playerBalance');
        }
    }

    const populatePlayerBet = (value) => {
        if (value == "0"){
            $('#playerBetLabel').empty();
        }
        else{
            $('#playerBetLabel').text(value);
        }
    }

    const populateDealerBet = (value) => {
        if (value =="0"){
            $('#DealerBetLabel').empty();
        }
        else{
            $('#DealerBetLabel').text(value);
        }
    }

    const populatePlayerBalance = () => {
        $('#playerBalance').text(Helper.formatAmount(myPlayer.currentBalance));
    }

    const populateDealerBalance = () => {
        $('#dealerBalance').text(Helper.formatAmount(myDealer.currentBalance));
    }

    const calculateWinner = () => {
        console.log(myGame);
        //TO-DO: REMOVEW SUBSSTITEU VALUE
        let localDealerCards = myGame.dealerCards.slice(0);
        let localPlayerCards = myGame.playerCards.slice(0);
        let localCommunityCards = myGame.communityCards.slice(0);
        let winnerMessage = "";
        const checkWinningCombination = 10;

        //Combinining 5 community cards + 2 player/dealer cards to form a new array
        for (let i = 0; i < localCommunityCards.length; i++){
            localDealerCards.push(localCommunityCards[i]);
            localPlayerCards.push(localCommunityCards[i]);
        }

        //Step through the checks 10/10
        if (myGame.winnerFound == false){
            winnerMessage = checkThree(localDealerCards, localPlayerCards);
        }
        if (myGame.winnerFound == false){
            winnerMessage = checkPair(localDealerCards, localPlayerCards);
        }
        if (myGame.winnerFound == false){
            winnerMessage = checkHighCard(localDealerCards, localPlayerCards);
        }

        //A winner is found
        if(winnerMessage != ""){
            processWinner(winnerMessage);
        }
    }

    const processWinner = (winnerMessage) => {
        if (winnerMessage != ""){
            Helper.printWinningMsg(winnerMessage);
            Helper.readOutLoud(winnerMessage, mySettings.textToSpeech);
            tableAmount = 0;
            populateTableBalance();
            populatePlayerBalance();
            populateDealerBalance();
        }
    }

    //Check winning combination for high card
    const checkHighCard = (dealerCards, playerCards) => {
        let dealerHighestCard = dealerCards;
        let playerHighestCard = playerCards;

        dealerHighestCard.sort(function (a, b) {
            return b.valueNumeric - a.valueNumeric;
        });
        playerHighestCard.sort(function (a, b) {
            return b.valueNumeric - a.valueNumeric;
        });

        if (dealerHighestCard[0].valueNumeric > playerHighestCard[0].valueNumeric){
            myGame.winnerFound = true;
            myDealer.updateBalance(tableAmount);
            return "Dealer Won! Highest card is: " + dealerHighestCard[0].value;
        }
        else if (dealerHighestCard[0].valueNumeric === playerHighestCard[0].valueNumeric){
            myDealer.updateBalance(tableAmount * 0.5);
            myPlayer.updateBalance(tableAmount * 0.5);
            return "It's a draw! Highest card is: " + dealerHighestCard[0].value;
        }
        else if (playerHighestCard[0].valueNumeric === dealerHighestCard[0].valueNumeric){
            myGame.winnerFound = true;
            myPlayer.updateBalance(tableAmount);
            return "Player Won! Highest card is: " + playerHighestCard[0].value;
        }
        else{
            return ""; //No Winner Found. This will never happen.
        }
    }

    //Check winning combination for 3 card with the same value
    const checkThree = (dealerCards, playerCards) => {
        //Force empty the array to support for multiple round
        let localDealerHighestCard = myGame.sortByLargestValue(dealerCards);
        let localPlayerHighestCard = myGame.sortByLargestValue(playerCards);
        let localDealerPair = [];
        let localPlayerPair = [];

        //Sort and check 3 cards consecutively
        for (let i = 2; i < localDealerHighestCard.length; i++){ //Start from the 3rd element onwards
            if(localDealerHighestCard[i].valueNumeric === localDealerHighestCard[i-1].valueNumeric &&
                localDealerHighestCard[i-2].valueNumeric === localDealerHighestCard[i-1].valueNumeric){
                let tempPairArray = [];
                tempPairArray.push(localDealerHighestCard[i]);
                tempPairArray.push(localDealerHighestCard[i-1]);
                tempPairArray.push(localDealerHighestCard[i-2]);
                localDealerPair.push(tempPairArray); //Push the 3s in the card
                i++; //Skip the card with the pair that was pushed into dealer array
            }
        }

        //Sort and check 3 cards consecutively
        for (let i = 2; i < localPlayerHighestCard.length; i++){
            if(localPlayerHighestCard[i].valueNumeric === localPlayerHighestCard[i-1].valueNumeric &&
                localPlayerHighestCard[i-2].valueNumeric === localPlayerHighestCard[i-1].valueNumeric){
                let tempPlayerArray = [];
                tempPlayerArray.push(localPlayerHighestCard[i]);
                tempPlayerArray.push(localPlayerHighestCard[i-1]);
                tempPlayerArray.push(localPlayerHighestCard[i-2]);
                localPlayerPair.push(tempPlayerArray); //Push the 1st pair card into the player array
                i++; //Skip the card with the pair that was pushed into dealer array
            }
        }

        //if there is no pair
        if (localDealerPair.length === localPlayerPair.length && localDealerPair.length === 0){
            return "No Three(s) found!";
        }
        //If dealer has more pair than player
        else if(localDealerPair.length > localPlayerPair.length){
            myGame.winnerFound = true;
            myDealer.updateBalance(tableAmount);
            return "Dealer won with a " + localDealerPair.length + " threes! ";
        }
        //If player has more pair than dealer
        else if (localPlayerPair.length > localDealerPair.length){
            myGame.winnerFound = true;
            myPlayer.updateBalance(tableAmount);
            return "Player won with a " + localPlayerPair.length + " threes! ";
        }

        //If the number of pairs are the same. Then check the highest pair value. Both having 1 pair
        else if (localDealerPair.length === localPlayerPair.length && localDealerPair.length >= 1) {
            if(localPlayerPair[0][0].valueNumeric > localDealerPair[0][0].valueNumeric){ //Check 1st Card of the Pair
                myGame.winnerFound = true;
                myPlayer.updateBalance(tableAmount);
                return "Player Won with a " + localPlayerPair[0][0].value + " threes!";
            }
            else if(localDealerPair[0][0].valueNumeric > localPlayerPair[0][0].valueNumeric){ //Check 1st Card of the Pair
                myGame.winnerFound = true;
                myDealer.updateBalance(tableAmount);
                return "Dealer Won with a " + localDealerPair[0][0].value + " threes!";
            }
            else{
                return "Dealer draw with player. Both having a set of threes with " + localDealerPair[0][0].value + " value!";
            }
        }
    }

    //Check winning combination for single pair and double pair
    const checkPair = (dealerCards, playerCards) => {
        //Force empty the array to support for multiple round
        let localDealerHighestCard = myGame.sortByLargestValue(dealerCards);
        let localPlayerHighestCard = myGame.sortByLargestValue(playerCards);
        let localDealerPair = [];
        let localPlayerPair = [];

        //Only obtain the 1st 2 pairs dealerPair.
        for (let i = 1; i < localDealerHighestCard.length; i++){
            if(localDealerHighestCard[i].valueNumeric === localDealerHighestCard[i-1].valueNumeric && localDealerPair.length <= 2){
                let tempPairArray = [];
                tempPairArray.push(localDealerHighestCard[i]);
                tempPairArray.push(localDealerHighestCard[i-1]);
                localDealerPair.push(tempPairArray); //Push the 1st pair card into the player array
                i++; //Skip the card with the pair that was pushed into dealer array
            }
        }

        //Only obtain the 1st 2 pairs playerPair.
        for (let i = 1; i < localPlayerHighestCard.length; i++){
            if(localPlayerHighestCard[i].valueNumeric === localPlayerHighestCard[i-1].valueNumeric && localPlayerPair.length <= 2){
                let tempPlayerArray = [];
                tempPlayerArray.push(localPlayerHighestCard[i]);
                tempPlayerArray.push(localPlayerHighestCard[i-1]);
                localPlayerPair.push(tempPlayerArray); //Push the 1st pair card into the player array
                i++; //Skip the card with the pair that was pushed into dealer array
            }
        }

        //if there is no pair
        if (localDealerPair.length === localPlayerPair.length && localDealerPair.length === 0){
            return "No Pair found!"; //No Pair for both dealer and player
        }
        //If dealer has more pair than player. Only check up to the 1st 2 pairs
        else if(localDealerPair.length > localPlayerPair.length && localPlayerPair.length <= 2){
            myGame.winnerFound = true;
            myDealer.updateBalance(tableAmount);
            return "Dealer won with " + localDealerPair.length + " pair! ";
        }
        //If player has more pair than dealer Only check up to the 1st 2 pairs
        else if (localPlayerPair.length > localDealerPair.length && localPlayerPair.length <= 2){
            myGame.winnerFound = true;
            myPlayer.updateBalance(tableAmount);
            return "Player won with " + localPlayerPair.length + " pair! ";
        }

        //If the number of pairs are the same. Then check the highest pair value. Both having 1 pair
        else if (localDealerPair.length === localPlayerPair.length && localDealerPair.length === 1) {
            if(localPlayerPair[0][0].valueNumeric > localDealerPair[0][0].valueNumeric){ //Check 1st Card of the Pair
                myGame.winnerFound = true;
                myPlayer.updateBalance(tableAmount);
                return "Player Won with a " + localPlayerPair[0][0].value + " pair!";
            }
            else if(localDealerPair[0][0].valueNumeric > localPlayerPair[0][0].valueNumeric){ //Check 1st Card of the Pair
                myGame.winnerFound = true;
                myDealer.updateBalance(tableAmount);
                return "Dealer Won with a " + localDealerPair[0][0].value + " pair!";
            }
            else{
                return "Dealer draw with player. Both having 1 pair with " + localDealerPair[0][0].value + " value!";
            }
        }

        //If both dealer and player having 2 pairs
        else if (localDealerPair.length === localPlayerPair.length && localDealerPair.length === 2){
            //If player having the 1st pair value greater than the dealer
            if(localPlayerPair[0][0].valueNumeric > localDealerPair[0][0].valueNumeric){
                myGame.winnerFound = true;
                myPlayer.updateBalance(tableAmount);
                return "Player Won with " + localPlayerPair.length + " pair! " + localPlayerPair[0][0].value + " pair, and " + localPlayerPair[1][0].value;
            }
            //If both player and dealer 1st hair is having the same value
            else if (localPlayerPair[0][0].valueNumeric === localDealerPair[0][0].valueNumeric){
                //if player second pair is higher than dealer second pair
                if (localPlayerPair[1][0].valueNumeric > localDealerPair[1][0].valueNumeric){
                    myGame.winnerFound = true;
                    myPlayer.updateBalance(tableAmount);
                    return "Player Won with 2 pairs. " + localPlayerPair[0][0].value + " pair, and " + localPlayerPair[1][0].value + " pair!";
                }
                //if dealer second pair is higher than player second pair
                else if (localDealerPair[1][0].valueNumeric > localPlayerPair[1][0].valueNumeric){
                    myGame.winnerFound = true;
                    myDealer.updateBalance(tableAmount);
                    return "Dealer Won with 2 pairs. " + localDealerPair[0][0].value + " pair, and " + localDealerPair[1][0].value + " pair!";
                }
                //if both player and dealer having 2 highest pair with both same value
                else {
                    return "Dealer draw with player. Both having 2 pairs. " + localDealerPair[0][0].value + " pair, and " + localDealerPair[1][0].value + " pair!";
                }
            }
            //If dealer having the 1st pair value greater than the player
            else if (localDealerPair[0][0].valueNumeric > localPlayerPair[0][0].valueNumeric){ //Check 1st pair
                myGame.winnerFound = true;
                myDealer.updateBalance(tableAmount);
                return "Dealer Won with " + localDealerPair.length + " pair! " + localDealerPair[0][0].value + " pair, and " + localDealerPair[1][0].value + " pair!";
            }
        }
    }

//..............................................................
//.EEEEEEEEEEEEEVV....VVVV.VEEEEEEEEEE.ENNN....NNN.NNTTTTTTTTT..
//.EEEEEEEEEEEEEVV....VVVV.VEEEEEEEEEE.ENNNN...NNN.NNTTTTTTTTT..
//.EEEEEEEEEEEEEVVV...VVVV.VEEEEEEEEEE.ENNNN...NNN.NNTTTTTTTTT..
//.EEEE........EVVV..VVVV..VEEE........ENNNNN..NNN.....TTTT.....
//.EEEEEEEEEE..EVVV..VVVV..VEEEEEEEEE..ENNNNNN.NNN.....TTTT.....
//.EEEEEEEEEE..EVVVV.VVVV..VEEEEEEEEE..ENNNNNN.NNN.....TTTT.....
//.EEEEEEEEEE...VVVVVVVV...VEEEEEEEEE..ENN.NNNNNNN.....TTTT.....
//.EEEEEEEEEE...VVVVVVVV...VEEEEEEEEE..ENN.NNNNNNN.....TTTT.....
//.EEEE..........VVVVVVV...VEEE........ENN..NNNNNN.....TTTT.....
//.EEEE..........VVVVVV....VEEE........ENN..NNNNNN.....TTTT.....
//.EEEEEEEEEEE...VVVVVV....VEEEEEEEEEE.ENN...NNNNN.....TTTT.....
//.EEEEEEEEEEE....VVVVV....VEEEEEEEEEE.ENN...NNNNN.....TTTT.....
//.EEEEEEEEEEE....VVVV.....VEEEEEEEEEE.ENN....NNNN.....TTTT.....
//..............................................................

    $('#startBtn').on('click', (ev) => {
        ev.preventDefault();
        startGame();
    })

    $('#betCallBtn').on('click', (ev) => {
        ev.preventDefault();
        betCall(currentRound); //Process BetCall Function for current player in play
    })

    $('#checkBtn').on('click', (ev) => {
        ev.preventDefault();
        check(currentRound); //Process check function
    })

    $('#foldBtn').on('click', (ev) => {
        ev.preventDefault();
        fold(); //Player Fold
    })

    $('#newRoundBtn').on('click', (ev) => {
        ev.preventDefault();
        currentRound = 0;
        myGame.gameReset();
        Helper.readOutLoud("New Round. Good Luck!", mySettings.textToSpeech);
        startNewRound();
    })

    $('#confirmAmtButton').on('click', (ev) => {
        ev.preventDefault();
        setMinAmount();
    })

    $('.chipsBet').on('click',(ev) => {
        if (typeof myGame != "undefined") {
            let clickedValue = ev.currentTarget.id;
            ev.preventDefault();
            setBetAmount(clickedValue, currentRound);
            Helper.playChipSound();
        }
    })

    //Chip Mouse Over handling
    $('#blueChipArea').on('mouseover',(ev) => {
        ev.preventDefault();
        $('.blueChip').toggleClass('hide');
    })

    $('#blueChipArea').on('mouseout',(ev) => {
        ev.preventDefault();
        $('.blueChip').toggleClass('hide');
    })

    //Chip Mouse Over handling
    $('#greenChipArea').on('mouseover',(ev) => {
        ev.preventDefault();
        $('.greenChip').toggleClass('hide');
    })

    $('#greenChipArea').on('mouseout',(ev) => {
        ev.preventDefault();
        $('.greenChip').toggleClass('hide');
    })

        //Chip Mouse Over handling
    $('#blackChipArea').on('mouseover',(ev) => {
        ev.preventDefault();
        $('.blackChip').toggleClass('hide');
    })

    $('#blackChipArea').on('mouseout',(ev) => {
        ev.preventDefault();
        $('.blackChip').toggleClass('hide');
    })

            //Chip Mouse Over handling
    $('#redChipArea').on('mouseover',(ev) => {
        ev.preventDefault();
        $('.redChip').toggleClass('hide');
    })

    $('#redChipArea').on('mouseout',(ev) => {
        ev.preventDefault();
        $('.redChip').toggleClass('hide');
    })

    $('#textToSpeechCheckbox').on( 'change', function() {
        if(typeof mySettings != "undefined"){
            if(this.checked){
                mySettings.textToSpeech = true;
            } else {
                mySettings.textToSpeech = false;
            }
        }})

    defaultButton(); //Disabled all button by default
})