LoadingScreen = function(screenManager)
{
    // Make sure to call the constructor for the superclass
    TGE.Screen.call(this,screenManager);

    this.mLoadingText = null;

    return this;
}

LoadingScreen.prototype =
{
    Setup: function()
    {
        this.FillBackground("#FFF");

        // Loading text
        this.mLoadingText = this.CreateUIEntity(TGE.Text).Setup( this.mScreenManager.XFromPercentage(0.5), this.mScreenManager.YFromPercentage(0.5),
            "LOADING 0%", "bold italic 28px Arial", "center", "middle", "#111", this.mScreenManager.mLayerName);
    },


    UpdateProgress: function(percentComplete)
    {
        var loadingText = "LOADING " + Math.round(percentComplete*100).toString() + "%";
        this.mLoadingText.SetText(loadingText);
    }
}
extend(LoadingScreen, TGE.Screen, null);