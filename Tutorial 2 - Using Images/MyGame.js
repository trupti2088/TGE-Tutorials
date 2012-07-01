
// This is the constructor for the game
MyGame = function()
{
    // Make sure to call the constructor for the superclass
    MyGame.superclass.constructor.call(this);

    // Define the image assets we need for the game
    var gameImages = [ {id:'background',url:'background.jpg'}, {id:'paddle',url:'paddle.png'}, {id:'ball',url:'ball.png'} ];

    // Tell the game about this list of assets - the "required" category is
    // for assets that need to be fully loaded before the game can start
    this.AssignImageAssetList("required",gameImages);
}

// New methods and overrides for your game class will go in here
MyGame.prototype =
{
    // TGE.Game method override - called when the gameplay starts
    subclassStartPlaying: function()
    {
        // Clear everything in the scene
        this.ClearScene();

        // Fill the background in with white
        this.SetBackgroundColor("#FFF");

	// Add some text elements we can use for displaying score information in our game
	this.CreateWorldEntity(TGE.Text).Setup( this.Width()/2, this.Height()*0.065, "Score: 0", "bold 26px Arial", "center", "middle", "#454");
        this.CreateWorldEntity(TGE.Text).Setup( this.Width()/2, this.Height()*0.955, "Best Score: 0", "bold 22px Arial", "center", "middle", "#454");

        // Add each of the game images in the center of the screen
        this.CreateWorldEntity(TGE.ScreenEntity).Setup( this.Width()/2, this.Height()/2, "background");
        this.CreateWorldEntity(TGE.ScreenEntity).Setup( this.Width()/2, this.Height()/2, "paddle");
        this.CreateWorldEntity(TGE.ScreenEntity).Setup( this.Width()/2, this.Height()/2, "ball");        
    }
}
extend(MyGame, TGE.Game, null);