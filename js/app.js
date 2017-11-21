window.addEventListener('load', function() {
  var tweetArea = document.getElementById('tweet-area');
  var tweetBtn = document.getElementById('tweet-btn');
  var messages = document.getElementById('messages');
  var countDinamic = document.getElementById('count');
  var MAXCHARACTERS = 140;

  tweetArea.addEventListener('keyup', function(event) {
    console.log(event.target.value.trim().length);
    if (event.target.value.trim().length) {
      var total = MAXCHARACTERS - event.target.value.trim().length;
      tweetBtn.disabled = false;
      countDinamic.textContent = MAXCHARACTERS - event.target.value.trim().length;
      console.log(event.target.value.trim());
      if (event.target.value.trim().length > MAXCHARACTERS) {
        tweetBtn.disabled = true;
      }
      countDinamic.classList.toggle('seagreen', 10 <= total && total < 20);
      countDinamic.classList.toggle('orangered', total < 10);
    } else {
      tweetBtn.disabled = true;
      countDinamic.textContent = MAXCHARACTERS;
      // console.log('la cadena esta vacia'); 
    }
    // Versión 0.0.4
    var text = event.target.value.split('');
    var acum = 0;
    for (var i = 0; i < text.length; i++) {
      if (text[i] === '\n') {
        acum++;
      }
      if (acum) {
        event.target.rows = acum + 2;
      }
    }
    // Versión 0.0.5 (Extra)
    if ((event.target.value.trim().length / event.target.cols) < event.target.rows) {
      event.target.rows = (event.target.value.trim().length / event.target.cols) + 2;
    }
  });
  
  tweetArea.addEventListener('keydown', function(event) {
    countDinamic.textContent = MAXCHARACTERS - tweetArea.value.length;
  });

  tweetBtn.addEventListener('click', function(event) {
    event.preventDefault();
    // console.log(tweetArea.value);
    // console.log(tweetArea.value.lenght);
    var div = document.createElement('div');
    var tweet = document.createElement('span');
    var tweetText = document.createTextNode(tweetArea.value);
    
    // Versión 0.0.6 (Extra)
    /* 
    var fecha = new Date();
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    */
    var hours = moment().format('LT');
    var fechaCompleta = document.createTextNode(hours);
    var espacio = document.createTextNode(' ');

    tweet.appendChild(tweetText);
    tweet.appendChild(espacio);
    tweet.appendChild(fechaCompleta);
    div.appendChild(tweet);
    div.classList.add('nuevo-mensaje');
    messages.insertBefore(div, messages.firstElementChild);

    tweetArea.value = '';
    tweetArea.focus();
    tweetBtn.disabled = true;
    countDinamic.textContent = MAXCHARACTERS;
  });
});