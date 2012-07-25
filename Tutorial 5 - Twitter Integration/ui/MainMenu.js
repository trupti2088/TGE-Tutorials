
MainMenu = function(screenManager)
{
    // Make sure to call the constructor for the superclass
    TGE.Screen.call(this,screenManager);

    return this;
}

MainMenu.prototype =
{
    Setup: function()
    {
        // Background
        this.FillBackground("#FFF");

        // Play button
        this.CreateUIEntity(TGE.Button).Setup( this.mScreenManager.XFromPercentage(0.5), this.mScreenManager.YFromPercentage(0.5),
            "mainmenu_play_button", MainMenu.prototype.playGame.bind(this), 1, this.mScreenManager.mLayerName);
    },


    playGame: function()
    {
        this.Close();
        this.Game().PlayGame();
    }
}
extend(MainMenu, TGE.Screen, null);