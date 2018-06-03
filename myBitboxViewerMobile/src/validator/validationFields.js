const required = value => value ? undefined : 'This field is required'
const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined;
const minLength = min => value => value && value.length < min ? `Must be at less ${min}`:undefined;
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const email = value => value && !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ? 'Invalid email address' : undefined;
const match = matchName => (value, allValues, props) => value !== allValues[matchName] ? `This field must match with ${matchName} field` : undefined;
const requiredForCombobox = value => value !== undefined && value !== null ? undefined : 'This field is required'

export {
    required,
    maxLength,
    minLength,
    number,
    email,
    match,
    requiredForCombobox
}