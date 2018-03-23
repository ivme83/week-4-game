var Card = function (n, hp, ap, cap, imgSrc){
    // properties
    this.name = n;
    this.healthPoints = hp;
    this.attackPower = ap;
    this.counterAP = cap;
    this.imageSource = imgSrc;
    this.currentSlot = 0;
    this.newSlot = 0;
    
    // draws the card to a panel and handles clearing the columns
    this.drawCard = function(slotNum, cleared) {
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
        
        // Draws the card to a formated panel
        colSlot.append(
            '<div class="panel panel-primary">'+
            '<div class="panel-heading">'+
            '<h3 class="panel-title">'+this.name+'</h3>'+
            '</div>'+
            '<div class="panel-body">'+
            '<img src="'+this.imageSource+'" class="img-responsive">'+
            '</div>'+
            '<div class="panel-footer text-center"><span class="badge">HP:'+this.healthPoints+'</span><span class="badge">AP:'+this.attackPower+'</span><span class="badge">CAP:'+this.counterAP+'</span></div>'+
            '</div>');

        this.currentSlot = this.newSlot;
            
    }
    
};

var obiWan = new Card("Obi Wan", 10, 15, 20, "assets/images/obiwan.jpg");
var darthMaul = new Card("Darth Maul", 20, 10, 5, "assets/images/darthmaul.jpeg");
var darthSidious = new Card("Palpatine", 15, 30, 12, "assets/images/darthsidious.jpg");
var luke = new Card("Luke", 5, 10, 10, "assets/images/luke.jpg");

luke.drawCard(1, 1);
obiWan.drawCard(2, 1);
darthSidious.drawCard(3, 1);
darthMaul.drawCard(4, 1);



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