// Inherit from Screen
PauseScreen.prototype = new TGE.Screen();
PauseScreen.prototype.constructor = PauseScreen;
function PauseScreen(screenManager)
{
    TGE.Screen.call(this,screenManager);

    return this;
}


PauseScreen.prototype.Setup = function()
{
    // Background
    this.FillBackground("#FFF");

    // Resume
    this.CreateUIEntity(TGE.Button).Setup( this.mScreenManager.XFromPercentage(0.5), this.mScreenManager.YFromPercentage(0.5),
        "pausescreen_resume_button", PauseScreen.prototype.resumeGame.bind(this), 3, this.mScreenManager.mLayerName);
}


PauseScreen.prototype.resumeGame = function()
{
    this.Game().PauseGame(false);
}