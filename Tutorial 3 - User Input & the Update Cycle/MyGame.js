
// This is the constructor for the game
MyGame = function()
{
    // Make sure to call the constructor for the superclass
    MyGame.superclass.constructor.call(this);

    // Game Entities
    this.mPaddle;
    this.mBall;
    this.mScoreText;
    this.mBestScoreText;

    // Game State
    this.mBouncing;
    this.mBounceTime;
    this.mBallHeight;
    this.mDriftX;
    this.mDriftY;
    this.mDriftFactor;

    // Scores
    this.mScore = 0;
    this.mBestScore = 0;

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
        this.mScoreText = this.CreateWorldEntity(TGE.Text).Setup( this.Width()/2, this.Height()*0.065, "Score: 0", "bold 26px Arial", "center", "middle", "#454");
        this.mBestScoreText = this.CreateWorldEntity(TGE.Text).Setup( this.Width()/2, this.Height()*0.955, "Best Score: " + this.mBestScore.toString(), "bold 22px Arial", "center", "middle", "#454");

        // Add each of the game images in the center of the screen
        this.CreateWorldEntity(TGE.ScreenEntity).Setup( this.Width()/2, this.Height()/2, "background");
        this.mPaddle = this.CreateWorldEntity(TGE.ScreenEntity).Setup( this.Width()/2, this.Height()/2, "paddle");
        this.mBall = this.CreateWorldEntity(TGE.ScreenEntity).Setup( this.Width()/2, this.Height()/2, "ball");

        // Initialize game variables
        this.mBouncing = false;
        this.mBounceTime = 0;
        this.mBallHeight = 0;
        this.mDriftFactor = 100;
        this.mDriftX = 0;
        this.mDriftY = 0;
        this.mScore = 0;
    },

    // TGE.Game method override - called when the use clicks the mouse (or taps on mobile)
    subclassMouseDown: function()
    {
        // Start bouncing the ball
        this.mBouncing = true;
    },

    // TGE.Game method override - called every update cycle with elapsed time since last cycle started
    subclassUpdateGame: function(elapsedTime)
    {
        // Set the scale of the ball to make it appear closer when it's higher
        this.mBall.SetScale( 0.55 + this.mBallHeight*0.45 );

        // If the ball hasn't started bouncing, don't do anything else
        if(!this.mBouncing)
        {
            return;
        }

        // If the mouse is down, move the handle of the paddle to the mouse position
        if(this.IsMouseDown())
        {
            // The handle is offset from the center of the image by 40,65
            this.mPaddle.SetPosition(this.mMouseX-40, this.mMouseY-65);
        }

        // Update the ball
        this.updateBall(elapsedTime);

        // Update the score displays
        this.mScoreText.SetText("Score: " + this.mScore.toString());
        this.mBestScoreText.SetText("Best Score: " + this.mBestScore.toString());
    },

    // TGE.Game method override - called when gameplay ends
    subclassEndGame: function()
    {
        // Stop bouncing the ball
        this.mBouncing = false;

        // Did they beat their highscore?
        if(this.mScore > this.mBestScore)
        {
            this.mBestScore = this.mScore;
        }
    },

    // Our own function - update the properties of the ping pong ball
    updateBall: function(elapsedTime)
    {
        // Simulate the height of the ball using the absolute value of a sinewave
        var bounceSpeed = 4;
        var oldSinValue = Math.sin(this.mBounceTime*bounceSpeed);
        this.mBounceTime += elapsedTime;
        var newSinValue = Math.sin(this.mBounceTime*bounceSpeed);
        this.mBallHeight = Math.abs(newSinValue);

        // See if the ball hit the table or paddle by checking if the original sinewave crossed over zero
        if(oldSinValue>=0 && newSinValue<0 || oldSinValue<0 && newSinValue>=0)
        {
            this.ballLanded();
        }

        var newX = this.mBall.Position().e(1) + this.mDriftX*elapsedTime;
        var newY = this.mBall.Position().e(2) + this.mDriftY*elapsedTime;
        this.mBall.SetPosition(newX,newY);
    },

    // Our own function - called when the ball hits the table or paddle
    ballLanded: function()
    {
        // If the ball hit the paddle give the player a point, otherwise the game is over.
        // Compare the distance from the ball to the paddle against the radius of the paddle
        var xDist = this.mBall.Position().e(1)-this.mPaddle.Position().e(1);
        var yDist = this.mBall.Position().e(2)-this.mPaddle.Position().e(2);
        var distanceFromPaddleCenter = Math.sqrt((xDist*xDist) + (yDist*yDist));
        var paddleRadius = 45;
        if(distanceFromPaddleCenter <= paddleRadius)
        {
            this.mScore++;
        }
        else
        {
            // Ball didn't hit the paddle
            this.EndGame();
        }

        // Apply some drift to the ball with each bounce - the farther from the center of the paddle,
        // the greater the drift. Also increase the drift as the game progresses to make it harder
        var offCenterPercentage = distanceFromPaddleCenter/paddleRadius;
        var partialDriftFactor = this.mDriftFactor/10;
        this.mDriftX = (Math.random()*partialDriftFactor*2)-partialDriftFactor + this.mDriftFactor*offCenterPercentage*(xDist<0 ? -1 : 1);
        this.mDriftY = (Math.random()*partialDriftFactor*2)-partialDriftFactor + this.mDriftFactor*offCenterPercentage*(yDist<0 ? -1 : 1);
        this.mDriftFactor += 10;
    }

}
extend(MyGame, TGE.Game, null);