const pics = [
  "image/picW.png",
  "image/picIMARRY.png",
  "image/picTSS.png",
  "image/picmood.png"
];


const texts = [
  {
    title: "Girl with a Pearl Earring <p>Johannes Vermeer, c. 1665</p>",
    quote: "Created by Vermeer around 1665 in Delft, this small oil on canvas gained fame in the 19th century after centuries of obscurity. Nicknamed the “Mona Lisa of the North,” it was likely a tronie—a study of an exotic type rather than a portrait. Vermeer painted it during his peak, using costly ultramarine and a luminous pearl to showcase his mastery of light.",
    desc: "(Mysterious young woman in exotic turban, gazing directly at the viewer)"
  },
  {
    title: "The Unequal Marriage  <p>Vasily Pukirev, 1862</p>",
    quote: "Painted by Pukirev in 1862, the work debuted at the annual academic exhibition in St. Petersburg and sparked intense public debate. Legend holds that the bride was modeled after Pukirev’s own fiancée, forced by her family into marriage with a wealthy elderly man. The artist portrayed himself in the background—arms crossed, face etched with grief and defiance. The canvas became a powerful protest against arranged marriages for money and the rigid class divisions of 19th-century Russia.",
    desc: "(A young woman forced into marriage with a rich old man amid an indifferent society)"
  },
  {
    title: "Christ in the Storm on the Sea of Galilee<p>Rembrandt van Rijn, 1633</p>",
    quote: "Rembrandt’s only seascape, painted in 1633, shows dramatic chiaroscuro and emotional intensity. It was stolen in 1990 from Boston’s Isabella Stewart Gardner Museum in the largest art heist in history and remains missing.",
    desc: "(Jesus calming the storm as terrified disciples struggle in a raging sea)"
  },
  {
    title: "The Scream <p>Edvard Munch, 1893</p>",
    quote: "Munch painted the first version in 1893 after a panic attack on a fjord bridge at sunset; he later described hearing “the enormous infinite scream of nature.” Created during his Symbolist phase, it exists in four versions (two paintings, pastels, lithograph). Stolen in 1994 and 2004, both were recovered.",
    desc: "(Figure in agony clutching face against swirling, blood-red sky of existential dread)"
  }
];

let index = 0;

function updateGallery() {
  console.log("Updating gallery. Index:", index);

  $("#mainPic").attr("src", pics[index]);


  $("#artTitle").html(texts[index].title);
  $("#artQuote").html(texts[index].quote);
  $("#artDesc").html(texts[index].desc);

  $("#left1").attr("src", pics[(index + 1) % pics.length]);
  $("#left2").attr("src", pics[(index + 2) % pics.length]);
  $("#left3").attr("src", pics[(index + 3) % pics.length]);
}

$("#prevBtn").on("click", function () {
  index = (index - 1 + pics.length) % pics.length; 
  updateGallery();
});


updateGallery();






