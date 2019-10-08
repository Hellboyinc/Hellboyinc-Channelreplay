var mobileVer = false;

var channelReply = {
	init: function(){
		self = this;
		
		$(document).ready(function(){
			self.preLoader();
			self.checkWindowSize();

			self.sectionType_5();

			self.pricesPage();
			self.onboardingPage();

			self.onScrollAnimation();
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
	},
	onboardingPage: function() {
		if ($('section.type-10')[0]) {
			// CUSTOM SELECT
			$('section.type-10 .onboard-slide-item-type-7 .block-list select').each(function(){					
				var sb = new SelectBox({
					selectbox: $(this),
					width: 300,
					height: 100
				});

				$(this).parents('.custom-select-outer').find('.customSelect dd').eq(0).hide();
			});
			// CUSTOM SELECT END

			// VIDEO
			var $video = $('section.type-10 .el-video-for-logic'),
				video_isPlaying = false;

			$video.on('click', function(){
				if (video_isPlaying == false) {
					video_isPlaying = true;

					$(this).find('video').get(0).play();
					$(this).addClass('is-playing');
					$(this).find('video').prop('controls', true);

					TweenLite.to($(this).find('.el-video-play-for-logic img'), 0.5, {opacity:0, scale:2, ease:Power2.easeOut});
				} else {
					video_isPlaying = false;

					$(this).find('video').get(0).pause();
					$(this).removeClass('is-playing');
					$(this).find('video').prop('controls', false);

					TweenLite.to($(this).find('.el-video-play-for-logic img'), 0.5, {opacity:1, scale:1, ease:Power2.easeOut});
				}
			});
			// VIDEO END

			// COPY EMAIL
			var $emailCopyButton = $('section.type-10 .yv-el-email-button'),
				$emailTextForCopy = $('section.type-10 .yv-el-email-text');

			$emailCopyButton.on('click', function(){
				var $temp = $('<input>');

				$('body').append($temp);

				$temp.val($emailTextForCopy.text()).select();

				document.execCommand('copy');

				$temp.remove();
			});
			// COPY EMAIL END

			// FORM
			var $form = $('section.type-10 .form-for-logic'),
				$formInput = $form.find('input:not([type="submit"])'),
				$formSubmit = $form.find('button[type="submit"]'),
				// "$formInputWithError" one is for checking errors (tip)
				$formInputWithError = $formInput.eq(1);
				// "$formInputWithSuccess" one is for setting success tick (tip)
				$formInputWithSuccess = $formInput.eq(0);
				// "$formWithError" one is for setting general error (tip)
				$formWithError = $form;
				$formInputAlertType_1 = $formInput.parents('.block-form-item').find('.el-hidden-text-1'),
				$formInputAlertType_2 = $formInput.parents('.block-form-item').find('.el-hidden-text-2'),
				$formGeneralAlert = $form.find('.error-block');

			$formInput.focus(function(){
				if (!$(this).parents('.block-form-item').hasClass('input-with-error')) {
					var $formInputAlertType_1 = $(this).parents('.block-form-item').find('.el-hidden-text-1');
					TweenLite.fromTo($formInputAlertType_1, 0.3, {pointerEvents:'none', opacity:0, x:10}, {pointerEvents:'all', opacity:1, x:0, ease:Power2.easeOut});
				}
			});

			$formInput.focusout(function(){
				if (!$(this).parents('.block-form-item').hasClass('input-with-error')) {
					var $formInputAlertType_1 = $(this).parents('.block-form-item').find('.el-hidden-text-1');

					TweenLite.fromTo($formInputAlertType_1, 0.3, {pointerEvents:'all', opacity:1}, {pointerEvents:'none', opacity:0, ease:Power2.easeOut});
				}
			});

			function setErrorWarnings() {
				$formInputWithError.parents('.block-form-item').addClass('input-with-error');

				var $formInputAlertType_2 = $formInputWithError.parents('.block-form-item').find('.el-hidden-text-2');

				TweenMax.staggerFromTo($formInputAlertType_2, 0.3, {pointerEvents:'none', opacity:0, x:10}, {pointerEvents:'all', opacity:1, x:0, ease:Power2.easeOut}, 0.1);
			}

			function removeErrorWarnings() {
				$formInputWithError.parents('.block-form-item').removeClass('input-with-error');

				var $formInputAlertType_2 = $formInputWithError.parents('.block-form-item').find('.el-hidden-text-2');

				TweenMax.staggerFromTo($formInputAlertType_2, 0.3, {pointerEvents:'none', opacity:1, x:0}, {pointerEvents:'all', opacity:0, x:-10, ease:Power2.easeOut}, 0.1);
			}

			function setGeneralError() {
				if ($formWithError.find($formGeneralAlert)[0]) {
					TweenLite.fromTo($formWithError.find($formGeneralAlert), 0.3, {display:'none', opacity:0, y:10}, {display:'block', opacity:1, y:0, ease:Power2.easeOut});
				}
			}

			function removeGeneralError() {
				if ($formWithError.find($formGeneralAlert)[0]) {
					TweenLite.fromTo($formWithError.find($formGeneralAlert), 0.3, {display:'block', opacity:1, y:0}, {display:'none', opacity:0, y:10, ease:Power2.easeOut});
				}
			}

			function setSuccessInput() {
				$formInputWithSuccess.parents('.block-form-item').addClass('input-with-success');
			}

			function removeSuccessInput() {
				$formInputWithSuccess.parents('.block-form-item').removeClass('input-with-success');
			}

			$formSubmit.on('click', function() {
				enableNextButton();

				setErrorWarnings();
				setSuccessInput();

				$(this).find('.button-success-tic-icon').show();
				$(this).find('.button-text-1').hide();
				$(this).find('.button-text-2').show();

				setGeneralError();
			});
			// FORM END

			var $backButton = $('section.type-10 .el-back-button'),
				$nextButton = $('section.type-10 .el-next-button'),
				$pager = $('section.type-10 .pager-outer');

			var	$item = $('section.type-10 .onboard-slide-item'),
				$previousItem = $item.eq(0);
				
			var $introGroup = $('section.type-10 .onboard-list-first-item');

			var $zendeskGroup = $('section.type-10 .onboard-item-Zendesk'),
				$deskGroup = $('section.type-10 .onboard-item-desk'),
				$freshdeskGroup = $('section.type-10 .onboard-item-Freshdesk'),
				$helpscoutGroup = $('section.type-10 .onboard-item-Help-scout'),
				$gorgiasGroup = $('section.type-10 .onboard-item-Gorgias');

			var $ebayGroup = $('section.type-10 .onboard-item-ebay'),
				$amazonGroup = $('section.type-10 .onboard-item-amazon');

			var $amazonRegionSlide = $('section.type-10 .onboard-slide-item-for-amazon-region'),
				$amazonRegionSlideItem = $('section.type-10 .amazon-country-choice-item'),
				$amazonRegionSlideItemActive = $('section.type-10 .amazon-country-choice-item-america'),
				amazonCountrySelected = false;

			var $newMarketplaceGroup = $('section.type-10 .onboard-item-add-new-marketplace');

			var $activeGroup = $introGroup,
				previousGroupsHistoryArray = [],
				currentIndex = 0;

			var $additionalSlideForHelpscout = $('section.type-10 .onboard-slide-item-for-helpscout'),
				additionalSlideForHelpscoutActivated;

			// INIT
			slidesInit();

			function slidesInit() {
				$item.hide();
				$item.eq(0).show();

				hideAllBottomElements();
				changeBottomPart();

				slideAnimation();

				deactivateHelpscoutSlide();
			}

			// additional slide for helpscout
			function activateHelpscoutSlide() {
				$additionalSlideForHelpscout.addClass('onboard-slide-item');
				additionalSlideForHelpscoutActivated = true;
			}

			function deactivateHelpscoutSlide() {
				$additionalSlideForHelpscout.removeClass('onboard-slide-item');
				additionalSlideForHelpscoutActivated = false;
			}
			// additional slider for helpscout end
			// INIT END

			// BOTTOM PART
			// back button
			function showBackButton() {
				$backButton.show();

				$('section.type-10').removeClass('mobile-bottom-hidden');
			}

			function hideBackButton() {
				$backButton.hide();
			}
			// back button end

			// next button
			function showNextButton() {
				$nextButton.css('visibility', 'visible');

				$('section.type-10').removeClass('mobile-bottom-hidden');
			}

			function hideNextButton() {
				$nextButton.css('visibility', 'hidden');
			}

			function disableNextButton() {
				$nextButton.addClass('disabled');
			}

			function enableNextButton() {
				$nextButton.removeClass('disabled');
			}
			// next button end

			// pager
			function showPager() {
				$pager.show();

				generatePagerDots();

				$('section.type-10').removeClass('mobile-bottom-hidden');
			}

			function hidePager() {
				$pager.hide();
			}

			function generatePagerDots() {
				var pagerDotHTML = '<div class="pager-dot"></div>',
					totalSlidesCount = $activeGroup.find($item).length - 1;

				$pager.find('.pager').html('');

				for (var i = 0; totalSlidesCount > i; i++) {
					$pager.find('.pager').append(pagerDotHTML);
				};

				$pager.find('.pager-dot').eq(currentIndex).addClass('active');
			}
			// pager end

			function showAllBottomElements() {
				showBackButton();
				showPager();
				showNextButton();

				$('section.type-10').removeClass('mobile-bottom-hidden');
			}

			function hideAllBottomElements() {
				hideBackButton();
				hidePager();
				hideNextButton();

				$('section.type-10').addClass('mobile-bottom-hidden');
			}

			function changeBottomPart() {
				$('section.type-10 .content-place').scrollTop(0)

				hideAllBottomElements();
				enableNextButton();

				// intro group
				if ($activeGroup == $introGroup) {
					if (currentIndex == 0) {
						showNextButton();
					}

					if (currentIndex == 1) {
						showBackButton();
					}
				}
				// intro group end

				// desk group
				if ($activeGroup == $zendeskGroup) {
					if (currentIndex == 0) {
						showAllBottomElements();
					}

					if (currentIndex == 1) {
						showAllBottomElements();
						disableNextButton();
					}

					if (currentIndex == 2) {
						hideAllBottomElements();
					}
				}

				if ($activeGroup == $deskGroup) {
					if (currentIndex == 0) {
						showBackButton();
						showNextButton();
					}

					if (currentIndex == 1) {
						
					}
				}

				if ($activeGroup == $freshdeskGroup) {
					if (currentIndex == 0) {
						showAllBottomElements();
						disableNextButton();
					}

					if (currentIndex == 1) {
						showAllBottomElements();
					}

					if (currentIndex == 2) {
						hideAllBottomElements();
					}
				}

				if ($activeGroup == $helpscoutGroup) {
					if (currentIndex == 0) {
						showAllBottomElements();
					}

					if (currentIndex == 1) {
						showAllBottomElements();
						disableNextButton();
					}

					if (currentIndex == 2) {
						showAllBottomElements();
						disableNextButton();
					}

					if (currentIndex == 3) {
						hideAllBottomElements();
					}
				}

				if ($activeGroup == $gorgiasGroup) {
					if (currentIndex == 0) {
						showBackButton();
						showNextButton();
						disableNextButton();
					}

					if (currentIndex == 1) {
						hideAllBottomElements();
					}
				}
				// desk group end

				// marketplace group
				if ($activeGroup == $ebayGroup) {
					if (additionalSlideForHelpscoutActivated == true) {
						if (currentIndex == 0) {
							showAllBottomElements();
							disableNextButton();
						}

						if (currentIndex == 1) {
							showAllBottomElements();
						}

						if (currentIndex == 2) {
							showAllBottomElements();
						}

						if (currentIndex == 3) {
							hideAllBottomElements();
						}
					} else {
						if (currentIndex == 0) {
							showAllBottomElements();
						}

						if (currentIndex == 1) {
							showAllBottomElements();
						}

						if (currentIndex == 2) {
							hideAllBottomElements();
						}
					}
				}

				if ($activeGroup == $amazonGroup) {
					if (additionalSlideForHelpscoutActivated == true) {
						if (currentIndex == 0) {
							showBackButton();
							showPager();
						}

						if (currentIndex == 1) {
							showAllBottomElements();

							if (amazonCountrySelected == false) {
								disableNextButton();
							}
						}

						if (currentIndex == 2) {
							showAllBottomElements();
							disableNextButton();
						}

						if (currentIndex == 3) {
							showBackButton();
							showPager();
						}

						if (currentIndex == 4) {
							showAllBottomElements();
						}

						if (currentIndex == 5) {
							showAllBottomElements();
						}

						if (currentIndex == 6) {
							hideAllBottomElements();
						}
					} else {
						if (currentIndex == 0) {
							showBackButton();
							showPager();
						}

						if (currentIndex == 1) {
							showAllBottomElements();

							if (amazonCountrySelected == false) {
								disableNextButton();
							}
						}

						if (currentIndex == 2) {
							showBackButton();
							showPager();
						}

						if (currentIndex == 3) {
							showAllBottomElements();
						}

						if (currentIndex == 4) {
							showAllBottomElements();
						}

						if (currentIndex == 5) {
							hideAllBottomElements();
						}
					}
					
				}

				if ($activeGroup == $newMarketplaceGroup) {
					if (currentIndex == 0) {
						showBackButton();
					}
				}
				// marketplace group end

				doSomethingAfterChangingBottomPart();

				doSomethingAfterChangingBottomPart = function(){};
			}

			function doSomethingAfterChangingBottomPart() {
				
			};
			// BOTTOM PART END

			// NAVIGATION
			// next slide
			function nextSlide(opt) {
				var nextHelpdeskGroup = '';

				if (typeof opt !== 'undefined') {
					if (typeof opt.helpdeskGroup !== 'undefined') {
						var nextHelpdeskGroup = opt.helpdeskGroup;
					}
				}

				$previousItem = $activeGroup.find($item).eq(currentIndex);

				currentIndex++;

				if ($activeGroup.find($item).eq(currentIndex)[0]) {
					$previousItem.hide();

					nextGroup(nextHelpdeskGroup);

					$activeGroup.find($item).eq(currentIndex).show();
				} else {
					currentIndex--;

					$previousItem.hide();

					nextGroup(nextHelpdeskGroup);

					$activeGroup.find($item).eq(currentIndex).show();
				}

				changeBottomPart();
				slideAnimation();
			}
			// next slide

			// prev slide
			function prevSlide(opt) {
				var nextHelpdeskGroup = '';

				if (typeof opt !== 'undefined') {
					if (typeof opt.helpdeskGroup !== 'undefined') {
						var nextHelpdeskGroup = opt.helpdeskGroup;
					}
				}

				$previousItem = $activeGroup.find($item).eq(currentIndex);

				currentIndex--;

				if ($activeGroup.find($item).eq(currentIndex)[0] && currentIndex >= 0) {
					$previousItem.hide();

					$activeGroup.find($item).eq(currentIndex).show();
				} else {
					prevGroup();
				}

				changeBottomPart();
				slideAnimation();
				amazonSlideChoiceOfCountryAnimation();
			}
			// prev slide end

			// go to specific slide
			function goToSpecificSlide(_$activeGroup, _$prevGroup, slideIndex) {
				$item = $('section.type-10 .onboard-slide-item');

				$previousItem.hide();

				$activeGroup = _$activeGroup;
				currentIndex = slideIndex;

				previousGroupsHistoryArray.push(_$prevGroup);

				$activeGroup.find($item).eq(currentIndex).show();

				changeBottomPart();
				slideAnimation();
			}

			// use "goToSpecificSlide" function for going to certain slide (tip)
			// goToSpecificSlide($gorgiasGroup, $introGroup, 0);
			// go to specific slide end

			// change active group
			function nextGroup(_helpdeskGroup) {
				if (_helpdeskGroup != '') {
					$item = $('section.type-10 .onboard-slide-item');

					currentIndex = 0;

					previousGroupsHistoryArray.push($activeGroup);

					switch (_helpdeskGroup) {
						case 'zendesk_group_button':
							deactivateHelpscoutSlide();
							$activeGroup = $zendeskGroup;
							break;
						case 'desk_group_button':
							deactivateHelpscoutSlide();
							$activeGroup = $deskGroup;
							break;
						case 'freshdesk_group_button':
							deactivateHelpscoutSlide();
							$activeGroup = $freshdeskGroup;
							break;
						case 'helpscout_group_button':
							$activeGroup = $helpscoutGroup;
							activateHelpscoutSlide();
							break;
						case 'gorgias_group_button':
							$activeGroup = $gorgiasGroup;
							deactivateHelpscoutSlide();
							break;
						case 'ebay_group_button':
							$activeGroup = $ebayGroup;
							break;
						case 'amazon_group_button':
							$activeGroup = $amazonGroup;
							break;
						case 'add_new_marketplace_group_button':
							$activeGroup = $newMarketplaceGroup;
							break;
						default:
							break;
					}
				}
			}

			function prevGroup() {
				$previousItem.hide();

				$activeGroup = previousGroupsHistoryArray[previousGroupsHistoryArray.length - 1];
				previousGroupsHistoryArray.splice(-1,1);

				currentIndex = $activeGroup.find($item).length - 1;

				$activeGroup.find($item).eq(currentIndex).show();
			}
			// change active group end
			// NAVIGATION END

			$nextButton.on('click', function(){
				nextSlide();
			});

			$('section.type-10 .next-button-for-logic').on('click', function(){
				nextSlide();
			});

			$backButton.on('click', function(){
				prevSlide();
			});

			// CHOICE OF HELPDESK
			var $helpdeskButton = $('section.type-10 .onboard-list-first-item .block-icon');

			$helpdeskButton.on('click', function(){
				var helpdeskGroup = $(this).data('helpdesk-group');

				nextSlide({helpdeskGroup: helpdeskGroup});
			});
			// CHOICE OF HELPDESK END

			// CHOICE OF MARKETPLACE
			var $marketplaceButton = $('section.type-10 .onboard-slide-item-type-2 .block-icon');

			$marketplaceButton.on('click', function(){
				var marketplaceGroup = $(this).data('marketplace-group');

				nextSlide({helpdeskGroup: marketplaceGroup});
			});
			// CHOICE OF MARKETPLACE END

			// CHOICE OF NEW MARKETPLACE
			var $newMarketplaceButton = $('section.type-10 .add-new-marketplace-button');

			$newMarketplaceButton.on('click', function(){
				var newMarketplaceGroup = $(this).data('marketplace-group');

				nextSlide({helpdeskGroup: newMarketplaceGroup});
			});
			// CHOICE OF NEW MARKETPLACE END

			// CHOICE OF AMAZON REGION
			var $amazonRegionButton = $('section.type-10 .amazon-region-button');

			$amazonRegionButton.on('click', function(){
				var amazonRegion = $(this).data('amazon-region');

				$amazonRegionSlideItem.hide();

				$amazonRegionSlideCountryButton.removeClass('active');
				amazonCountrySelected = false;
				disableNextButton();

				if (amazonRegion == 'america') {
					$('section.type-10 .amazon-country-choice-item-america').show();
					$amazonRegionSlideItemActive = $('section.type-10 .amazon-country-choice-item-america');
				}

				if (amazonRegion == 'europe') {
					$('section.type-10 .amazon-country-choice-item-europe').show();
					$amazonRegionSlideItemActive = $('section.type-10 .amazon-country-choice-item-europe');
				}

				if (amazonRegion == 'asia') {
					$('section.type-10 .amazon-country-choice-item-asia').show();
					$amazonRegionSlideItemActive = $('section.type-10 .amazon-country-choice-item-asia');
				}

				nextSlide();

				amazonSlideChoiceOfCountryAnimation();
			});

			var $amazonRegionSlideCountryButton = $('section.type-10 .onboard-slide-item-for-amazon-region .block-icon-item');

			$amazonRegionSlideCountryButton.on('click', function(){
				$amazonRegionSlideCountryButton.removeClass('active');
				$(this).addClass('active');

				amazonCountrySelected = true;

				enableNextButton();
			});

			$amazonRegionSlideItemActive.show();
			// CHOICE OF AMAZON REGION END

			// CHOICE OF HELPSCOUT EMAIL
			var $helpscoutEmailSelect = $('section.type-10 .custom-select-helpscout-email select'),
				$helpscoutEmailSelectCustomOption = $('section.type-10 .onboard-slide-item-type-7 .block-list-inner .custom-select-outer .customSelect dd');

			$helpscoutEmailSelect.on('change', function(){
				enableNextButton();
			});

			$helpscoutEmailSelectCustomOption.on('click', function(){
				enableNextButton();
			});
			// CHOICE OF HELPSCOUT EMAIL END

			// ANIMATION
			function slideAnimation() {
				TweenMax.staggerFromTo($activeGroup.find($item).eq(currentIndex).find('.for-anim'), 0.5, {opacity:0, y:20}, {opacity:1, y:0, ease:Power2.easeOut}, 0.1);
			}

			function amazonSlideChoiceOfCountryAnimation() {
				if ($activeGroup.find($item).hasClass('onboard-slide-item-for-amazon-region')) {
					TweenMax.staggerFromTo($amazonRegionSlideItemActive.find('.for-anim-2'), 0.5, {opacity:0, y:20}, {opacity:1, y:0, ease:Power2.easeOut}, 0.1);
				}
			}
			// ANIMATIO END
		}
	},
	onScrollAnimation: function() {
		if ($('.gorgias-page')[0]) {
			var $sectionType_1 = $('section.type-1'),
				$sectionType_2 = $('section.type-2'),
				$sectionType_3 = $('section.type-3'),
				$sectionType_4 = $('section.type-4'),
				timeLines_1_Array = [],
				timeLines_2_Array = [],
				timeLines_3_Array = [],
				timeLines_4_Array = [],
				animationDelay = 0;

			// section type 1
			$sectionType_1.each(function(index){
			    $(this).attr('data-index', index);

			    var $title = $(this).find('.parts-list .el-title-1 .g__text');

			    $title.html(divideSentenceIntoWords($title));

			    var timeLine = new TimelineLite();

			    timeLine.pause();
			    timeLine
			        .staggerFromTo($(this).find('.parts-list .el-title-1 span'), 1.25, {opacity:0, y:-25}, {opacity:1, y:0, ease:Power3.easeOut}, 0.2, 'one')
			        .staggerFrom($(this).find('.parts-list .el-text-1, .parts-list .el-button'), 1.25, {delay:1, opacity:0, y:-25, ease:Power3.easeOut}, 0.2, 'one')

			        .staggerFrom($(this).find('.parts-list .el-img svg *:not(circle), .part .el-img img'), 2, {delay:0.5, opacity:0, scale:1.1, transformOrigin:'center', ease:Back.easeInOut}, 0.015, 'one')
			        .staggerFrom($(this).find('.parts-list .el-img svg circle'), 3, {delay:0.5, opacity:0, scale:0.1, transformOrigin:'center', ease:Power3.easeInOut}, 0.02, 'one')

			        .staggerFrom($(this).find('.blocks-list, .blocks-list .block'), 1.25, {delay:2.5, opacity:0, y:-25, ease:Power3.easeOut}, 0.2, 'one')

			        .staggerFromTo($(this).find('.parts-list .el-button .button-attention-effect-1'), 3, {opacity:1, scale:0}, {delay:3.5, opacity:0, scale:1.4, ease:Power3.easeOut}, 0.3, 'one')

			        .from($(this).find('.animation-bg-1'), 4, {y:500, ease:Power3.easeOut}, 'one')
			    
			    timeLine.pause();
			    timeLine.timeScale(1.3);
			    timeLines_1_Array.push(timeLine);
			});

			onScrollAnimationPlay($sectionType_1, timeLines_1_Array);
			// section type 1 end

			// section type 2
			$sectionType_2.each(function(index){
			    $(this).attr('data-index', index);

			    var $title = $(this).find('.el-title-1 .g__text');

			    $title.html(divideSentenceIntoWords($title));

			    var timeLine = new TimelineLite();

			    timeLine.pause();
			    timeLine
			        .staggerFromTo($(this).find('.el-title-1 span'), 1.25, {opacity:0, y:-25}, {opacity:1, y:0, ease:Power3.easeOut}, 0.1, 'one')
			        .staggerFrom($(this).find('.parts-list .part, .imege-outer, .el-title-2, .el-1'), 1.25, {delay:1, opacity:0, y:25, ease:Power3.easeOut}, 0.2, 'one')
			    
			    timeLine.pause();
			    timeLine.timeScale(1.3);
			    timeLines_2_Array.push(timeLine);
			});

			onScrollAnimationPlay($sectionType_2, timeLines_2_Array);
			// section type 2 end

			// section type 3
			$sectionType_3.each(function(index){
			    $(this).attr('data-index', index);

			    var $title = $(this).find('.parts-list .el-title-1 .g__text');

			    $title.html(divideSentenceIntoWords($title));

			    var timeLine = new TimelineLite();

			    timeLine.pause();
			    timeLine
			        .staggerFromTo($(this).find('.content, .parts-list .el-title-1 span'), 1.25, {opacity:0, y:-25}, {opacity:1, y:0, ease:Power3.easeOut}, 0.2, 'one')
			        .staggerFrom($(this).find('.parts-list .el-text-1, .parts-list .el-list-1 li, .parts-list .el-text-and-arrow-1, .items-list .item, .el-button-list-1 .el-button'), 1.25, {delay:1, opacity:0, y:25, ease:Power3.easeOut}, 0.2, 'one')
			        
			        .staggerFrom($(this).find('.parts-list .el-img svg *'), 2, {delay:1, opacity:0, scale:1.1, transformOrigin:'center', ease:Back.easeInOut}, 0.005, 'one')
			    
			    timeLine.pause();
			    timeLine.timeScale(1.3);
			    timeLines_3_Array.push(timeLine);
			});

			onScrollAnimationPlay($sectionType_3, timeLines_3_Array);
			// section type 3 end

			// section type 4
			$sectionType_4.each(function(index){
			    $(this).attr('data-index', index);

			    var $title = $(this).find('.parts-list .el-title-1 .g__text');

			    $title.html(divideSentenceIntoWords($title));

			    var timeLine = new TimelineLite();

			    timeLine.pause();
			    timeLine
			        .staggerFromTo($(this).find('.content, .parts-list .el-title-1 span'), 1.25, {opacity:0, y:-25}, {opacity:1, y:0, ease:Power3.easeOut}, 0.2, 'one')
			        .staggerFrom($(this).find('.el-text-1, .blocks-list .block'), 1.25, {delay:1, opacity:0, y:25, ease:Power3.easeOut}, 0.2, 'one')
			    
			    timeLine.pause();
			    timeLine.timeScale(1.3);
			    timeLines_4_Array.push(timeLine);
			});

			onScrollAnimationPlay($sectionType_4, timeLines_4_Array);
			// section type 4 end

			function onScrollAnimationPlay($item, timeLinesArray) {
				for (var i = 0; i < $item.length; i++) {
				    new Waypoint({
				        element: $item[i],
				        handler: function(direction) {
				            var index = $(this.element).data('index');

				            if(direction == 'down') {
				                setTimeout(function(){
				                    timeLinesArray[index].play();
				                }, animationDelay*1000);
				            } else {
				                
				            }

				            animationDelay += 0;

				            setTimeout(function(){
				                animationDelay = 0;
				            }, 10);
				        },
				        offset: '80%'
				    })
				}
			}
		}
	}
}

function divideSentenceIntoWords($objWithText){
  $objWithText.addClass('divided-text-outer');

  let	text = $objWithText.text(),
      textSplitted = text.split(' '),
      words = '';

  for (let i = 0; textSplitted.length > i; i++) {
    words += '<span style="display: inline-block; position: relative; overflow: hidden;">' + '<span style="display: inline-block">' + textSplitted[i] + '</span>' + '</span> ';
  };

  return words;
}

channelReply.init();