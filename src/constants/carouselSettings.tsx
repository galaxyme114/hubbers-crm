// Settings for the carousel
import * as React from 'react'

export const fileCarousel = {
	dots: false,
	infinite: false,
	slidesToShow: 3,
	slidesToScroll: 3,
	responsive: [{
		breakpoint: 1199,
		settings: {slidesToShow: 3}
	}, {
		breakpoint: 991,
		settings: {slidesToShow: 2}
	}, {
		breakpoint: 480,
		settings: {slidesToShow: 1}
	}]
}

export const UserActivityAttachmentCarousel = {
    dots: false,
    arrows: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1
}