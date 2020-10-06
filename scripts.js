function createQuotes(name, pic_url, text, title) {
  $('#addQuotes').append(`
    <div class="carousel-item">
        <div class="row justify-content-around">
            <div class="col-sm-1">
                <img class="rounded-circle mx-auto my-3 d-block" src="${pic_url}" width="150" height="150" alt="First slide">
            </div>
            <div class="col-sm-6 mx-3">
                <p>${text}</p>
                <p><span class="font-weight-bold">${name}</span><br>
                    <span class="font-italic">${title}</span></p>
            </div>
        </div>
    </div>
    `);
}

function queryQuotes() {
  $('.loader').show();
  $.ajax({
    type: 'GET',
    url: 'https://smileschool-api.hbtn.info/quotes',
    success: function (response) {
      response.forEach(function ({ name, pic_url, text, title }) {
        createQuotes(name, pic_url, text, title);
      });
      $('.carousel .carousel-item:first').addClass('active');
      $('.loader').hide();
    },
    error: function (error) {
      console.log(error);
    },
  });
}

queryQuotes();
