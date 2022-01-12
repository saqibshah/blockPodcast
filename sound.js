jQuery(document).ready(function($){
	// var waiter;
	//Load library!!!
	var howler = new Howl({
		// src: ['https://cdn.simplecast.com/audio/f67974cd-b321-4136-b0a1-2f3528003831/episodes/6e9843fb-9d42-4b35-9eb9-ae893e602767/audio/79a3a2af-194c-4d2b-a7fc-e39cbe1d6745/default_tc.mp3?aid=rss_feed&feed=tTS5N5z_'], // file name
		src: ['https://cdn.simplecast.com/audio/f67974cd-b321-4136-b0a1-2f3528003831/episodes/6e9843fb-9d42-4b35-9eb9-ae893e602767/audio/79a3a2af-194c-4d2b-a7fc-e39cbe1d6745/default_tc.mp3?aid=rss_feed&feed=tTS5N5z_'], // file name
		// src: ['https://pdst.fm/e/chtbl.com/track/G4G47G/traffic.megaphone.fm/CAD3662781285.mp3?updated=1639690571'], // file name
		// src: ['https://pdst.fm/e/chtbl.com/track/G4G47G/traffic.megaphone.fm/CAD9241452163.mp3?updated=1636664870'], // file name
		// src: 'http://20423.live.streamtheworld.com/RADIO538.mp3',
		
		html5: true,
		volume: 1, // volue
		preload: true,
	 });

	 
 

	 howler.once('load', function(){
		 // console.log(howler.state());
		handleLoad();
		totalDuration();
		if(localStorage.getItem('played')){
			
			//just update width
			howler.seek(localStorage.getItem('played') - 5);
			updateWidth(true); //force update.. 
			// let counter = howler.seek();
			// counter = counter;

			// let width = (counter/howler.duration())*100;
			// $('.hp_range').stop(true,true).animate({'width':( width +'%')},0,'linear');

			// var date = new Date(null);
			// date.setSeconds(counter); // specify value for SECONDS here

			// if(counter > 3600){ //greater than 1 hour
			// 	var result = date.toISOString().substr(11, 8);
			// }
			// else{
			// 	var result = date.toISOString().substr(14, 5);
			// }
			// $('.timer.counter').html(result);
		}
	});

	howler.on('end', function(){
		$('.hwPause').click();
		localStorage.setItem('played', 0);
	});

	//   howler.on('loading', loadingAudio);
	  function loadingAudio(){
		  console.log('Loading!!!')
	  }
	//   howler.on('load', handleLoad);

	//   const bufferProgress;
    function handleLoad(){
    
        const node = howler._sounds[0]._node;
        node.addEventListener('progress', () => {

        // console.log('LoadingStops');
        const duration = howler.duration();
        // https://developer.mozilla.org/en-US/Apps/Fundamentals/Audio_and_video_delivery/buffering_seeking_time_ranges#Creating_our_own_Buffering_Feedback
        if (duration > 0) {
            for (let i = 0; i < node.buffered.length; i++) {

            if (node.buffered.start(node.buffered.length - 1 - i) < node.currentTime) {
                const bufferProgress = (node.buffered.end(node.buffered.length - 1 - i) / duration) * 100;
                break;
            }
            }
        }
        });

        node.addEventListener('timeupdate', function() {
        var duration =  howler.duration();
        if (duration > 0) {
            // $('.hp_range_buffer').style.width = ((node.currentTime / duration)*100) + "%";
            if(!node.buffered.length) return false;
            let width = (node.buffered.end(node.buffered.length - 1) / duration) * 100;

            $('.hp_range_buffer').stop(true,true).animate({'width': width +'%'},100,'linear');
            updateWidth();
        }
        });
        
        node.addEventListener('loadstart', function() {
        // console.log('loadstart');
        $('.hp_buffering').show();
        // console.log('02 - start buffering');
        });
        node.addEventListener('loadeddata', function() {
        // console.log('loadeddata');
        });
        node.addEventListener('waiting', function() {
        // console.log('start buffering');
        $('.hp_buffering').show();
        // Start buffereing animation... 
        });
        node.addEventListener('progress', function() {
        // console.log('progress');
        });
        node.addEventListener('canplaythrough', function() {
        // console.log('canplaythrough');
        $('.hp_buffering').hide();
        // Stop buffering animation
        });
        
        node.addEventListener('canplay', function() {
        //   console.log('canplay triggered');
            // Stop buffering animation
        });
        node.addEventListener('play', function() {
            // console.log('Play is triggered!!!');
            $('.hwPlay').click();
        });
        node.addEventListener('pause', function() {
            // console.log('pause is triggered!!!');
            $('.hwPause').click();
        });
    }

	$(".hwPlay").on("click", function(){
		
		howler.pause();
		if(!howler.playing()){
			howler.play(); // this method for playing music
		}
		// handleLoad();

		if($(this).hasClass('first-time')){
			
			console.log('First playing Yes!!!');
			dataLayer.push({
				event: 'uniquePlayClicked', 
				podcast: 'Peter Hopwood, Speaking Trainer, TedX Coach | How to Deliver a Story on a TedX Stage'
			});
			
		}
		$(this).removeClass('first-time');

	//    console.log('state', howler.state());
	   $(".hwPlay").hide();
	   $(".hwPause").show();
	});

	// timestamp play/pause
	$(document).on('click','.timestamp-control',function(){
		if($(this).hasClass('pause')){
			$('.hwPause').click();
		}else{
			let li = $(this).parents('li:first');
			if(li.hasClass('active')){
				$('.hwPlay').click();
			}
			else{
				li.find('.ts-left-container').click();
			}
		}
	})
 
	$(".hwPause").on("click", function(){

	   howler.pause(); // this method for pause music

	   $(".hwPlay").show();
	   $(".hwPause").hide();
	   updateWidth(true);
	});
 
	$("#voladd").on("click", function(){
	   var vol = howler.volume(); // this method get currently volume music
	   vol += 0.1; // adding volume
	   if(vol > 1){
		  vol = 1; // If the volume is greater than 1, it is equal to 1
	   }
	   howler.volume(vol) // This method determines the volume
	   console.log('Volume Up: ', vol);
	}); 
 
	$("#volmin").on("click", function(){
			 var vol = howler.volume(); // this method get currently volume music
	   vol -= 0.1; // subtracting volume
	   if(vol < 0){
		  vol = 1; // If the volume is smaller than 0, it is equal to 0
	   }
	   howler.volume(vol) // This method determines the volume
	   console.log('Volume Down: ', vol);
	}); 

	// Progress Bar
	setInterval(() => {
		if(howler.playing()){
			updateWidth(); 
		}
	},500);
	  
	  function updateWidth(force=false) {
		if (howler.playing() || force) {

			let counter = howler.seek();
			let total = howler.duration();

			if(howler.playing()){
				localStorage.setItem('played', counter);
			}

			var date = new Date(null);
			date.setSeconds(counter); // specify value for SECONDS here

			if(counter > 3600){ //greater than 1 hour
				var result = date.toISOString().substr(11, 8);
			}
			else{
				var result = date.toISOString().substr(14, 5);
			}
			$('.timer.counter').html(result);

		  	let width = (howler.seek()/howler.duration())*100;
			
			$('.hp_range').stop(true,true).animate({'width':( width +'%')},0,'linear');

			// update timestamp (if exist) active class
			$('.timestampJumper').each(function(e){
				let start = $(this).data('value');
				let end = $(this).data('end');

				if(counter > start && counter < end){

					// $('.timestampJumper').removeClass('active');
					if(!$(this).hasClass('active')){
						$(this).addClass('active');
					}

					if(!howler.playing()){
						$(this).find('.timestamp-control.pause').hide();
						$(this).find('.timestamp-control.play').show();
					}else{
						$(this).find('.timestamp-control.pause').show();
						$(this).find('.timestamp-control.play').hide();
					}

					// update width... 
					let tsWidth = end - start;
					let currentPerc = ((counter - start) / tsWidth) * 100;

					
					$(this).find('.ts-progress').stop(true,true).animate({'width':( currentPerc +'%')},100,'linear');
					
				}
				else{
					if($(this).hasClass('active')){
						$(this).removeClass('active');
					}
					if($(this).find('.ts-progress').width() > 0){
						$(this).find('.ts-progress').stop(true,true).animate({'width':( 0 +'%')},100,'linear');
					}
				}

			})

		}
	  }
	
	//   forward
	$(document).on('click', '.hwForward', function(e){
		let currentPlay = howler.seek();

		if(!howler.playing()) return false;

		$('.hwPause').click();
		howler.seek(currentPlay + 20);
		setTimeout(() => {
			$('.hwPlay').click();
		}, 300);
	});
	// Backward
	$(document).on('click', '.hwBackward', function(e){

		if(!howler.playing()) return false;
		let currentPlay = howler.seek();
		$('.hwPause').click();
		howler.seek(currentPlay - 10);
		setTimeout(() => {
			$('.hwPlay').click();
		}, 300);
	});
   
	// Playback Speed
	$(document).on('click', '.playbackSpeed', function(e){

		if(!howler.playing()) return false; 

		let rate = howler.rate();
		let newRate = 1;
		switch (rate) {
			case 1:  
				newRate = 1.5;
			break;
			case 1.5:
				newRate = 2;
			break;
			case 2:
				newRate = 0.75;
			break;
			case 0.75:
				newRate = 1;
			break;
		
			default:
				newRate = 1;
				break;
		}
		howler.rate(newRate);
		$('.playbackSpeed').html(newRate + 'x');
		// console.log('Playback-speed');
	});

	// Timestamp Jumper
	$(document).on('click', '.timestampJumper .ts-left-container', function(e){
		e.preventDefault();
		let target = $(this).parent().data('value') * 1;
		
		$('.hwPause').click();
		howler.seek(target);
		
		setTimeout(() => {
			$('.hwPlay').click();
		}, 800);
		
	});
	// timeline
	$(document).on('click', '.hp_slide', function(e){
		e.preventDefault();

		let progressBarWidth = $('.hp_slide').width();
		
		var rect = e.target.getBoundingClientRect();
		var x = e.clientX - rect.left; //x position within the element.
		var y = e.clientY - rect.top;  //y position within the element.

		var xPer = ((x / progressBarWidth) * 100).toFixed(2);

		$('.hp_range').stop(true,true).animate({'width':( xPer +'%')},100,'linear');

		let total = howler.duration();
		let target = (xPer/100) * total;

		// console.log(total, target);
		// return false;

		const node = howler._sounds[0]._node;
		var buffered = 0;
		if(node.buffered && node.buffered.length){
			buffered = node.buffered.end(node.buffered.length - 1);
		}
		// console.log(buffered, howler.seek(), howler.duration());

		// const bufferProgress = (node.buffered.end(node.buffered.length - 1) / duration) * 100;

		if(howler.seek() < target && buffered > target){
			$(".hwPause").click();
		}
		else{
			// do unload and reload
			howler.unload();
			howler.load();
			$(".hwPause").click();
			console.log('Unload');
		}
		// howler.pause();
		
		

		howler.seek(target);
		setTimeout(() => {
			// howler.play();
			$(".hwPlay").click();
		}, 1000);
	});

	// other details
	$(document).on('click', '.audio-footer li', function(e){
		e.preventDefault();
		$('.audioPlayer').hide();
		$('.playerOtherDetails').show();
		
		let target = $(this).data('target');

		// $(this)
		$('.top-buttons li[data-load="'+ target +'"]').click();
	});

	// back to player
	$(document).on('click','.portablePlayer .mobile-content',function(e){
		e.preventDefault();
		$('.audioPlayer').show();
		$('.playerOtherDetails').hide();
	})

	function totalDuration(){

		let total = howler.duration();
		
		if(total == Infinity) {
			$('.hwForward, .hwBackward').hide();
			return false; 
		}

		var date = new Date(null);
		date.setSeconds(total); // specify value for SECONDS here

		if(total > 3600){ //greater than 1 hour
			var result = date.toISOString().substr(11, 8);
		}
		else{
			var result = date.toISOString().substr(14, 5);
		}
		$('.timer.timerTotal').html(result);
	 }

	//  switch mobile summary - timestamp buttons
	$(document).on('click','.top-buttons li',function(){
		$('.top-buttons li.active').removeClass('active');
		$(this).addClass('active');

		$('.d-hideable').hide();
		let load = $(this).data('load');
		$('.'+load).show();
	})

	// Test.. 
	let drag = false;
	let isClick = false;
	var bar = document.getElementById('draggableBar');
	bar.addEventListener('mousedown', (e) => {
		drag = false;
		isClick=true;


		// let progressBarWidth = $('.hp_slide').width();

	});
	document.addEventListener('mousemove', (e) => {
		drag = true;
		
		if(isClick){
			var rect = e.target.getBoundingClientRect();

			var x;
			var leftPos  = $("#draggableBar")[0].getBoundingClientRect().left   + $(window)['scrollLeft']();
			x = (rect.left > 0) ? e.clientX - rect.left : e.clientX - rect.left - leftPos;
			x  = x < 0 ? 0 : x;

			updatePositionX(x);
		}
		 
	});
	document.addEventListener('mouseup', (e) => {

		if(isClick){
			var rect = e.target.getBoundingClientRect();
			var x;
			var leftPos  = $("#draggableBar")[0].getBoundingClientRect().left   + $(window)['scrollLeft']();
			x = (rect.left > 0) ? e.clientX - rect.left : e.clientX - rect.left - leftPos;
			x  = x < 0 ? 0 : x;
			updatePositionX(x);
			isClick=false;
		}
	});

	bar.addEventListener("touchstart", (e) => {
		drag = false;
		isClick=true;
		
		var leftPos  = $("#draggableBar")[0].getBoundingClientRect().left   + $(window)['scrollLeft']();
		var x = e.touches[0].pageX - leftPos;
		x  = x < 0 ? 0 : x;
		updatePositionX(x);
		
		e.preventDefault();
		console.log('Touch start');

	});
	document.addEventListener("touchmove", (e)=>{
		// e.preventDefault();
		drag = true;
		
		if(isClick){
			var leftPos  = $("#draggableBar")[0].getBoundingClientRect().left   + $(window)['scrollLeft']();
			var x = e.touches[0].pageX - leftPos;
			x  = x < 0 ? 0 : x;
			updatePositionX(x);
		}
	});

	document.addEventListener("touchend", (e)=>{
		
		drag = false;
		isClick=false;

	});
	document.addEventListener("touchcancel", (e) => {
		drag = false;
		isClick=false;
	});

	function updatePositionX(x){

		let progressBarWidth = $('#draggableBar').width();
		var xPer = ((x / progressBarWidth) * 100).toFixed(2);
		$('.elDrag').stop(true,true).animate({'width':( xPer +'%')},100,'linear');
		// console.log('Pos X: ', x);
	}

 });