$(function(){
  
  var $form = $('#bookingForm');
  var $name = $('#name');
  var $email = $('#email');
  var $date = $('#date');
  var $time = $('#time');
  var $phone = $('#phone');
  var $adults = $('#adults');
  var $children = $('#children');
  var $message = $('#message');
  var $password = $('#password');
  var $confirm = $('#confirmPassword');
  var $successBox = $('#successMessage');


  var fb = {
    name: $('#nameFeedback'),
    email: $('#emailFeedback'),
    date: $('#dateFeedback'),
    time: $('#timeFeedback'),
    phone: $('#phoneFeedback'),
    adults: $('#adultsFeedback'),
    children: $('#childrenFeedback'),
    message: $('#messageFeedback'),
    password: $('#passwordFeedback'),
    confirm: $('#confirmFeedback')
  };

  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function passwordStrength(pw) {
    var score = 0;
    if (!pw) return score;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score <= 1) return 'weak';
    if (score === 2 || score === 3) return 'medium';
    return 'strong';
  }


  var $meterBars = [ $('#bar1'), $('#bar2'), $('#bar3') ];
  function updatePwdMeter() {
    if ($password.length === 0) return;
    var pw = $password.val();
    var strength = passwordStrength(pw);

    
    $.each($meterBars, function(i, $b){ $b.removeClass('bar active-weak active-medium active-strong').addClass('bar'); });
    fb.password.text('');
    $password.removeClass('is-valid is-invalid');

    if (!pw) return;
    if (strength === 'weak') {
      $meterBars[0].addClass('active-weak');
      fb.password.text('Weak password');
      $password.addClass('is-invalid');
    } else if (strength === 'medium') {
      $meterBars[0].addClass('active-medium');
      $meterBars[1].addClass('active-medium');
      fb.password.text('Medium strength');
      $password.addClass('is-valid');
    } else {
      $.each($meterBars, function(i, $b){ $b.addClass('active-strong'); });
      fb.password.text('Strong password');
      $password.addClass('is-valid');
    }
  }

  
  function validateName() {
    var v = $.trim($name.val() || '');
    if (!v) {
      fb.name.text('Name is required.');
      $name.addClass('is-invalid').removeClass('is-valid');
      return false;
    }
    fb.name.text('');
    $name.addClass('is-valid').removeClass('is-invalid');
    return true;
  }

  function validateEmail() {
    var v = $.trim($email.val() || '');
    if (!v) {
      fb.email.text('Email is required.');
      $email.addClass('is-invalid').removeClass('is-valid');
      return false;
    }
    if (!emailRe.test(v)) {
      fb.email.text('Enter a valid email address.');
      $email.addClass('is-invalid').removeClass('is-valid');
      return false;
    }
    fb.email.text('');
    $email.addClass('is-valid').removeClass('is-invalid');
    return true;
  }

  function validateDate() {
    var v = $date.val();
    if (!v) {
      fb.date.text('Select a date.');
      $date.addClass('is-invalid').removeClass('is-valid');
      return false;
    }
    var chosen = new Date(v);
    var today = new Date(); today.setHours(0,0,0,0);
    if (chosen < today) {
      fb.date.text('Date cannot be in the past.');
      $date.addClass('is-invalid').removeClass('is-valid');
      return false;
    }
    fb.date.text('');
    $date.addClass('is-valid').removeClass('is-invalid');
    return true;
  }

  function validateTime() {
    if (!$time.val()) {
      fb.time.text('Choose time.');
      $time.addClass('is-invalid').removeClass('is-valid');
      return false;
    }
    fb.time.text('');
    $time.addClass('is-valid').removeClass('is-invalid');
    return true;
  }

  function validatePhone() {
    var v = $.trim($phone.val() || '');
    if (!v) {
      fb.phone.text('Phone is required.');
      $phone.addClass('is-invalid').removeClass('is-valid');
      return false;
    }
    var digits = v.replace(/\D/g,'');
    if (digits.length < 6) {
      fb.phone.text('Enter a valid phone number.');
      $phone.addClass('is-invalid').removeClass('is-valid');
      return false;
    }
    fb.phone.text('');
    $phone.addClass('is-valid').removeClass('is-invalid');
    return true;
  }

  function validateSelect($sel, fbEl) {
    if (!$sel.val()) {
      fbEl.text('Please choose an option.');
      $sel.addClass('is-invalid').removeClass('is-valid');
      return false;
    }
    fbEl.text('');
    $sel.addClass('is-valid').removeClass('is-invalid');
    return true;
  }

  function validateMessage() {
    var v = $.trim($message.val() || '');
    if (!v) {
      fb.message.text('Please leave a short note.');
      $message.addClass('is-invalid').removeClass('is-valid');
      return false;
    }
    fb.message.text('');
    $message.addClass('is-valid').removeClass('is-invalid');
    return true;
  }

  function validatePasswords() {
    if ($password.length === 0 && $confirm.length === 0) return true; // if passwords not present, skip
    var pw = $password.val() || '';
    var conf = $confirm.val() || '';
    var strength = passwordStrength(pw);

    if (!pw) {
      fb.password.text('Password is required.');
      $password.addClass('is-invalid').removeClass('is-valid');
      return false;
    }
    if (strength === 'weak') {
      fb.password.text('Password too weak.');
      $password.addClass('is-invalid').removeClass('is-valid');
      return false;
    }
    if (!conf) {
      fb.confirm.text('Please confirm your password.');
      $confirm.addClass('is-invalid').removeClass('is-valid');
      return false;
    }
    if (pw !== conf) {
      fb.confirm.text("Passwords don't match.");
      $confirm.addClass('is-invalid').removeClass('is-valid');
      return false;
    }
    fb.password.text('');
    fb.confirm.text('');
    $password.addClass('is-valid').removeClass('is-invalid');
    $confirm.addClass('is-valid').removeClass('is-invalid');
    return true;
  }


  $name.on('input', validateName);
  $email.on('input', validateEmail);
  $date.on('change', validateDate);
  $time.on('change', validateTime);
  $phone.on('input', validatePhone);
  $adults.on('change', function(){ validateSelect($adults, fb.adults); });
  $children.on('change', function(){ validateSelect($children, fb.children); });
  $message.on('input', validateMessage);
  $password.on('input', function(){ updatePwdMeter(); });
  $confirm.on('input', function(){
    if ($confirm.val() && $password.val() === $confirm.val()) {
      fb.confirm.text('');
      $confirm.addClass('is-valid').removeClass('is-invalid');
    } else {
      if ($confirm.val()) {
        fb.confirm.text("Passwords don't match.");
        $confirm.addClass('is-invalid').removeClass('is-valid');
      } else {
        fb.confirm.text('');
        $confirm.removeClass('is-invalid is-valid');
      }
    }
  });

  $form.on('submit', function(e){
    e.preventDefault();
    var ok = true;
    ok = validateName() && ok;
    ok = validateEmail() && ok;
    ok = validateDate() && ok;
    ok = validateTime() && ok;
    ok = validatePhone() && ok;
    ok = validateSelect($adults, fb.adults) && ok;
    ok = validateSelect($children, fb.children) && ok;
    ok = validateMessage() && ok;
    ok = validatePasswords() && ok;

    if (!ok) {
      var $firstInvalid = $form.find('.is-invalid').first();
      if ($firstInvalid.length) {
        $firstInvalid.focus();
      }
      return;
    }

    // success demo: show successBox (jQuery show)
    $successBox.show();
    setTimeout(function(){ $successBox.hide(); }, 6000);

    // optional: reset form
    // $form[0].reset();
    // remove validation classes
    // $form.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
  });

});


