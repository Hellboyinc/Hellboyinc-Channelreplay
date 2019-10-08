var	tabletVer = false,
	mobileVer = false;

var channelReply = {
	init: function(){
		self = this;
		
		$(document).ready(function(){
			self.preLoader();
			self.checkWindowSize();

			self.sectionType_5();

			self.pricesPage();
			self.account();

			self.userInformation();
			self.myCRM();
			self.marketplacesConnectedAccounts();

			self.selectBox();
			self.switchButton();
			self.tooltip();
			self.textEditor();

			self.animation();
		});
	},
	preLoader: function() {
		$('body').addClass('preloader-hided');
	},
	checkWindowSize: function() {
		if (window.innerWidth < 1025) {
			tabletVer = true;
		} else {
			tabletVer = false;
		}

		if (window.innerWidth < 768) {
			mobileVer = true;
		} else {
			mobileVer = false;
		}

		$(window).resize(function(){
			if (window.innerWidth < 1025) {
				tabletVer = true;
			} else {
				tabletVer = false;
			}

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
	account: function(){
		if ($('section.account')[0]) {
			// personal dropdown menu
			var $dropdownMenuTitle = $('.dropdown-menu-block-title'),
				$dropdownMenuContent = $('.header-dropdown-menu'),
				$dropdownAllElements = $('.dropdown-menu-block-title, .account-header-burger-menu, .header-dropdown-menu')
				dropdownMenuToggle = false;

			var menuTL = new TimelineLite();

			menuTL.stop();

			if (mobileVer == false) {
				menuTL
					.fromTo($dropdownMenuContent, 0.5, {display:'none', opacity:0, y:50}, {display:'block', opacity:1, y:0, ease:Power2.easeOut});
			} else {
				menuTL
					.fromTo($dropdownMenuContent, 0.5, {display:'none', opacity:0, x:'100%'}, {display:'block', opacity:1, x:'0%', ease:Power2.easeOut});
			}
			

			$dropdownMenuTitle.on('click', function(){
				changeDropdownMenuState();
			});

			// close dropdown menu on body click
			$dropdownAllElements.hover(function(){
				$(this).addClass('hovered');
			}, function(){
				$(this).removeClass('hovered');
			});

			$('body').on('click', function(){
				if (dropdownMenuToggle == true) {
					if (!$dropdownAllElements.hasClass('hovered')) {
						changeDropdownMenuState();
					}
				}
			});
			// close dropdown menu on body click end

			// mobile ver
			var $dropdownMenuBurger = $('.account-header-burger-menu'),
				dropdownMenuBurgerTL = new TimelineLite();

			dropdownMenuBurgerTL.pause();
			dropdownMenuBurgerTL
			    .to($dropdownMenuBurger.find('.account-header-burger-menu-line:nth-child(1)'), 0.6, {y:6, ease:Power3.easeIn},'together')
			    .to($dropdownMenuBurger.find('.account-header-burger-menu-line:nth-child(2)'), 0.4, {delay:0.1, opacity:0, x:'-100%', ease:Power2.easeInOut}, 'together')
			    .to($dropdownMenuBurger.find('.account-header-burger-menu-line:nth-child(3)'), 0.6, {y:-6, ease:Power3.easeIn},'together')
			    .set($dropdownMenuBurger.find('.account-header-burger-menu-line:nth-child(1)'), {width:'100%'})
			    .set($dropdownMenuBurger.find('.account-header-burger-menu-line:nth-child(2)'), {opacity:0})
			    .set($dropdownMenuBurger.find('.account-header-burger-menu-line:nth-child(3)'), {width:'100%'})
			    .to($dropdownMenuBurger.find('.account-header-burger-menu-line:nth-child(1)'), 0.4, {rotationZ:45, ease:Power1.linear},'cross')
			    .to($dropdownMenuBurger.find('.account-header-burger-menu-line:nth-child(3)'), 0.4, {rotationZ:-45, ease:Power1.linear},'cross');

			dropdownMenuBurgerTL.timeScale(1.6);

			$dropdownMenuBurger.click(function(){
			    changeDropdownMenuState();
			});
			// mobile ver end

			function changeDropdownMenuState() {
				if (dropdownMenuToggle == false) {
					dropdownMenuToggle = true;

					$dropdownMenuTitle.addClass('active');

					dropdownMenuBurgerTL.play();
					menuTL.play();

					// hide "upgrade" button for mobile
					if (mobileVer == true) {
						TweenLite.to($upgradeButton, 0.1, {opacity:0, pointerEvents:'none'});
					}
				} else {
					dropdownMenuToggle = false;

					$dropdownMenuTitle.removeClass('active');

					dropdownMenuBurgerTL.reverse();
					menuTL.reverse();

					// show "upgrade" button for mobile
					TweenLite.to($upgradeButton, 0.1, {opacity:1, pointerEvents:'all'});
				}
			}
			// personal dropdown menu end

			// hide "upgrade" button on scroll for tablet
			var $upgradeButton = $('.side-menu-header-upgrade_bottom');

			new Waypoint({
			    element: $('body'),
			    handler: function(direction) {
			    	if (tabletVer == true) {
			    		if (direction == 'down') {
			    		    TweenLite.to($upgradeButton, 0.1, {opacity:0, pointerEvents:'none'});
			    		} else {
			    		    TweenLite.to($upgradeButton, 0.1, {opacity:1, pointerEvents:'all'});
			    		}
			    	}
			    },
			    offset: -1
			})
			// hide "upgrade" button on scroll for tablet end

			// side menu
			// fix for IOS
			var $sideMenuInner = $('.side-menu-inner');

			$sideMenuInner.on('click', function(){

			});
			// fix for IOS END

			// upgrade button hover fix
			var $upgradeButton = $('.side-menu-header-upgrade_bottom');

			$upgradeButton.hover(function(){
				$(this).addClass('hovered');
			}, function(){
				$(this).removeClass('hovered');
			});
			// upgrade button hover fix end
			// side menu end
		}
		
	},
	userInformation: function(){
		if ($('.personal-details-block-list')[0]) {
			var $input = $('.personal-details-name-form input, .personal-details-email-form input, .personal-details-company-name-form input'),
				$text = $('.personal-details-name, .personal-details-email, .personal-details-company-name'),
				$editButton = $('.personal-details-plan_bottom'),
				$saveButton = $('.personal-details-plan_bottom-2'),
				$cancelButtonOuter = $('.personal-details-plan_text-outer'),
				$cancelButton = $('.personal-details-plan_text'),
				formActivated = false;

			$input.hide();
			$text.show();

			$editButton.on('click', function(){
				toggleForm();
			});

			$saveButton.on('click', function(){
				toggleForm();
			});

			$cancelButton.on('click', function(){
				toggleForm();
			});

			function toggleForm() {
				var animationTime_1 = 0;

				if (tabletVer == true && mobileVer != true) {
					animationTime_1 = 0;
				}

				if (formActivated == false) {
					$editButton.slideUp(animationTime_1);
					$saveButton.slideDown(animationTime_1);
					$cancelButtonOuter.slideDown(animationTime_1);
					$input.slideDown(300);
					$text.slideUp(300);

					formActivated = true;
				} else {
					$editButton.slideDown(animationTime_1);
					$saveButton.slideUp(animationTime_1);
					$cancelButtonOuter.slideUp(animationTime_1);
					$input.slideUp(300);
					$text.slideDown(300);

					formActivated = false;
				}
			}
		}
	},
	myCRM: function(){
		if ($('.my-crm-block-list')[0]) {
			var $input = $('.my-crm-item-form'),
				$text = $('.my-crm-item-text'),
				$editButton = $('.my-crm-button'),
				$saveButton = $('.my-crm-button-2'),
				$cancelButtonOuter = $('.my-crm-button-conection-cancel-outer'),
				$cancelButton = $('.my-crm-button-conection-cancel'),
				$testConnectionButtonOuter = $('.my-crm-button-conection-outer'),
				formActivated = false;

			$input.hide();
			$saveButton.hide();
			$cancelButtonOuter.hide();
			$text.show();

			$editButton.on('click', function(){
				toggleForm();
			});

			$saveButton.on('click', function(){
				toggleForm();
			});

			$cancelButton.on('click', function(){
				toggleForm();
			});

			function toggleForm() {
				var animationTime_1 = 0,
					animationTime_2 = 300;

				if (tabletVer == true && mobileVer != true) {
					animationTime_1 = 0;
					animationTime_2 = 0;
				}

				if (formActivated == false) {
					$editButton.slideUp(animationTime_1);
					$saveButton.slideDown(animationTime_1);
					$cancelButtonOuter.slideDown(animationTime_1);
					$input.slideDown(animationTime_2);
					$testConnectionButtonOuter.slideUp(animationTime_1);
					$text.slideUp(animationTime_2);

					formActivated = true;
				} else {
					$editButton.slideDown(animationTime_1);
					$testConnectionButtonOuter.slideDown(animationTime_1);
					$saveButton.slideUp(animationTime_1);
					$cancelButtonOuter.slideUp(animationTime_1);
					$input.slideUp(animationTime_2);
					$text.slideDown(animationTime_2);

					formActivated = false;
				}
			}
		}

		if ($('.my-crm-advanced-options-block-list')[0]) {
			// toggle advanced options list
			var $optionsBlockListHidden = $('.my-crm-advanced-options-block-list-hiden'),
				$advancedOptionsDropdownMenuTitle = $('.advanced-options-dropdown-menu-title'),
				optionsBlockListActivated = false;

			$optionsBlockListHidden.hide();

			$advancedOptionsDropdownMenuTitle.on('click', function(){
				var $this = $(this);

				if (optionsBlockListActivated == false) {
					$this.addClass('active');

					$optionsBlockListHidden.show();

					optionsBlockListActivated = true;		
				} else {
					$this.removeClass('active');

					$optionsBlockListHidden.hide();

					optionsBlockListActivated = false;
				}
			});
			// toggle advanced options list end

			// toggle advanced options edit mode
			var $ao_EditButton = $('.advanced-options-dropdown-menu-button'),
				$ao_SaveButton = $('.advanced-options-dropdown-menu-button-2'),
				$ao_cancelButtonOuter = $('.advanced-options-cancel-outer'),
				$ao_cancelButton = $('.advanced-options-cancel'),
				ao_FormActivated = false;

			$ao_SaveButton.hide();
			$ao_cancelButtonOuter.hide();
			$ao_EditButton.show();

			$ao_EditButton.on('click', function(e){
				e.preventDefault();

				ao_toggleForm();
			});

			$ao_SaveButton.on('click', function(e){
				e.preventDefault();

				ao_toggleForm();
			});

			$ao_cancelButton.on('click', function(e){
				e.preventDefault();

				ao_toggleForm();
			});

			function ao_toggleForm() {
				if (ao_FormActivated == false) {
					$ao_EditButton.hide();

					$ao_SaveButton.show();
					$ao_cancelButtonOuter.show();

					ao_FormActivated = true;
				} else {
					$ao_EditButton.show();

					$ao_SaveButton.hide();
					$ao_cancelButtonOuter.hide();

					ao_FormActivated = false;
				}
			}
			// toggle advanced options edit mode end
		}
	},
	marketplacesConnectedAccounts: function(){
		if ($('.conected-account-block-list-inner')[0]) {
			var $blockListInner = $('.conected-account-block-list-inner'),
				$blockListItem = $blockListInner.find('.conected-account-block-item'),
				$makeDefaultButton = $blockListInner.find('.conected-account-text-icon:not(.default)'),
				$isDefaultButton = $blockListInner.find('.conected-account-text-icon.default');

			$makeDefaultButton.addClass('active');
			$blockListItem.eq(0).find($makeDefaultButton).removeClass('active');
			$blockListItem.eq(0).find($isDefaultButton).addClass('active');

			$makeDefaultButton.on('click', function(){
				var $this = $(this);

				$blockListItem.find($makeDefaultButton).addClass('active');
				$blockListItem.find($isDefaultButton).removeClass('active');

				$this.parents('.conected-account-block-item').find($makeDefaultButton).removeClass('active');
				$this.parents('.conected-account-block-item').find($isDefaultButton).addClass('active');
			});
		}
	},
	selectBox: function(){
		if ($('.custom-select-outer')[0]) {
			var $customSelectOuter = $('.custom-select-outer'),
				$customSelect = $customSelectOuter.find('select.custom');

			$customSelect.each(function() {
				var sb = new SelectBox({
					selectbox: $(this),
					customScrollbar: true,
					height: 200
				});
			});
		}
	},
	switchButton: function(){
		if ($('.swich-button-outer')[0]) {
			$('.swich-button-outer').on('click', function() {
				if ($(this).hasClass('active')) {
					$(this).removeClass('active');

			    	$(this).find('.swich-button-circle').removeClass('active');
				} else {
			    	$(this).addClass('active');

			       $(this).find('.swich-button-circle').addClass('active');
				}
			});
		}
	},
	tooltip: function(){
		if ($('.help-icon')[0]) {
			var $helpIcon = $('.help-icon'),
				$helpIconText = $('.help-icon-text'),
				$helpIconAllElements = $('.help-icon, .el-hidden-text-inner'),
				helpIconTextCenteredClass = 'help-center';

			$helpIcon.on('click', function(){
				var $this = $(this);

				hideActiveHelpIconText($this);

				toggleHelpIcon($this);
			});

			$helpIconAllElements.hover(function(){
				$('body').addClass('help-icon-all-elements-hovered');
			}, function(){
				$('body').removeClass('help-icon-all-elements-hovered');
			});

			$('body').on('click', function(){
				var $this = $(this);

				if (!$this.hasClass('help-icon-all-elements-hovered')) {
					$helpIcon.each(function(){
						var $currentHelpIcon = $(this);

						if ($currentHelpIcon.hasClass('active')) {
							toggleHelpIcon($currentHelpIcon);
						}
					});
				}
			});

			function toggleHelpIcon(_$helpIcon) {
				var $this = _$helpIcon,
					$currentHelpIconText = $this.next($helpIconText);

				checkHelpIconTextPosition($currentHelpIconText);

				if (!$this.hasClass('active')) {
					if ($currentHelpIconText.hasClass('help-center')) {
						TweenLite.fromTo($currentHelpIconText, 0.3, {pointerEvents:'none', opacity:0, y:-10}, {pointerEvents:'all', opacity:1, y:0, ease:Power2.easeOut});
					} else {
						TweenLite.fromTo($currentHelpIconText, 0.3, {pointerEvents:'none', opacity:0, x:10}, {pointerEvents:'all', opacity:1, x:0, ease:Power2.easeOut});
					}

					$this.addClass('active');
				} else {
					if ($currentHelpIconText.hasClass('help-center')) {
						TweenLite.fromTo($currentHelpIconText, 0.3, {pointerEvents:'all', opacity:1, y:0}, {pointerEvents:'none', opacity:0, y:-10, ease:Power2.easeOut});
					} else {
						TweenLite.fromTo($currentHelpIconText, 0.3, {pointerEvents:'all', opacity:1, x:0}, {pointerEvents:'none', opacity:0, x:10, ease:Power2.easeOut});
					}

					$this.removeClass('active');
				}
			}

			function checkHelpIconTextPosition(_$helpIconText) {
				var offsetLeft = _$helpIconText.offset().left,
					windowWidth = $(window).width(),
					helpIconTextWidth = _$helpIconText.outerWidth(true);

				if ((offsetLeft + helpIconTextWidth) > windowWidth) {
					_$helpIconText.addClass('help-center');
				} else {
					_$helpIconText.removeClass('help-center');
				}

				if (mobileVer == true) {
					_$helpIconText.addClass('help-center');
				}
			}

			function hideActiveHelpIconText(_$clickedHelpIcon) {
				var $clickedHelpIcon = _$clickedHelpIcon,
					clickedHelpIconHasClassActive = false;

				if ($clickedHelpIcon.hasClass('active')) {
					clickedHelpIconHasClassActive = true;
				}

				$helpIcon.each(function(){
					var $currentHelpIcon = $(this);

					if ($currentHelpIcon.hasClass('active')) {
						var $currentHelpIconText = $currentHelpIcon.next($helpIconText);

						$currentHelpIcon.removeClass('active');

						if ($currentHelpIconText.hasClass('help-center')) {
							TweenLite.fromTo($currentHelpIconText, 0.3, {pointerEvents:'all', opacity:1, y:0}, {pointerEvents:'none', opacity:0, y:-10, ease:Power2.easeOut});
						} else {
							TweenLite.fromTo($currentHelpIconText, 0.3, {pointerEvents:'all', opacity:1, x:0}, {pointerEvents:'none', opacity:0, x:10, ease:Power2.easeOut});
						}
					}
				});

				if (clickedHelpIconHasClassActive == true) {
					$clickedHelpIcon.addClass('active');
				}
			}
		}
	},
	textEditor: function(){
		if ($('.g__text_editor')[0]) {
			var quill = new Quill('.g__text_editor-content', {
			    theme: 'snow'
			});
		}
	},
	animation: function(){
		// circle
		animateCircle($('.subscription-plan-circle'));
		animateCircle($('.setup-progress-circle'));

		function animateCircle(_$circle) {
			if (_$circle[0]) {
				var $circle = _$circle,
					circleMaxDashOffset = parseInt($circle.find('circle').eq(1).css('stroke-dashoffset')),
					circlePercent = $circle.data('percent'),
					circleDasharray = (circlePercent * circleMaxDashOffset / 100) + circleMaxDashOffset;

				TweenLite.set($circle.find('circle').eq(1), {opacity:0, strokeDasharray:circleMaxDashOffset});
				TweenLite.to($circle.find('circle').eq(1), 1.5, {opacity:1, strokeDasharray:circleDasharray, ease:Power2.easeInOut});
			}
		}
		// circle end
	}
}

channelReply.init();