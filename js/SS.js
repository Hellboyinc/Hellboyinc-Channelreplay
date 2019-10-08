// SERJY SLIDER
function SerjiSlyder(options) {
	var defaults = {
		index: 0,
		oldIndex: 0,
		direction: '',
		$controls: undefined,
		$pagination: undefined,
		$paginationElements: undefined,
		$paginationClass: '',
		$paginationText: '',
		$slides: undefined,
		$actionField: undefined,
		animFn: function animation(direction, $slides, $actionField, oldIndex, index) {
        	if(direction == 'right') {
        		TweenLite.fromTo($slides.eq(oldIndex),0.5,{x:0,opacity:1,display:'block'},{x:-80,opacity:0,display:'none',ease:Power1.easeInOut});
        		TweenLite.fromTo($slides.eq(index),1,{x:80,opacity:0,display:'none'},{x:0,opacity:1,display:'block',ease:Power1.easeInOut});
        	} else {
        		TweenLite.fromTo($slides.eq(oldIndex),0.5,{x:0,opacity:1,display:'block'},{x:80,opacity:0,display:'none',ease:Power1.easeInOut});
        		TweenLite.fromTo($slides.eq(index),1,{x:-80,opacity:0,display:'none'},{x:0,opacity:1,display:'block',ease:Power1.easeInOut});
        	}
        }
	};

	this.settings = $.extend({}, defaults, options);
	this.animFn = this.settings.animFn || defaults.animFn;

	this.init = function(){
		var that = this;

		TweenLite.set(this.settings.$slides,{opacity:0,display:'none'});
		TweenLite.set(this.settings.$slides.eq(this.settings.index),{opacity:1,display:'block'});

		if(this.settings.$pagination != undefined) {
			var tempList = '';

			this.settings.$slides.each(function(){
				tempList += '<div class="'+that.settings.$paginationClass+'">'+that.settings.$paginationText+'</div>';
			});
			that.settings.$pagination.append(tempList);

			this.settings.$paginationElements = this.settings.$pagination.find('div');
			this.settings.$paginationElements.eq(this.settings.index).addClass('active');
		}

		this.slideChange();
	};

	this.slideChange = function(){
		var that = this;

		if(this.settings.$controls != undefined) {
			this.settings.$controls.click(function(){
				that.settings.oldIndex = that.settings.index;
				
				if($(this).hasClass('right')) {
					that.settings.index++;
					that.settings.direction = 'right';
				} else {
					that.settings.index--;
					that.settings.direction = 'left';
				}

				slideChangeExe();
			});
		}

		if(this.settings.$actionField == undefined) {
			this.settings.$actionField = this.settings.$slides;
		}

		this.settings.$actionField.on('swipeleft', swipeHandlerLeft);

		function swipeHandlerLeft(event) {
			that.settings.oldIndex = that.settings.index;

			that.settings.index++;
			that.settings.direction = 'left';

			slideChangeExe();
		}

		this.settings.$actionField.on('swiperight', swipeHandlerRight);

		function swipeHandlerRight(event) {
			that.settings.oldIndex = that.settings.index;

			that.settings.index--;
			that.settings.direction = 'right';

			slideChangeExe();
		}

		if(this.settings.$pagination != undefined) {
			this.settings.$paginationElements.click(function(){
				that.settings.oldIndex = that.settings.index;

				that.settings.index = $(this).index();
				if(that.settings.index > that.settings.oldIndex) {
					that.settings.direction = 'left';
				} else {
					that.settings.direction = 'right';
				}

				slideChangeExe();
			});
		}

		var mouseWheelTimeout;

		this.settings.$actionField.bind('mousewheel',function(event) {
			clearTimeout(mouseWheelTimeout);

			mouseWheelTimeout = setTimeout(function(){
				if(event.originalEvent.wheelDelta /120 < 0) {
					that.settings.oldIndex = that.settings.index;

					that.settings.index++;
					that.settings.direction = 'left';

					slideChangeExe();
				} else {
					that.settings.oldIndex = that.settings.index;

					that.settings.index--;
					that.settings.direction = 'right';

					slideChangeExe();
				}
			}, 100);
		});

		function slideChangeExe() {
			if(that.settings.index >= that.settings.$slides.length) {
				that.settings.index = 0;
			} else {
				if(that.settings.index <= -1) {
					that.settings.index = that.settings.$slides.length-1;
				}
			}
			
			if(that.settings.$pagination != undefined) {
				that.settings.$paginationElements.removeClass('active');
				that.settings.$paginationElements.eq(that.settings.oldIndex).removeClass('active');
				that.settings.$paginationElements.eq(that.settings.index).addClass('active');
			}

			that.settings.animFn(that.settings.direction,that.settings.$slides,that.settings.$actionField,that.settings.oldIndex,that.settings.index);
		}
	}

	this.init();
}
// SERJY SLIDER END