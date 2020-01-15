import axios from 'axios';

/**
 * Create openexchange api object
 */
export default axios.create({
    baseURL: 'https://openexchangerates.org/api',
});
