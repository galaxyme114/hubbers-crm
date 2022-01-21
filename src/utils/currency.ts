// Currency Utilities

import { Currency } from '../constants/enums'

export const getCurrencySymbol = (currency: string): string => {
	switch (currency.toLowerCase()) {
		case Currency.USD:
			return '$'
		case Currency.CNY:
			return '¥'
		case Currency.KRW:
			return '₩'
		case Currency.HBS:
			return 'HBS'
		case Currency.HBB:
			return 'HBB'
		default:
			return ''
	}
}

export const getNumberWithCommas = (num: number, decimals?: number): string => {
	return num.toFixed(decimals).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const getNumberWithMaxDecimals = (num: number, decimals?: number): number => {
	const dec = decimals || 2
	return getDecimalPlaces(num) > dec ? Number(num.toFixed(dec)) : (num || 0)
}

export const getDecimalPlaces = (num: number) => {
	const match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/)
	if (!match) {
		return 0
	}

	return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0))
}