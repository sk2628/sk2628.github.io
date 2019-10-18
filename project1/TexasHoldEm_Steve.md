 # Texas Hold'Em - Project 1 
 ### Game Rules
1. This version of Texas Hold'em game will limit to 2 players (1 dealer and 1 player)
2. Each game may have up to 4 rounds to determine a winner.

    | Round | Description |
    | ------ | ------ |
    | Round 1 (Pre Flop) | Betting round before the board card is revealed |
    | Round 2 (The Flop) | The 3 cards on the table is revealed |
    | Round 3 (The Turn) | The 4th card on the table is revealed |
    | Final Round (The River) | The 5th card on the table is revealed |

##### Round 1 - Pre-flop
1. The minimum chip amount can be pre-determined by the player in the game settings. Big Blind will be the minimum chip amount. Small blind will be half of the big blind amount.
2. Each player will be dealt with 2 card face down (a.k.a hole cards). 
3. The player will be seeing his card face up, and dealer will not be able to see his card. 
4. 3 additional cards will be placed on the table face down (a.k.a community cards)
6. Player will get to make the 1st play option. Options available: Call, Check, Fold or All-In.
7. Dealer will auto match the bet amount or option placed by the player.

##### Round 2 - The Flop
![N|Solid](https://palapoker.com/wp-content/uploads/2016/04/the-flop-1.jpg)
1. Player can judge their possibility of winning based on the 2 hole cards and 3 community cards (Total 5 cards), and make an option selection. 
2. Player can decide to bet, check, fold or all-in. 
3. If player has choose to bet or check, the dealer will match the bet amount. 
4. The game will proceed to next round (The Turn)

##### Round 3 - The Turn
![N|Solid](https://palapoker.com/wp-content/uploads/2016/04/the-turn-1.jpg)
1. Player can judge their possibility of winning based on the 2 hole cards and 4 community cards (Total 6 cards), and make an option selection. 
2. Player can decide to bet, check, fold or all-in. 
3. If player has choose to bet or check, the dealer will match the bet amount. 
4. The game will proceed to next round (The River)

##### Round 4 - The River
![N|Solid](https://palapoker.com/wp-content/uploads/2016/04/the-river-1.jpg)
1. Player can judge their possibility of winning based on the 2 hole cards and 5 community cards (Total 7 cards), and make an option selection. 
2. Player can decide to bet, check, fold or all-in. 
3. Dealer will auto match the bet amount or option placed by the player. The dealer will reveal his card and a winner will be notified.

 ### Winning Conditions
1. The winning result will be based on the Poker Hand Rankings (Refer to Card Rules section)
2. The winner will wins all the chips placed on the table within the game. 
3. If there is a match in the winning result, the game will end with a tie and both the players get to have an equal split amount of the table chips.

 ### Play Options
| Option | Description |
| ------ | ------ |
| Bet | Place an amount greater than or equals to the small blind amount within the same round |
| Call | Place amount to match the biggest wagered player within the same round |
| Check | Skip turn (Only enabled when the other player did not place any amount) |
| Fold |Surrender the game. The other player will win. All the wager on the table will goes to the winner |
| All-In | Place all available amount in the pot on the table |

### Card Rules
[![N|Solid](https://i.ibb.co/S0BXWQt/poker-hand-ranking.png)](https://nodesource.com/products/nsolid)

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job.)

### Future Enhancement
1. Support multiplayers! (Up to 6 players)
2. Support Royal Flush, Straight Flush, 4 of a kind, full house, flush and straight.
3. Multi-language voice
4. Ability to top-up new chips

### Tech

This game make use of the following programming language / framework.
* ###### HTML - Skeleton of the web application
* ###### CSS - styling, positioning and looks & feel
* ###### JavaScript - core game logics
* ###### JQuery - core game logics and for calling of API via AJAX
* ###### Bootstrap - CSS framework on helping on the styling, positioning and looks & feel
* ###### API - deckofcardsapi.com, making use of the card API for shuffling and drawing of card
* ###### API - www.voicerss.org, text to speech API
* ###### Animation reference extracted from [Animista]
 
[Game Rules]: <https://palapoker.com/texas-holdem/>
[API]: <deckofcardsapi.com>
[Animista]: http://animista.net/