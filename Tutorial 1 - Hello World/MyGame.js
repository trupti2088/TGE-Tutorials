
// This is the constructor for the game
MyGame = function()
{
    // Make sure to call the constructor for the TGE.Game superclass
    MyGame.superclass.constructor.call(this);
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
        this.SetBackgroundColor('#FFF');

        // Create a text entity in the middle of the screen
        this.CreateWorldEntity(TGE.Text).Setup( this.Width()/2, this.Height()/2, "Hello World!", "bold 30px Arial", "center", "middle", "#111");
    }
}
extend(MyGame, TGE.Game, null);