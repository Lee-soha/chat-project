var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$('#send-button').click(function(e) {
    e.preventDefault(); // Prevent the default form submission
    insertMessage();
});

document.querySelector('.message-input').addEventListener('keydown', function(e) {
    var sendButton = document.querySelector('.message-submit');
    if (e.key === 'Enter' && !e.shiftKey && !sendButton.disabled) {
      e.preventDefault();
      sendButton.click();
      sendButton.disabled = true;
      setTimeout(function() {
        sendButton.disabled = false;
      }, 1000);  // delay in milliseconds (1000 ms = 1 second)
    }
  });

$(window).on('load', function() {
    // No need to initialize mCustomScrollbar here
    setTimeout(function() {
        displayAssistantMessage();
    }, 100);
    });

$(window).on('load', function() {
    setTimeout(function() {
        displayAssistantMessage('How can I assist you today?');
    }, 100);
});

function setDate() {
    d = new Date()
    if (m != d.getMinutes()) {
        m = d.getMinutes();
        $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
    }
}
    
function updateScrollbar() {
    // Use native browser scroll to bottom
    $messages.scrollTop($messages[0].scrollHeight);
}

function insertMessage() {
    msg = $('.message-input').val();
    if ($.trim(msg) == '') {
      return false;
    }
    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.messages-content')).addClass('new');
    setDate();
    $('.message-input').val(null);
    updateScrollbar();
    setTimeout(function() {
      getCounseling(msg); // Call getCounseling with the message as a parameter
    }, 1000 + (Math.random() * 20) * 100);
}

async function getCounseling(msg) {
    const data = {
      'message': msg // Send the user's message to your API
    };
    try {
      const response = await axios.post('http://localhost:3000/care', data);
      console.log('Response from server:', response.data); // Log the server's response
      displayAssistantMessage(response.data.assistant); // Insert the response into the chat window
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    }
}

function displayAssistantMessage(msg = "Hi there. I'm Welly, your best psychiatrist, and the conversations here are strictly one-on-one, so feel free to tell me your story.") {
    if ($('.message-input').val() != '') {
      return false;
    }
    $('<div class="message loading new"><figure class="avatar"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure><span></span></div>').appendTo($('.messages-content'));
    updateScrollbar();

    setTimeout(function() {
      $('.message.loading').remove();
      $('<div class="message new"><figure class="avatar"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure>' + msg + '</div>').appendTo($('.messages-content')).addClass('new');
      setDate();
      updateScrollbar();
    }, 1000 + (Math.random() * 20) * 100);
}


