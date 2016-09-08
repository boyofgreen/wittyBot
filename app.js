var builder = require('botbuilder');
var restify = require('restify');

// Create bot and bind to console
//var connector = new builder.ConsoleConnector().listen();
//var bot = new builder.UniversalBot(connector);

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());


//Create LUIS recognizer that points at our model and add it as the root '/' dialog for our Cortana Bot.
var model = 'https://api.projectoxford.ai/luis/v1/application?id=9dbee075-2cd5-484b-acf2-52c707a91c47&subscription-key=b898ac53512b426e9d1dd84754adb94c';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);



// Add intent handlers
dialog.matches('impasse', builder.DialogAction.send('I\' afraid so.  I can\'t compete with you physically, and you are no match for me mentally.'));
dialog.matches('areSmart', builder.DialogAction.send('Let me put it this way.  You know Plato, Aristotle, Socrates?...morons'));
dialog.matches('ChalangeDuel', builder.DialogAction.send('For the princess?  To the Death?   Then I accept'));
dialog.matches('pourWine', builder.DialogAction.send('okay'));
dialog.matches('inhaleThis', builder.DialogAction.send('I smell nothing'));
dialog.matches('doNotSmell', builder.DialogAction.send('humm'));
dialog.matches('wherePoison', builder.DialogAction.send('But its so simple. But it\'s so simple. All I have to do is divine from what I know of you. Are you the sort of man who would put the poison into his own goblet, or his enemy\'s? Now, a clever man would put the poison into his own goblet, because he would know that only a great fool would reach for what he was given. I\'m not a great fool, so I can clearly not choose the wine in front of you. But you must have known I was not a great fool; you would have counted on it, so I can clearly not choose the wine in front of me. '));
dialog.matches('madeDecision', builder.DialogAction.send('Not remotely. Because iocane comes from Australia, as everyone knows. And Australia is entirely peopled with criminals. And criminals are used to having people not trust them, as you are not trusted by me. So I can clearly not choose the wine in front of you.'));
dialog.matches('dizzyingIntelect', builder.DialogAction.send('Wait till I get going! Where was I?'));
dialog.matches('austrailia', builder.DialogAction.send('Yes -- Australia, and you must have suspected I would have known the powder\'s origin, so I can clearly not choose the wine in front of me.'));
dialog.matches('stalling', builder.DialogAction.send('You\'d like to think that, wouldn\'t you? You\'ve beaten my giant, which means you\'re exceptionally strong. So, you could have put the poison in your own goblet, trusting on your strength to save you. So I can clearly not choose the wine in front of you. But, you\'ve also bested my Spaniard which means you must have studied. And in studying, you must have learned that man is mortal so you would have put the poison as far from yourself as possible, so I can clearly not choose the wine in front of me.'));
dialog.matches('giveAway', builder.DialogAction.send('It has worked.  you\'ve given everything away. I know where the poison is.'));
dialog.matches('makeChoice', builder.DialogAction.send('I will. And I choose ...what in the world can that be?'));
dialog.matches('whatWhere', builder.DialogAction.send('Oh, well, I-I could have sworn I saw something. No matter..'));
dialog.matches('whatFunny', builder.DialogAction.send('I\'ll tell you in a minute. First, let\'s drink.  me from my glass, and you from yours.'));
dialog.matches('guessWrong', builder.DialogAction.send('You only think I guessed wrong.  that\'s what\'s so funny! I switched glasses when your back was turned. You fool. You fell victim to one of the classic blunders. The most famous is "Never get involved in a land war in Asia." But only slightly less well known is this: "Never go in against a Sicilian when death is on the line." HAHAH HAHAHA HAHAHAHHAH ...AA......'));
dialog.onDefault(builder.DialogAction.send("Inconceivable"));
