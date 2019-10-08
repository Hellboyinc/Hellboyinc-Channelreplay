var mobileVer = false;

var channelReply = {
	init: function(){
		self = this;
		
		$(document).ready(function(){
			self.preLoader();
			self.checkWindowSize();

			self.sectionType_5();

			self.pricesPage();
		});
	},
	preLoader: function() {
		$('body').addClass('preloader-hided');
	},
	checkWindowSize: function() {
		if (window.innerWidth < 768) {
			mobileVer = true;
		} else {
			mobileVer = false;
		}

		$(window).resize(function(){
			if (window.innerWidth < 768) {
				mobileVer = true;
			} else {
				mobileVer = false;
			}
		});
	},
	sectionType_5: function() {
		if ($('section.type-5')[0]) {
			sliderConstruct();

			function sliderConstruct() {
			    var $slider = $('section.type-5 .items-list'),
			    	$sliderItem = $slider.find('.item'),
			    	totalSlides = $slider.find('.item').length,
			        slickDefined = false;

			    if (mobileVer == true) {
			        makeSlider();
			    }

			    $(window).resize(function(){
			        if (mobileVer == true) {
			            if (slickDefined == true) {
			                $slider.slick('unslick');
			            }

			            makeSlider();
			        } else {
			            if (slickDefined == true) {
			                $slider.slick('unslick');
			            }
			        }
			    });

			    function makeSlider() {
			        $slider.slick({
			            dots: false,
			            focusOnSelect: false,
			            swipeToSlide: true,
			            centerMode: true,
			            slidesToShow: 1,
			            variableWidth: false,
			            arrows: false,
			            infinite: false,
			            centerPadding: '63px'
			        });

			        $slider.slick('slickGoTo', 1, true);
			        $sliderItem.eq($slider.slick('slickCurrentSlide')).prev().addClass('prev-slide');
			        $sliderItem.eq($slider.slick('slickCurrentSlide')).next().addClass('next-slide');

			        slickDefined = true;

			        $('section.type-5 .item-control-prev').on('click', function(){
			            $slider.slick('slickPrev');
			        });

			        $('section.type-5 .item-control-next').on('click', function(){
			            $slider.slick('slickNext');
			        });

					$slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
						$sliderItem.removeClass('prev-slide prev-prev-slide next-slide next-next-slide');

						$sliderItem.eq(nextSlide).prev().addClass('prev-slide');
						$sliderItem.eq(nextSlide).prev().prev().addClass('prev-prev-slide');
						$sliderItem.eq(nextSlide).next().addClass('next-slide');
						$sliderItem.eq(nextSlide).next().next().addClass('next-next-slide');
					});

					setTimeout(function(){
						$('section.type-5 .items-list .item').css('transition', '0.3s');
					});
			    }
			}
		}
	},
	pricesPage: function() {
		if ($('section.type-5')[0] && $('section.type-9')[0]) {
			// CALCULATOR
			var $calculatorToggle = $('section.type-5 .toggler-el-2-body, section.type-9 .toggler-el-2-body'),
				$messagesCounter = $('#calculator_messages_counter'),
				$calculatorRow = $('section.type-9 .calculator-row:not(.calculator-row-heading)'),
				$estimatedPrice = $('#calculator_price_counter'),
				$plan_0_ExtraMessages = $('#plan_0_extra_messages'),
				$plan_1_ExtraMessages = $('#plan_1_extra_messages'),
				$plan_2_ExtraMessages = $('#plan_2_extra_messages'),
				$plan_0_MonthlyEstimate = $('#plan_0_monthly_estimate'),
				$plan_1_MonthlyEstimate = $('#plan_1_monthly_estimate'),
				$plan_2_MonthlyEstimate = $('#plan_2_monthly_estimate'),
				$planCalculatedMobileItem = $('section.type-9 .content-row-7-item'),
				$plan_0_MobilePlanPrice = $('#mobile_plan_0_price'),
				$plan_1_MobilePlanPrice = $('#mobile_plan_1_price'),
				$plan_2_MobilePlanPrice = $('#mobile_plan_2_price'),
				$contentRow_6 = $('section.type-9 .content-row-6'),
				plan_0_MonthlyEstimate = 0,
				plan_1_MonthlyEstimate = 0,
				plan_2_MonthlyEstimate = 0,
				messagesCounter = 200,
				estimatedPrice = 39,
				bestPlan = 0,
				isCalculatorToggled = false,
				pricesForMonthlyArr = [39, 79, 199],
				pricesForAnnualArr = [31, 63, 159],
				pricesForCalcArr = pricesForMonthlyArr,
				messagesForCalcArr = [200, 1000, 4000],
				costPerExtraMessageForCalcArr = [0.05, 0.04, 0.02];

			$calculatorToggle.on('click', function(){
				toggleCalculator();
			});

			var steps = [200,300,400,500,600,700,800,900,1000,1500,2000,2500,3000,3500,4000,5000,10000,15000, 20000, 30000, 35000, 40000, 45000, 50000];

			var uiSlider = $('section.type-9 .calculator-slider').slider({
	      		min: 0,
	      		max: steps.length - 1,
	      		step: 1,
	      		value: 0,
	      		orientation: 'horizontal',
	      		range: 'min',
	      		slide: function(event, ui) {
	        		$messagesCounter.text(steps[ui.value]);
	        		messagesCounter = steps[ui.value];

	        		checkBestPlan();
	        		makeCalculations();
	      		}
	    	});

	    	prepareCalculator();

	    	function prepareCalculator() {
	    		checkBestPlan();
	    		makeCalculations();
	    	}

	    	function makeCalculations() {
	    		if (isCalculatorToggled == false) {
	    			pricesForCalcArr = pricesForMonthlyArr;
	    		} else {
	    			pricesForCalcArr = pricesForAnnualArr;
	    		}

	    		// estimated price
    			if (messagesCounter > messagesForCalcArr[bestPlan]) {
    				estimatedPrice = parseFloat(pricesForCalcArr[bestPlan] + ((messagesCounter - messagesForCalcArr[bestPlan]) * costPerExtraMessageForCalcArr[bestPlan])).toFixed(0);
    			}

    			if (messagesCounter == messagesForCalcArr[bestPlan]) {
    				estimatedPrice = parseFloat(pricesForCalcArr[bestPlan]).toFixed(0);
    			}

    			$estimatedPrice.text(estimatedPrice);
    			// estimated price end

    			// extra messages
    			if (messagesCounter - messagesForCalcArr[0] > 0) {
    				$plan_0_ExtraMessages.text(messagesCounter - messagesForCalcArr[0]);
    			} else {
    				$plan_0_ExtraMessages.text(0);
    			}

    			if (messagesCounter - messagesForCalcArr[1] > 0) {
    				$plan_1_ExtraMessages.text(messagesCounter - messagesForCalcArr[1]);
    			} else {
    				$plan_1_ExtraMessages.text(0);
    			}

    			if (messagesCounter - messagesForCalcArr[2] > 0) {
    				$plan_2_ExtraMessages.text(messagesCounter - messagesForCalcArr[2]);
    			} else {
    				$plan_2_ExtraMessages.text(0);
    			}
    			// extra messages end

    			// estimated price per plan
    			// plan 0
    			if (messagesCounter > messagesForCalcArr[0]) {
    				plan_0_MonthlyEstimate = parseFloat(pricesForCalcArr[0] + ((messagesCounter - messagesForCalcArr[0]) * costPerExtraMessageForCalcArr[0])).toFixed(0);
    			}

    			if (messagesCounter <= messagesForCalcArr[0]) {
    				plan_0_MonthlyEstimate = parseFloat(pricesForCalcArr[0]).toFixed(0);
    			}

    			$plan_0_MonthlyEstimate.text(plan_0_MonthlyEstimate);
    			// plan 0 end

    			// plan 1
    			if (messagesCounter > messagesForCalcArr[1]) {
    				plan_1_MonthlyEstimate = parseFloat(pricesForCalcArr[1] + ((messagesCounter - messagesForCalcArr[1]) * costPerExtraMessageForCalcArr[1])).toFixed(0);
    			}

    			if (messagesCounter <= messagesForCalcArr[1]) {
    				plan_1_MonthlyEstimate = parseFloat(pricesForCalcArr[1]).toFixed(0);
    			}

    			$plan_1_MonthlyEstimate.text(plan_1_MonthlyEstimate);
    			// plan 1 end

    			// plan 2
    			if (messagesCounter > messagesForCalcArr[2]) {
    				plan_2_MonthlyEstimate = parseFloat(pricesForCalcArr[2] + ((messagesCounter - messagesForCalcArr[2]) * costPerExtraMessageForCalcArr[2])).toFixed(0);
    			}

    			if (messagesCounter <= messagesForCalcArr[2]) {
    				plan_2_MonthlyEstimate = parseFloat(pricesForCalcArr[2]).toFixed(0);
    			}

    			$plan_2_MonthlyEstimate.text(plan_2_MonthlyEstimate);
    			// plan 2 end

    			if (messagesCounter == 50000) {
    				$contentRow_6.slideDown(300);
    			} else {
    				$contentRow_6.slideUp(300);
    			}
    			// estimated price per plan end

    			$plan_0_MobilePlanPrice.text(pricesForCalcArr[0]);
    			$plan_1_MobilePlanPrice.text(pricesForCalcArr[1]);
    			$plan_2_MobilePlanPrice.text(pricesForCalcArr[2]);
	    	}

	    	function checkBestPlan() {
	    		$planCalculatedMobileItem.hide();

	    		if (messagesCounter >= 200 && messagesCounter <= 900) {
	    			bestPlan = 0;

	    			$planCalculatedMobileItem.eq(0).show();
	    		}

	    		if (messagesCounter >= 1000 && messagesCounter <= 3900) {
	    			bestPlan = 1;

	    			$planCalculatedMobileItem.eq(1).show();
	    		}

	    		if (messagesCounter >= 4000 && messagesCounter <= 50000) {
	    			bestPlan = 2;

	    			$planCalculatedMobileItem.eq(2).show();
	    		}

	    		$calculatorRow.removeClass('active');
	    		$calculatorRow.eq(bestPlan).addClass('active');
	    	}

	    	function toggleCalculator() {
	    		$('body').toggleClass('calculator-toggled');

	    		isCalculatorToggled = isCalculatorToggled ? false : true;

	    		pricesForCalcArr = pricesForAnnualArr;

	    		makeCalculations();
	    	}
	    	// CALCULATOR END
		}
	}
}

channelReply.init();