$(document).ready(function() {
  const $searchInput = $('#gallery-search');
  const $searchHint = $('#search-hint');
 
  const $allArtImages = $('#mainPic, .left-wall .art-card');

  if ($searchInput.length === 0 || $allArtImages.length === 0) return;

  
  function filterArtworks(query) {
    const lowerQuery = query.trim().toLowerCase();
    let visibleCount = 0;

    $allArtImages.each(function() {
      const $img = $(this);
      const searchTerms = $img.data('search') || $img.attr('alt') || '';
      const matches = lowerQuery === '' || searchTerms.toLowerCase().includes(lowerQuery);

      if (matches) {
        $img.show();
        visibleCount++;
      } else {
        $img.hide();
      }
    });

    
    const $rightPanel = $('.right');
    if (visibleCount === 0 && lowerQuery) {
      $rightPanel.hide();
    } else {
      $rightPanel.show();
    }

    
    if (lowerQuery) {
      const hint = visibleCount === 0 
        ? '0 results' 
        : visibleCount === 1 
          ? '1 artwork' 
          : `${visibleCount} artworks`;
      
      $searchHint.text(hint).addClass('show');
      
      clearTimeout($searchHint.data('timer'));
      $searchHint.data('timer', setTimeout(() => {
        $searchHint.removeClass('show');
      }, 2500));
    } else {
      $searchHint.removeClass('show');
    }
  }

 
  $searchInput.on('input', function() {
    filterArtworks($(this).val());
  });
});




