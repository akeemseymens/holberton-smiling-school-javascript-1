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

function createTutorials(data) {
  let row = 1;
  if (data.id > 4) {
    row = 2;
  }
  $('#addTutorials' + row).append(`
    <div class="mx-1 tutorial${data.id}">
        <div class="card video-card mx-auto my-3">
            <img class="card-img-top" src="${data.thumb_url}" alt="Thumbnail" width="255" height="154">
            <img class="play-img" src="images/play.png" alt="Play" width="64" height="64">
            <div class="card-body">
                <p class="font-weight-bold">${data.title}<br>
                    <span class="text-secondary font-14 font-weight-normal">${data['sub-title']}</span>
                </p>
                <div class="row justify-content-start font-14 purple-text">
                    <div class="col-2">
                        <img class="rounded-circle" src="${data.author_pic_url}" width="30" height="30" alt="Profile" loading="lazy">
                    </div>
                    <div class="col mt-1">
                        ${data.author}
                    </div>
                </div>
                <div class="row justify-content-between mt-2">
                    <div class="col" id="stars-${data.id}">
                    </div>
                    <div class="col-4 text-right purple-text">
                        ${data.duration}
                    </div>
                </div>
            </div>
        </div>
    </div>
    `);

  for (let i = 0; i < 5; i++) {
    if (i < data.star) {
      $('#stars-' + data.id).append(
        '<img src="images/star_on.png" width="15" height="15" alt="Star on" loading="lazy">'
      );
    } else {
      $('#stars-' + data.id).append(
        '<img src="images/star_off.png" width="15" height="15" alt="Star off" loading="lazy">'
      );
    }
  }
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

function queryTutorials() {
  $('.loader').show();
  $.ajax({
    type: 'GET',
    url: 'https://smileschool-api.hbtn.info/popular-tutorials',
    contentType: 'json',
    success: function (response) {
      response.forEach(function (data) {
        createTutorials(data);
      });
      $('.tutorial2').addClass('d-none d-md-flex');
      $('.tutorial3').addClass('d-none d-lg-flex');
      $('.tutorial4').addClass('d-none d-lg-flex');
      $('.tutorial6').addClass('d-none d-md-flex');
      $('.tutorial7').addClass('d-none d-lg-flex');
      $('.loader').hide();
    },
    error: function (error) {
      console.log(error);
    },
  });
}

queryQuotes();
queryTutorials();
