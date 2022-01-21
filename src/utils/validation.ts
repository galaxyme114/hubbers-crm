// Util file for validating
import * as zxcvbn from 'zxcvbn'

/**
 * Validate email
 *
 */
export enum EmailValidation {
	EMPTY = -1,
	VALID = 1,
	INVALID = 0
}

export const emailValidation = (email: string): EmailValidation => {
	if (email.length === 0) {
		return EmailValidation.EMPTY
	}

	const validationRegex = new RegExp('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:' +
		'[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:' +
		'[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.)' +
		'{3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]' +
		'|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])')

	return validationRegex.test(String(email).toLowerCase()) ? EmailValidation.VALID : EmailValidation.INVALID
}

/**
 * Validate password using the zxcvbn library
 *
 */
export enum PasswordValidation {
	EMPTY = -1,
	NO_MATCH = 0,
	SHORT = 1,
	WEAK = 2,
	MEDIUM = 3,
	STRONG = 4
}

export const passwordValidation = (password: string, repeatPassword: string): PasswordValidation => {
	if (password.length === 0) {
		return PasswordValidation.EMPTY
	}
	if (password.length < 6) {
		return PasswordValidation.SHORT
	}
	if (repeatPassword.length > 0 && password !== repeatPassword) {
		return PasswordValidation.NO_MATCH
	}

	return Math.max(zxcvbn(password).score, 2)
}