$(function(){
  
  var $modal = $('#exhibitModal');
  var $panel = $modal.find('.exhibit-modal__panel');
  var $backdrop = $modal.find('.exhibit-modal__backdrop');
  var $modalDate = $('#modalDate'), $modalLocation = $('#modalLocation'), $modalDescription = $('#modalDescription'), $modalImage = $('#modalImage');
  var $editForm = $('#modalEditForm');
  var $editDate = $('#editDate'), $editLocation = $('#editLocation'), $editDescription = $('#editDescription'), $editImage = $('#editImage');
  var $btnEdit = $('#btnEdit'), $btnSave = $('#btnSave'), $btnDelete = $('#btnDelete'), $btnClose = $('#btnClose');
  var $modalClose = $('#modalClose');
  var $deleteConfirm = $('#deleteConfirm'), $confirmDelete = $('#confirmDelete'), $cancelDelete = $('#cancelDelete');
  var $exhibitions = $('.exhibitions-table tbody tr');

  var currentRow = null; 

  
  function openModal() {
    $modal.fadeIn(180).attr('aria-hidden','false');
  }
  function closeModal() {
    $modal.fadeOut(150).attr('aria-hidden','true');
   
    exitEditMode();
    $deleteConfirm.hide();
  }

  function enterEditMode() {
   
    $editDate.val($modalDate.text().trim());
    $editLocation.val($modalLocation.text().trim());
    $editDescription.val($modalDescription.text().trim());
    
    
    $editImage.val($modalImage.attr('src') || '');
    $('.view-mode').hide();
    $editForm.show();
    $btnEdit.hide();
    $btnSave.show();
  }
  function exitEditMode() {
    $editForm.hide();
    $('.view-mode').show();
    $btnSave.hide();
    $btnEdit.show();
    $('#modalEditFeedback').hide();
  }

  
  $(document).on('click', '.exhibitions-table .ticket-btn', function(e){
    e.preventDefault();
    var $btn = $(this);
    var $row = $btn.closest('tr');
    currentRow = $row;

 
    var date = $row.find('td').eq(0).text().trim();
    var location = $row.find('td').eq(1).text().trim();
    var description = $row.find('td').eq(2).text().trim();
    var imgSrc = $row.find('td').eq(3).find('img').attr('src') || '';

    
    $modalDate.text(date);
    $modalLocation.text(location);
    $modalDescription.text(description);
    $modalImage.attr('src', imgSrc);

    openModal();
  });


  $backdrop.on('click', closeModal);
  $btnClose.on('click', closeModal);
  $modalClose.on('click', closeModal);

 
  $btnEdit.on('click', function(){
    enterEditMode();
  });

  
  $btnSave.on('click', function(e){
    e.preventDefault();
   
    var d = $editDate.val().trim();
    var loc = $editLocation.val().trim();
    var desc = $editDescription.val().trim();
    var img = $editImage.val().trim();

    if (!d || !loc) {
      $('#modalEditFeedback').text('Date and Location are required.').show();
      return;
    }
    
    $modalDate.text(d);
    $modalLocation.text(loc);
    $modalDescription.text(desc);
    $modalImage.attr('src', img);

   
    if (currentRow) {
      currentRow.find('td').eq(0).text(d);
      currentRow.find('td').eq(1).html($('<span>').text(loc)); // safe text
      currentRow.find('td').eq(2).text(desc);
      var $imgCell = currentRow.find('td').eq(3);
      if ($imgCell.find('img').length) {
        $imgCell.find('img').attr('src', img);
      } else {
        $imgCell.html('<img src="'+img+'" alt="Exhibit Image" loading="lazy" style="max-width:160px;border-radius:6px;">');
      }

      
      currentRow.css('background-color','rgba(201,169,126,0.08)').animate({opacity:1},300,function(){
        setTimeout(function(){ currentRow.css('background-color',''); }, 900);
      });
    }

    exitEditMode();
  });

  
  $btnDelete.on('click', function(){
    $deleteConfirm.show();
  });
  $cancelDelete.on('click', function(){ $deleteConfirm.hide(); });
  $confirmDelete.on('click', function(){
    if (!currentRow) { $deleteConfirm.hide(); return; }
    
    currentRow.fadeOut(400, function(){ $(this).remove(); });

    closeModal();
  });

  
  $(document).on('keydown', function(e){
    if (e.key === 'Escape' && $modal.is(':visible')) closeModal();
  });

});


