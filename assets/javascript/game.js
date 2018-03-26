var Card = function (n, hp, ap, cap, imgSrc){
    // properties
    this.name = n;
    this.healthPoints = hp;
    this.attackPower = ap;
    this.baseAP = ap;
    this.counterAP = cap;
    this.imageSource = imgSrc;
    this.currentSlot = 0;
    this.newSlot = 0;
    this.currentCharacter = false;
    this.enemy = false;
    this.currentEnemy = false;
    
    // draws the card to a panel and handles clearing the columns
    this.drawCard = function(slotNum, cleared, living) {
        this.newSlot = slotNum;

        // Clears the previous slot the card was in
        if (!(this.currentSlot === 0)){
            var colSlot = $("#slot"+this.currentSlot);
            colSlot.empty();
        }
        
        // targets the new slot for the card to be inserted in
        var colSlot = $("#slot"+this.newSlot);

        // clears the new slot if 1 is passed through the argument
        if (cleared === 1) {
            colSlot.empty();
        }
        
        if (living){
            colSlot.append(
                '<div class="panel panel-primary" id="' + this.name + '">'+
                '<div class="panel-heading">'+
                '<h3 class="panel-title">'+this.name+'</h3>'+
                '</div>'+
                '<div class="panel-body">'+
                '<img src="'+this.imageSource+'" class="img-responsive">'+
                '</div>'+
                '<div class="panel-footer text-center"><span class="badge">HP:'+this.healthPoints+'</span>  <span class="badge">AP:'+this.attackPower+'</span>  <span class="badge">CAP:'+this.counterAP+'</span></div>'+
                '</div>');
        } else {
            colSlot.append(
                '<div class="panel panel-danger" id="' + this.name + '">'+
                '<div class="panel-heading">'+
                '<h3 class="panel-title">'+this.name+'</h3>'+
                '</div>'+
                '<div class="panel-body">'+
                '<img src="'+this.imageSource+'" class="img-responsive">'+
                '</div>'+
                '<div class="panel-footer text-center"><span class="badge">HP:'+this.healthPoints+'</span>  <span class="badge">AP:'+this.attackPower+'</span>  <span class="badge">CAP:'+this.counterAP+'</span></div>'+
                '</div>');
        }
        

        this.currentSlot = this.newSlot;
            
    }

    this.makeEnemy = function() {
        if(this.currentCharacter){
            this.enemy = false;
        } else {
            this.enemy = true;
        }
    }

    this.makeCurrentEnemy = function() {
        this.currentEnemy = true;
        this.drawCard(7,1,true);
    }

    this.makeCharacter = function() {
        this.currentCharacter = true;
    }

    this.getAttack = function() {
        return this.attackPower;
    }

    this.getCounter = function() {
        return this.counterAP;
    }

    this.getHP = function() {
        return this.healthPoints;
    }
    
    this.damage = function(ap) {
        this.healthPoints -= ap;
    }

    this.levelUp = function () {
        this.attackPower += this.baseAP;
    }
};

var obiWan = new Card("Obi-Wan", 10, 15, 20, "assets/images/obiwan.jpg");
var darthMaul = new Card("Darth-Maul", 20, 10, 5, "assets/images/darthmaul.jpeg");
var darthSidious = new Card("Palpatine", 15, 30, 12, "assets/images/darthsidious.jpg");
var luke = new Card("Luke", 20, 10, 10, "assets/images/luke.jpg");



