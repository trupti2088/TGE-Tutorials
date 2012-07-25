
PauseScreen = function(screenManager)
{
    // Make sure to call the constructor for the superclass
    TGE.Screen.call(this,screenManager);

    return this;
}

PauseScreen.prototype =
{
    Setup: function()
    {
        // Background
        this.FillBackground("#FFF");

        // Resume
        this.CreateUIEntity(TGE.Button).Setup( this.mScreenManager.XFromPercentage(0.5), this.mScreenManager.YFromPercentage(0.5),
            "pausescreen_resume_button", PauseScreen.prototype.resumeGame.bind(this), 1, this.mScreenManager.mLayerName);
    },


    resumeGame: function()
    {
        this.Game().PauseGame(false);
    }
}
extend(PauseScreen, TGE.Screen, null);