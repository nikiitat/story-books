import moment from 'moment'

/**
 *
 * @param {date} date
 * @param {format} format
 * @return {string}
 */
export function formatDate(date, format) {
    return moment(date).format(format)
}