var game = {
    currentCharacter: "",
    currentEnemy: "",
    choosing: true,
    chooseEnemy: false,
    battleReady: false,
    gameState: ["playing", "You Win", "You Lose"],

    clickCharacter: function(chr) {
        
        if (this.choosing){
            switch (chr) {
                case "Luke":
                    luke.drawCard(5,1,true);
                    luke.makeCharacter();
                    break;
                case "Obi-Wan":
                    obiWan.drawCard(5,1,true);
                    obiWan.makeCharacter();
                    break;
                case "Darth-Maul":
                    darthMaul.drawCard(5,1,true);
                    darthMaul.makeCharacter();
                    break;
                case "Palpatine":
                    darthSidious.drawCard(5,1,true);
                    darthSidious.makeCharacter();
                    break;
            }
            this.choosing = false;
            this.chooseEnemy = true;
            this.currentCharacter = chr;
        } else if (this.chooseEnemy){
            switch (chr) {
                case "Luke":
                    luke.makeCurrentEnemy();
                    break;
                case "Obi-Wan":
                    obiWan.makeCurrentEnemy();
                    break;
                case "Darth-Maul":
                    darthMaul.makeCurrentEnemy();
                    break;
                case "Palpatine":
                    darthSidious.makeCurrentEnemy();
                    break;
            }
        } else {
            alert("Game is Over");
        }

        this.currentEnemy = chr;
        

    },

    attack: function(a, b, c, d) {
        var player1;
        var player2;


        
            switch (this.currentCharacter) {
                case "Luke":
                    this.player1 = a;
                    break;
                case "Obi-Wan":
                    this.player1 = b;
                    break;
                case "Darth-Maul":
                    this.player1 = c;
                    break;
                case "Palpatine":
                    this.player1 = d;
                    break;
            }

            if(this.player1.getHP() < 1){
                this.battleReady = false;
            } else {
                this.battleReady = true;
            }
        if (this.battleReady){
            switch (this.currentEnemy) {
                case "Luke":
                    this.player2 = a;
                    break;
                case "Obi-Wan":
                    this.player2 = b;
                    break;
                case "Darth-Maul":
                    this.player2 = c;
                    break;
                case "Palpatine":
                    this.player2 = d;
                    break;
            }

            switch (this.currentEnemy) {
                case "Luke":
                    luke.damage(this.player1.getAttack());
                    luke.drawCard(7,1,true);
                    if (luke.getHP() <= 0) {
                        luke.drawCard(1,1,false);
                        //this.chooseEnemy = true;
                    }
                    break;
                case "Obi-Wan":
                    obiWan.damage(this.player1.getAttack());
                    obiWan.drawCard(7,1,true);
                    if (obiWan.getHP() <= 0) {
                        obiWan.drawCard(2,1,false);
                        //this.chooseEnemy = true;
                    }
                    break;
                case "Darth-Maul":
                    darthMaul.damage(this.player1.getAttack());
                    darthMaul.drawCard(7,1,true);
                    if (darthMaul.getHP() <= 0) {
                        darthMaul.drawCard(4,1,false);
                        //this.chooseEnemy = true;
                    }
                    break;
                case "Palpatine":
                    darthSidious.damage(this.player1.getAttack());
                    darthSidious.drawCard(7,1,true);
                    if (darthSidious.getHP() <= 0) {
                        darthSidious.drawCard(3,1,false);
                        //this.chooseEnemy = true;
                    }
                    break;
            }

            switch (this.currentCharacter) {
                case "Luke":
                    luke.damage(this.player2.getAttack());
                    luke.levelUp();
                    luke.drawCard(5,1,true);
                    if (luke.getHP() < 1) {
                        this.battleReady = false;
                        this.choosing = false;
                        debugger;
                        console.log(this.chooseEnemy);
                        this.chooseEnemy = false;
                        console.log(this.chooseEnemy);
                        this.battleReady = false;
                        luke.drawCard(5,1,false);
                    }
                    break;
                case "Obi-Wan":
                    obiWan.damage(this.player2.getAttack());
                    obiWan.levelUp();
                    obiWan.drawCard(5,1);
                    if (obiWan.getHP() <= 0) {
                        this.battleReady = false;
                        obiWan.drawCard(5,1,false);
                    }
                    break;
                case "Darth-Maul":
                    darthMaul.damage(this.player2.getAttack());
                    darthMaul.levelUp();
                    darthMaul.drawCard(5,1);
                    if (darthMaul.getHP() <= 0) {
                        this.battleReady = false;
                        darthMaul.drawCard(5,1,false);
                    }
                    break;
                case "Palpatine":
                    darthSidious.damage(this.player2.getAttack());
                    darthSidious.levelUp();
                    darthSidious.drawCard(5,1);
                    if (darthSidious.getHP() <= 0) {
                        this.battleReady = false;
                        darthSidious.drawCard(5,1,false);
                    }
                    break;
            }


        }
    },

}

    luke.drawCard(1, 1,true);
    obiWan.drawCard(2, 1,true);
    darthSidious.drawCard(3, 1,true);
    darthMaul.drawCard(4, 1,true);

$(document).ready(function() {

    $("#Luke").on("click", function(){
        game.clickCharacter("Luke");
    });

    $("#Obi-Wan").on("click", function(){
        game.clickCharacter("Obi-Wan");
    });
    
    $("#Darth-Maul").on("click", function(){
        game.clickCharacter("Darth-Maul");
    });
    
    $("#Palpatine").on("click", function(){
        game.clickCharacter("Palpatine");
    });

    $("#attack-btn").on("click", function(){
        game.attack(luke, obiWan, darthMaul, darthSidious);
    });
});