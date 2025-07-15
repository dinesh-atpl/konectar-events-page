// Create Countdown
var Countdown = {  
  // Backbone-like structure
  el: $('.countdown'),
  // Params
  countdown_interval: null,
  total_seconds     : 0,
  initialized: false, // Track if countdown is already initialized
  
  // Initialize the countdown  
  init: function(targetDate) {
    if (this.initialized) {
        console.warn("Countdown is already initialized.");
        return;
    }
    // Calculate time remaining
    var now = new Date();
    var target = new Date(targetDate);
    var timeRemaining = target.getTime() - now.getTime();

    if (timeRemaining <= 0) {
        console.error("Target date has already passed.");
        return;
    }
    // Convert milliseconds to seconds
    this.total_seconds = Math.floor(timeRemaining / 1000);
    // DOM    
		this.$ = {
    	hours  : $.find('.bloc-time.hours .figure'),
        minutes: $.find('.bloc-time.min .figure'),
    	seconds: $.find('.bloc-time.sec .figure')
   	};
    // Animate countdown to the end 
    this.count();    
    this.initialized = true;
  },
  
  count: function() {    
    var that    = this;
    this.countdown_interval = setInterval(function () {
        if (that.total_seconds > 0) {
            var hours = Math.floor(that.total_seconds / 3600);
            var minutes = Math.floor((that.total_seconds % 3600) / 60);
            var seconds = that.total_seconds % 60;                      
            // Update DOM values
            that.updateTime(hours, minutes);
            that.total_seconds--;            
        } else {
            clearInterval(that.countdown_interval);
            console.log("Countdown finished!");
        }
    }, 1000);
},

updateTime: function (hours, minutes) {
    // Calculate each digit for hours, minutes, and seconds
    var hoursArray = hours < 100 ? [0, Math.floor(hours / 10), hours % 10] : [
        Math.floor(hours / 100),  // Hundreds place
        Math.floor((hours % 100) / 10),  // Tens place
        hours % 10  // Ones place
    ];
    // Ensure proper DOM selection for hour digits (assuming a 3-digit display)
    for (var i = 0; i < 3; i++) {
        var currentDigit = hoursArray[i].toString(); // Get string representation
        var currentValue = $(this.$.hours[i]).find('.top').attr('data-value'); // Current displayed value
        if (currentDigit !== currentValue) { // Only animate if values differ
            this.animateFigure(this.$.hours[i], currentDigit);
        }
    }
    // Update minutes digits
    var minTens = Math.floor(minutes / 10);
    var minOnes = minutes % 10;
    var currentMinTens = $(this.$.minutes[0]).find('.top').attr('data-value');
    var currentMinOnes = $(this.$.minutes[1]).find('.top').attr('data-value');

    if (minTens.toString() !== currentMinTens) {
        this.animateFigure(this.$.minutes[0], minTens.toString());
    }

    if (minOnes.toString() !== currentMinOnes) {
        this.animateFigure(this.$.minutes[1], minOnes.toString());
    }    
    // Update the previous values to keep track of state
    this.prevHours = hours;
    this.prevMinutes = minutes;
},
  animateFigure: function(el, value) {
      var top = $(el).find('.top');
      bottom = $(el).find('.bottom'),
      back_top = $(el).find('.top-back'),
      back_bottom = $(el).find('.bottom-back');
 
      var currentTopValue = top.text();
 
      if (currentTopValue !== value) {
         // Before we begin, change the back value
         back_top.find('span').html(value);
         back_bottom.find('span').html(value);
         // Then animate
         TweenMax.to(top, 0.8, {
             rotationX: '-180deg',
             transformPerspective: 700,
             ease: Quart.easeOut,
             onComplete: function () {
                 top.html(value);
                 bottom.html(value);
                 TweenMax.set(top, { rotationX: 0 });
             }
         });
 
         TweenMax.to(back_top, 0.8, {
             rotationX: 3,
             transformPerspective: 700,
             ease: Quart.easeOut,
             clearProps: 'all'
         });
     }   
  },
  
};

// Let's go !
var targetDate = new Date("2024-05-12T10:00:00+05:30"); // Target date and time in IST
var now = new Date(); // Current date and time
if (targetDate > now) {
    Countdown.init(targetDate);
} else {
    console.error("Target date has already passed.");
}