$(function(){
  const galleryData = [
    {id:1, 
      src:'image/N.jpg', 
      title:'Corfu', 
      desc:'Vincent van Gogh (1889)', 
      cat:'interior'},
    {
      id:2, 
      src:'image/eee.jpg', 
      title:'The Birth of Venus', 
      desc:'Sandro Botticelli (c. 1485)', 
      cat:'architecture'},
    {
      id:3, 
      src:'image/iwantgojapan.jpg', 
      title:'Katsushika Hokusai (c. 1830–1831)', 
      desc:'Portrait — dreamy composition', 
      cat:'portrait'
    },
    {id:4,
      src:'image/C.jpg',
      title:'Composition VIII',
      desc:'Wassily Kandinsky (1923)',
      cat:'interior'
    },
    {
      id:5, 
      src:'image/help.jpg', 
      title:'The Garden of Earthly Delights', 
      desc:'Hieronymus Bosch (c. 1510)', 
      cat:'architecture'
    },
    {
      id:6, 
      src:'image/P.jpg', 
      title:'Starry Night Over the Rhône', 
      desc:'Vincent van Gogh (1888)', 
      cat:'portrait'
    },
    {
      id:7, 
      src:'image/Matissedance.jpg', 
      title:'Dance', 
      desc:'Henri Matisse (1910)', 
      cat:'interior'
    }
  ];

  const $rail = $('#galleryRail');
  const $hint = $('#filterHint');

  function renderSlides(list){
    $rail.empty();
    list.forEach(item => {
      const $slide = $(`
        <section class="gallery-slide" data-id="${item.id}" data-cat="${item.cat}">
          <div class="slide-card">
            <img src="${item.src}" alt="${item.title}" data-title="${item.title}" data-desc="${item.desc}" loading="lazy">
            <div class="slide-caption">
              <h3>${item.title}</h3>
              <p>${item.desc}</p>
            </div>
          </div>
        </section>
      `);
      $rail.append($slide);
    });
  }

  renderSlides(galleryData);


  $('.filter-btn').on('click', function(){
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
    const filter = $(this).data('filter') || '';
    let visible = 0;

    if (!filter) {
   
      $rail.find('.gallery-slide').each(function(){ $(this).removeClass('hidden').fadeIn(350); visible++; });
    } else {
      $rail.find('.gallery-slide').each(function(){
        const cat = $(this).data('cat') || '';
        if (cat === filter) { $(this).removeClass('hidden').fadeIn(350); visible++; }
        else { $(this).addClass('hidden').fadeOut(250); }
      });
    }

    if (visible === 0) {
      $hint.text('0 results').show().delay(2500).fadeOut(300);
    } else {
      $hint.text(visible + (visible===1 ? ' artwork' : ' artworks')).show().delay(1500).fadeOut(300);
    }
  });

  $rail.on('keydown', function(e){
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = $rail.find('.gallery-slide:visible').filter(function(){ return $(this).offset().top >= $rail.scrollTop() + 10; }).first().nextAll(':visible').first();
      if (next.length) $rail.animate({ scrollTop: next.position().top + $rail.scrollTop() }, 400);
    }
  });

  
  $rail.on('click', '.gallery-slide .slide-card img', function(e){
    const $img = $(this);
    const $slide = $img.closest('.gallery-slide');
    openLightboxFromSlide($slide);
  });

  const $lb = $('#lbOverlay');
  const $lbImg = $('#lbImage');
  const $lbTitle = $('#lbTitle');
  const $lbDesc = $('#lbDesc');

  function openLightboxFromSlide($slide){
    
    const $visible = $rail.find('.gallery-slide:visible');
    const idx = $visible.index($slide);
    openLightbox($visible, idx);
  }

  function openLightbox($visibleSlides, startIndex){
    
    $lb.data('slides', $visibleSlides);
    $lb.data('index', startIndex);
    showLBImage();
    $lb.fadeIn(250);
    $('body').css('overflow','hidden');
  }

  function closeLightbox(){
    $lb.fadeOut(200);
    $('body').css('overflow','');
  }

  function showLBImage(){
    const slides = $lb.data('slides') || $();
    let idx = $lb.data('index') || 0;
    const $slide = slides.eq(idx);
    const $img = $slide.find('img');
    $lbImg.attr('src', $img.attr('src'));
    $lbTitle.text($img.data('title') || '');
    $lbDesc.text($img.data('desc') || '');
  }


  $('.lb-close').on('click', closeLightbox);
  $('.lb-prev').on('click', function(){
    const slides = $lb.data('slides') || $();
    let idx = $lb.data('index') || 0;
    if (idx > 0) { idx--; $lb.data('index', idx); showLBImage(); }
  });
  $('.lb-next').on('click', function(){
    const slides = $lb.data('slides') || $();
    let idx = $lb.data('index') || 0;
    if (idx < slides.length - 1) { idx++; $lb.data('index', idx); showLBImage(); }
  });

  
  $(document).on('keydown', function(e){
    if (!$lb.is(':visible')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') $('.lb-prev').click();
    if (e.key === 'ArrowRight') $('.lb-next').click();
  });

  
  $lb.on('click', function(e){
    if ($(e.target).is('#lbOverlay') || $(e.target).is('.lb-overlay')) closeLightbox();
  });

});


