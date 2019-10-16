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

class Card {
    constructor(image, value, suit, code){
        this.image = image;
        this.value = value;
        this.suit = suit;
        this.code = code;
    }
}

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
        this.currentBalance += parseInt(amount);
    }
}

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
            return a.value - b.value;
        });
        return arrayParam;
    }

    sortByLargestValue (arrayParam) {
        arrayParam.sort(function (a, b) {
            return b.value - a.value;
        });
        return arrayParam;
    }

    returnLargestValue (arrayParam) {
        arrayParam.sort(function (a, b) {
            return b.value - a.value;
        });
        return arrayParam[0].value;
    }

    //Function to handle jack, queen, king, ace and non-numeric
    substituteValue (arrayParam) {
        let tempArray = [];
        let tempValue;

        for (let i = 0; i < arrayParam.length; i++){
            if(arrayParam[i].value === "JACK"){
                arrayParam[i].value = 11;
            }
            else if (arrayParam[i].value === "QUEEN"){
                arrayParam[i].value = 12;
            }
            else if (arrayParam[i].value === "KING"){
                arrayParam[i].value = 13;
            }
            else if (arrayParam[i].value === "ACE"){
                arrayParam[i].value = 14;
            }
            else {
                arrayParam[i].value = parseInt(arrayParam[i].value);
            }
        }
        return arrayParam;
    }
}

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

    //Return 1st player from the array
    static findPlayer = (array) => {
        for (var i=0; i < array.length; i++) {
            if (array[i].isDealer == false) {
                return array[i];
                break;
            }
        }
    }

    //Return the player which is in turn
    static findPlayerInTurn = (array) => {
        for (var i=0; i < array.length; i++) {
            if (array[i].isTurn == true) {
                return array[i];
                break;
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
}

$(() => {
    //Initialize variables
    let responseData, myCard, myGame;
    let myDealer, myPlayer;
    let minimumAmount = 50;
    let tableAmount = 0;
    let currentRound = 0;
    let currentRoundPlayerAccBet = 0;

    const startGame = () => {
        myGame = new Game();
        myGame.playerCount = 2;
        myGame.deckCount = 1;
        myGame.minimumAmount = minimumAmount;
        myGame.generatePlayerProfile(5000); // Default Amount as $5,000
        myDealer = Helper.findDealer(myGame.players);
        myPlayer = Helper.findPlayer(myGame.players);

        createNewDeck();
        populateInitialBalance(myDealer, myPlayer);
        startGameDefaultButton();
        populateSmallBigBlind();
        // setAndRotateTurn(myDealer, myPlayer);
    }

    const disabledButton = (button) => {
        button.removeClass().addClass('btn').addClass('btn-secondary').addClass('disabled').addClass('disabledButton');
    }

    const enabledButton = (button) => {
        button.removeClass().addClass('btn').addClass('btn-primary');
    }

    //Create New Deck and return the deck ID
    const createNewDeck = () => {

        $.ajax({
                url:'https://deckofcardsapi.com/api/deck/new/shuffle/' +
                    '?jokers=0&deck_count=' + myGame.deckCount
            }).then(
                (data)=>{
                    populateNewDeck(data);
                    console.log(data);
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

    const drawAndRevealCard = (round) => {
        if (round === 2){ //Flop Stage
            $('#community1').removeClass('community-card-face-down').css('background-image','url(' + myGame.communityCards[0].image + ')').addClass('communityCards').addClass('community1');
            $('#community2').removeClass('community-card-face-down').css('background-image','url(' + myGame.communityCards[1].image + ')').addClass('communityCards').addClass('community2');
            $('#community3').removeClass('community-card-face-down').css('background-image','url(' + myGame.communityCards[2].image + ')').addClass('communityCards').addClass('community3');
        }
        else if(round === 3){
            $('#community4').removeClass('community-card-face-down').css('background-image','url(' + myGame.communityCards[3].image + ')').addClass('communityCards').addClass('community4');
        }
        else if(round === 4){
            $('#community5').removeClass('community-card-face-down').css('background-image','url(' + myGame.communityCards[4].image + ')').addClass('communityCards').addClass('community5');
        }
        else if (round === 5){
            $('#dealer1').removeClass('card-face-down-rotated').css('background-image','url(' + myGame.dealerCards[0].image + ')');
            // $('#dealer2').css('background-image','url(' + myGame.dealerCards[1].image + ')');
            $('#dealer2').removeClass('card-face-down-rotated').css('background-image','url(' + myGame.dealerCards[1].image + ')');
        }
    }

    const startGameDefaultButton = () => {
        //disabledButton($('#betCallBtn'));
        disabledButton($('#checkBtn'));
        disabledButton($('#raiseBtn'));
        disabledButton($('#foldBtn'));
        disabledButton($('#allInBtn'));
        disabledButton($('#startBtn'));
    }

    // const updateBalance = (dealerOrPlayer, amountToUpdate) => {
    //     dealerOrPlayer.currentBalance += amountToUpdate;
    // }

    const populateTableBalance = () => {
        $('#tableBetLabel').empty();
        $('#tableBetLabel').text(Helper.formatAmount(tableAmount));
    }

    const setTableBalance = (amount) => {
        tableAmount += parseInt(amount);
    }

    const displayPreFlopCards = () => {
        //Display dealer and player cards
        //Hide Dealer and Community Card by default

        // $('#dealer1').css('background-image','url(' + myGame.dealerCards[0].image + ')');
        $('#dealer1').addClass('card-face-down-rotated');
        $('#player1').css('background-image','url(' + myGame.playerCards[0].image + ')');
        // $('#dealer2').css('background-image','url(' + myGame.dealerCards[1].image + ')');
        $('#dealer2').addClass('card-face-down-rotated');
        $('#player2').css('background-image','url(' + myGame.playerCards[1].image + ')');

        //Display community cards
        $('#community1').addClass('community-card-face-down');
        $('#community2').addClass('community-card-face-down');
        $('#community3').addClass('community-card-face-down');

        // $('#community1').css('background-image','url(' + myGame.communityCards[0].image + ')');
        // $('#community2').css('background-image','url(' + myGame.communityCards[1].image + ')');
        // $('#community3').css('background-image','url(' + myGame.communityCards[2].image + ')');
    }

    const rotateBlind = () => {
        //To-DO: To cALL THIS FUNCTion upon completion of the game
        myDealer.isBigBlind = !myDealer.isBigBlind; //take turn to be big blind
        myDealer.isSmallBlind = !myDealer.isSmallBlind; //take turn to be big blind
        myPlayer.isBigBlind = !myPlayer.isBigBlind; //take turn to be small blind
        myPlayer.isSmallBlind = !myPlayer.isSmallBlind; //take turn to be small blind
    }

    const setMinAmount = () => {
        if (typeof mygame != "undefined") {
            myGame.minimumAmount = $('#minAmount').val();
        }
        else {
            minimumAmount = $('#minAmount').val();
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
        updatePlayerBet(amount, round);
    }

    const betCall = (dealerOrPlayer, round) => {
        //PreFlop Round, move the bets to the table, and take turn
        Helper.printMsg("Dealer turn? " + myDealer.isTurn);
        Helper.printMsg("Player turn? " + myPlayer.isTurn);
        let dealerMatchAmount = 0;

        if(round == 1){
            dealerMatchAmount = (currentRoundPlayerAccBet + dealerOrPlayer.blindAmount) - myDealer.blindAmount;
        }
        else if (round == 2){
            dealerMatchAmount = currentRoundPlayerAccBet - myDealer.flopHoldingAmount;
        }
        else if (round == 3){
            dealerMatchAmount = currentRoundPlayerAccBet - myDealer.turnHoldingAmount;
        }
        else if (round == 4){
            dealerMatchAmount = currentRoundPlayerAccBet - myDealer.riverHoldingAmount;
        }

        if(dealerMatchAmount >= 0){ //Bet match the minimum placed by dealer. proceed to the next stage

            //Player Handling - Moved Confirmed Amount and reset preflop amount
            //.preFlopAmount = currentRoundPlayerAccBet;

            //Update Table after player
            setTableBalance(currentRoundPlayerAccBet);
            Helper.printMsg("Moved " + currentRoundPlayerAccBet + " from Player to Table.");

            currentRoundPlayerAccBet = 0; //Reset current bet amount to 0
            populatePlayerBet(currentRoundPlayerAccBet);

            //Table Handling
            setTableBalance(dealerMatchAmount);
            populateTableBalance();

            //if player raise amount higher than the preflop amount, dealer will automatically match it
            setAndRotateTurn(myDealer, myPlayer);
            updateDealerBet(dealerMatchAmount, currentRound);
            Helper.printMsg("Dealer bet: " + Helper.formatAmount(dealerMatchAmount));

            currentRound++;
            setAndRotateTurn(myDealer, myPlayer);

            Helper.printMsg("Round " + round + " completed");
            drawAndRevealCard(currentRound);

            if (currentRound === 5){
                console.log("TO-DO: Determine Winner...");
                calculateWinner(myDealer, myPlayer);
                disabledButton($('#betCallBtn'));
            }
        }
        else{
            alert("Please bet an additional: " + Helper.formatAmount(Math.abs(dealerMatchAmount)));
        }
    }

    //DOM MANIPULATIONS
    const populateNewDeck = (response, deckId) => {
        myGame.totalCardCount = response.remaining
        deckId = response.deck_id;
        myGame.deckId = deckId;
        startPreFlop(deckId);
    }

    const populateInitialBalance = (dealer, player) => {
        console.log(myGame);
        $('#dealerBalance').empty();
        $('#playerBalance').empty();

        let dealerBalance = dealer.currentBalance;
        let playerBalance = player.currentBalance;
        let $dealerLabel = $('#dealerLabel');
        let $playerLabel = $('#playerLabel');

        $('#dealerBalance').prepend(Helper.formatAmount(dealerBalance));
        $('#playerBalance').prepend(Helper.formatAmount(playerBalance));
    }

    const populatePreFlopCards = (response) => {
        let myCard;
        let cardSequence = 0;
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
                    myGame.playerCards.push(myCard);
                    cardSequence++;
                }
                //assign the rest of the card to community (on table)
                else if(response.cards[i].code !== "XX" && (cardSequence >= 3 && cardSequence <= 8)){ //Drawing 5 community card
                    myCard = new Card();
                    myCard.image = response.cards[i].images['svg'];
                    myCard.value = response.cards[i].value;
                    myCard.suit = response.cards[i].suit;
                    myCard.code = response.cards[i].code;
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
        Helper.printMsg("Big Blind Amount: " + bigBlindAmount, true);

        if(myDealer.isBigBlind == true){
            myPlayer.isTurn = true; //Small blind starts first
            myDealer.blindAmount = parseInt(bigBlindAmount);
            myPlayer.blindAmount = parseInt(bigBlindAmount) * 0.5;
            myDealer.updateBalance(-(myDealer.blindAmount));
            myPlayer.updateBalance(-(myPlayer.blindAmount));
            tableAmount = myDealer.blindAmount + myPlayer.blindAmount;
            $('#dealerBigBlind').toggleClass('hide');
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
            populateDealerBet(Helper.formatAmount(currentRoundPlayerAccBet));
            populateDealerBalance();
            populateTableBalance();
            Helper.printMsg("Dealer added... " + currentRoundPlayerAccBet);
            Helper.printMsg("Dealer balance is now... " +  myDealer.currentBalance);
            //populateTableBalance(myDealer, '#dealerBalance'); //Refresh table amount
        }
    }

    const updatePlayerBet = (amount, round) => {
        let tempAmount = parseInt(amount);
        currentRoundPlayerAccBet += amount;

        if(round === 0){
            populatePlayerBalance();
            populateTableBalance();
        }
        else {  //All Rounds
            Helper.printMsg("Player adding... " + tempAmount);
            //myPlayer.preFlopHoldingAmount += tempAmount;
            myPlayer.updateBalance(-(tempAmount));
            populatePlayerBet(Helper.formatAmount(currentRoundPlayerAccBet));
            populatePlayerBalance();
            populateTableBalance();
            Helper.printMsg("Player added... " + currentRoundPlayerAccBet);
            Helper.printMsg("Player balance is now... " + myPlayer.currentBalance);
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

    const calculateWinner = (myDealer, myPlayer) => {
        console.log(myGame);
        let dealerCards = myGame.substituteValue(myGame.dealerCards);
        let playerCards = myGame.substituteValue(myGame.playerCards);
        let communityCards = myGame.substituteValue(myGame.communityCards);
        let winnerFound = 0;

        //Combinining 5 community cards + 2 player/dealer cards to form a new array
        for (let i = 0; i < communityCards.length; i++){
            dealerCards.push(communityCards[i]);
            playerCards.push(communityCards[i]);
        }

        //Step 10/10
        // while(winnerFound = 0){

        // }
        Helper.printMsg(checkPair(dealerCards, playerCards));
        console.log(checkHighCard(dealerCards, playerCards));
        // //Check for Royal Flush
        // for (let i = 0; i < dealerCards.length; i++){
        //     console.log(dealerCards[i].value);
        //     console.log(dealerCards[i].suit);
        // }
    }

    const checkHighCard = (dealerCards, playerCards) => {
        let dealerHighestCard = myGame.sortByLargestValue(dealerCards);
        let playerHighestCard = myGame.sortByLargestValue(playerCards);

        if (dealerHighestCard[0].value > playerHighestCard[0].value)
            return "Dealer Won! Highest card is: " + myGame.returnLargestValue(dealerCards);
        else if (dealerHighestCard[0].value === playerHighestCard[0].value)
            return "It's a draw! Highest card is: " + myGame.returnLargestValue(dealerCards);
        else if (playerHighestCard[0].value === dealerHighestCard[0].value)
            return "Player Won! Highest card is: " + myGame.returnLargestValue(playerCards);
        else
            return false; //No Winner Found. This will never happen.
    }

    const checkPair = (dealerCards, playerCards) => {
        let dealerByHighestCard = myGame.sortByLargestValue(dealerCards);
        let playerByHighestCard = myGame.sortByLargestValue(playerCards);
        let dealerPair = [];
        let playerPair = [];

        //Only obtain the 1st 2 pairs dealerPair.
        for (let i = 1; i < dealerByHighestCard.length; i++){
            if(dealerByHighestCard[i].value === dealerByHighestCard[i-1].value && dealerPair.length <= 4){
                let tempPairArray = [];
                tempPairArray.push(dealerByHighestCard[i]);
                tempPairArray.push(dealerByHighestCard[i-1]);
                dealerPair.push(tempPairArray); //Push the 1st pair card into the player array
                i++ //Skip the card with the pair that was pushed into dealer array
            }
        }

        //Only obtain the 1st 2 pairs playerPair.
        for (let i = 1; i < playerByHighestCard.length; i++){
            if(playerByHighestCard[i].value === playerByHighestCard[i-1].value && playerPair.length <= 2){
                let tempPairArray = [];
                tempPairArray.push(playerByHighestCard[i]);
                tempPairArray.push(playerByHighestCard[i-1]);
                playerPair.push(tempPairArray); //Push the 1st pair card into the player array
                i++ //Skip the card with the pair that was pushed into dealer array
            }
        }

        //Check dealer or player has the highest number of pair count
        if (dealerPair.length === playerPair.length && dealerPair.length === 0){
            Helper.printMsg("No pair found!"); //No Pair for both dealer and player
            return false;
        }
        else if(dealerPair.length > playerPair.length){
            return "Dealer Won with " + dealerPair.length + " pair(s)!";
        }
        else if (dealerPair.length > dealerPair.length){
            return "Player Won with " + playerPair.length + " pair(s)!";
        }
        //If the number of pairs are the same. Then check the highest pair value. Both having 1 pair
        else if (dealerPair.length === playerPair.length && dealerPair.length === 1) {
            if(playerPair[0][0].value > dealerPair[0][0].value){ //Check 1st Card of the Pair
                return "Player Won with " + playerPair[0].value + " pair!";
            }
            else if(dealerPair[0][0].value > playerPair[0][0].value){ //Check 1st Card of the Pair
                return "Dealer Won with " + dealerPair[0][0].value + " pair!";
            }
            else
                return "Dealer draw with player. Both having 1 pair with " + dealerPair[0][0].value + " value!";
        }
        else if (dealerPair.length === playerPair.length && dealerPair.length === 2){
            if(playerPair[0][0].value > dealerPair[0][0].value){ //Check 1st pair
                return "Player Won with " + playerPair[0].value + " pair!";
            }
            else if (playerPair[0][0].value === dealerPair[0][0].value){ //1st pair having the same value
                if (playerPair[1][0].value > dealerPair[1][0].value){ //Check 2nd pair
                    return "Player Won with 2 pairs. " + playerPair[0][0].value + " pair, and " + playerPair[0][1].value + " pair!";
                }
                else if (dealerPair[1][0].value > playerPair[1][0].value){ //Check 2nd pair
                    return "Dealer Won with 2 pairs. " + dealerPair[0][0].value + " pair, and " + dealerPair[0][1].value + " pair!";
                }
                else {
                    return "Dealer draw with player. Both having 2 pairs. " + dealerPair[0][0].value + " pair, and " + dealerPair[0][1].value + " pair!";
                }
            }
        }
        //To-DO: Implement draw with 2 pairs each
    }

    const checkRoyalFlush = () => {
        let tempArray =
            [
                {
                    suit: "DIAMONDS",
                    value: "JACK"
                },
                {
                    suit: "SPADES",
                    value: "QUEEN"
                },
                {
                    suit: "DIAMONDS",
                    value: "5"
                },
                {
                    suit: "SPADES",
                    value: "3"
                },
                {
                    suit: "SPADES",
                    value: "10"
                },
                {
                    suit: "SPADES",
                    value: "ACE"
                },
                {
                    suit: "CLUBS",
                    value: "KING"
                }]

        tempArray = myGame.substituteValue(tempArray);
        console.log(tempArray);
        //console.log(checkHighCard(tempArray));
    }

    //EVENT LISTENER STARTS HERE
    $('#startBtn').on('click', (ev) => {
        ev.preventDefault();
        startGame();
    })

    $('#betCallBtn').on('click', (ev) => {
        ev.preventDefault();
        betCall(Helper.findPlayerInTurn(myGame.players), currentRound); //Process BetCall Function for current player in play
    })

    $('#confirmAmtButton').on('click', (ev) => {
        ev.preventDefault();
        setMinAmount();
    })

    $('#calcWinnerBtn').on('click', (ev) => {
        ev.preventDefault();
        calculateWinner();
    })

    $('.chip').on('click',(ev) => {
        let clickedValue = ev.currentTarget.id;
        ev.preventDefault();

        setBetAmount(clickedValue, currentRound);
    })

    //TO-DO: DRY CODE: CONVERT INTO SINGLE FUNCTION
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
})