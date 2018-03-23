var Card = function (n, hp, ap, cap, imgSrc){
    // properties
    this.name = n;
    this.healthPoints = hp;
    this.attackPower = ap;
    this.counterAP = cap;
    this.imageSource = imgSrc;
    
    // methods
    this.drawCard = function(slotNum) {

        var colSlot = $("#slot"+slotNum);
        /*(colSlot.append('<div class="panel panel-default">');
        colSlot.append('<div class="panel-heading"><h3 class="panel-title">' + this.name +'</h3></div>');
        colSlot.append('<div class="panel-body">Image Goes Here</div>');
        colSlot.append('<div class="panel-footer">HP:' + this.healthPoints +'</div>');
        colSlot.append('</div>');*/

        colSlot.append('<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">'+this.name+'</h3></div><div class="panel-body"><img src="'+this.imageSource+'" class="img-responsive"></div><div class="panel-footer">HP:'+this.healthPoints+'</div></div>');
    }
    
};

var obiWan = new Card("Obi Wan", 10, 15, 20, "assets/images/luke.jpg");
var darthMaul = new Card("Darth Maul", 20, 10, 5, "assets/images/luke.jpg");
var palpatine = new Card("Palpatine", 15, 30, 12, "assets/images/luke.jpg");
var luke = new Card("Luke", 5, 10, 10, "assets/images/luke.jpg");

luke.drawCard(1);
obiWan.drawCard(2);
palpatine.drawCard(3);
darthMaul.drawCard(4);



var game = {
    currentCharacter: "",
    currentEnemy: "",

    chooseCharacter: function() {

    },

    chooseEnemy: function() {

    },

    battle: function() {

    },

    updateGameState() {

    },
}