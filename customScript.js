// JavaScript Document

$(function(){
	var productName,
		productPrice,
		newproductSRC,
		productSRC,
		productLink;
	$('.startPanel img').click(function(e){
		$('.productDetail').animate({
			'top':'40px'
		}, 1000)
		productName = $(this).attr('alt');
		productSRC = $(this).attr('src');
		productLink = $(this).parent().attr('href');
		
		$('.productName h1').text(productName);
		newproductSRC = productSRC.replace('','');
	//	console.log(newproductSRC)
		$('#detailImg').attr('src', newproductSRC)
		$('#detailImg').attr('alt', productName);
		$('.cta1').attr('href', productLink);
		
		$("html, body").animate({ scrollTop: 0 },500);
		$('.slideContainer').animate({'height':'565px'},500);
                $('.slideContainer h2').delay(1000).fadeOut();
        $('#back').fadeIn();
	    $('.swiperInfo').delay(2500).fadeOut();
	    window.location.hash = "NEWSANUKS";
        e.preventDefault();
	});

$('.swiperInfo').click(function(){
	$(this).stop().fadeOut();
});
	$('#back').click(function(){
		$('.productDetail').animate({
			'top':'-100%'
		}, 500)
		$(this).fadeOut();
		$('.slideContainer').css({'height':'auto'});
		ecomPosition();
	});
	
	  var mySwiper = $('.swiper-container').swiper({
    mode: 'horizontal',
    loop: true,
    onSlideChangeEnd: function () {
      $('.swiper-slide img').removeAttr('id')
      $('.swiper-slide-active img').attr('id', 'currentArm')
    }
  });
  $('#swiperL').click(function () {

    mySwiper.swipePrev()
  })

  $('#swiperR').click(function () {

    mySwiper.swipeNext()
  });

  $('.cta2').click(function () {
    $('#loading').fadeIn().delay(1000).fadeOut();
    drawCanvas();
  });


  $('#dl').click(function () {
    $('#i').fadeIn();
    saveCanvas();
  })

  $('#i, #closeImg').click(function () {
    $(this).fadeOut();
  });
  
  
   function ecomPosition(){
  if(($('.slideContainer').height()+200) < $(window).height()){
	$('.ecomEntry').css({'position':'absolute'})
	}else{
	$('.ecomEntry').css({'position':'relative'})
	}
  
  }
	$(window).resize(function() {
	ecomPosition()
	
	})

})

