
GameOver = function(screenManager)
{
    // Make sure to call the constructor for the superclass
    TGE.Screen.call(this,screenManager);

    return this;
}

GameOver.prototype =
{
    Setup: function()
    {
        // Background
        this.FillBackground("#FFF");

        // Score
        this.CreateUIEntity(TGE.Text).Setup( this.mScreenManager.XFromPercentage(0.5), this.mScreenManager.YFromPercentage(0.14),
            "SCORE: " + this.Game().getScore().toString(), "bold italic 40px Arial", "center", "middle", "#8b3f3e", this.mScreenManager.mLayerName);

        // Try again
        this.CreateUIEntity(TGE.Button).Setup( this.mScreenManager.XFromPercentage(0.5), this.mScreenManager.YFromPercentage(0.48),
            "gameover_tryagain_button", GameOver.prototype.playAgain.bind(this), 1, this.mScreenManager.mLayerName);

        // Twitter share score button
        this.CreateUIEntity(TGE.Button).Setup( this.mScreenManager.XFromPercentage(0.5), this.mScreenManager.YFromPercentage(0.79),
            "gameover_twitter_share", GameOver.prototype.twitterShareScore.bind(this), 1, this.mScreenManager.mLayerName);

        // Twitter follow button
        this.CreateUIEntity(TGE.Button).Setup( this.mScreenManager.XFromPercentage(0.5), this.mScreenManager.YFromPercentage(0.90),
            "gameover_twitter_follow", GameOver.prototype.twitterFollow.bind(this), 1, this.mScreenManager.mLayerName);
    },


    playAgain: function()
    {
        this.Game().Replay();
        this.Close();
    },


    twitterFollow: function()
    {
        this.Game().OpenURL("https://twitter.com/paddlegame");
    },


    twitterShareScore: function()
    {
        var encodedText = encodeURI("Just scored " + this.Game().getScore().toString() + " playing the TreSensa Paddle Game. See if you can beat my score @paddlegame");
        var encodedURL = encodeURI("http://games.tresensa.com/tutorials/paddle/index.html");
        var encodedRelated = encodeURI("tresensa:Built on TreSensa");
        var finalURL = "http://twitter.com/intent/tweet?text=" + encodedText + "&url=" + encodedURL + "&related=" + encodedRelated;
        this.Game().OpenURL(finalURL);
    }
}
extend(GameOver, TGE.Screen, null);