import {
  POST_INSTRUMENT_FAILURE,
  POST_INSTRUMENT_REQUEST,
  POST_INSTRUMENT_SUCCESS,
} from '../actionTypes';

/**
 * @typedef {object} Country
 * @property {object} [id] - Country id.
 * @property {object} [name] - Country name.
 * @property {object} [nativeName] - Country native name.
 * @property {object} [alpha2Code] - Country alpha 2 code.
 * @property {object} [alpha3Code] - Country alpha 3 code.
 * @property {object} [culture] - Country culture.
 * @property {object} [region] - Country region.
 * @property {object} [subRegion] - Country sub region.
 * @property {object} [regionId] - Country region id.
 * @property {object} [subfolder] - Country subfolder.
 * @property {object} [continentId] - Country continent id.
 */

/**
 * @typedef {object} Amount
 * @property {number} [value] - Amount value.
 * @property {number} [classification] - Amount classification.
 */

/**
 * @typedef {object} PostInstrumentsData
 * @property {string} [method] - Method.
 * @property {string} [option] - Option.
 * @property {string} [token] - Token.
 * @property {boolean} [createToken] - Create token.
 * @property {object} [payer] - Payer data.
 * @property {string} [payer.id] - Payer id.
 * @property {string} [payer.firstName] - Payer first name.
 * @property {string} [payer.lastName] - Payer last name.
 * @property {string} [payer.email] - Payer email.
 * @property {object} [payer.address] - Payer address data.
 * @property {string} [payer.address.addressLine1] - Payer address line 1.
 * @property {string} [payer.address.addressLine2] - Payer address line 2.
 * @property {string} [payer.address.addressLine3] - Payer address line 3.
 * @property {string} [payer.address.vatNumber] - Payer address vat number.
 * @property {string} [payer.address.zipCode] - Payer address zip code.
 * @property {string} [payer.address.phone] - Payer address phone.
 * @property {string} [payer.address.neighbourhood] -Payer address neighbourhood.
 * @property {string} [payer.address.ddd] - Payer address ddd.
 * @property {object} [payer.address.city] - Payer address city.
 * @property {number} [payer.address.city.id] - Payer address city id.
 * @property {string} [payer.address.city.name] - Payer address city name.
 * @property {string} [payer.address.city.stateId] - Payer address city state id.
 * @property {string} [payer.address.city.countryId] - Payer address city
 * country id.
 * @property {object} [payer.address.state] - Payer address state data.
 * @property {number} [payer.address.state.id] - Payer address state id.
 * @property {string} [payer.address.state.code] - Payer address state code.
 * @property {string} [payer.address.state.name] - Payer address state name.
 * @property {string} [payer.address.state.countryId] - Payer address state
 * country id.
 * @property {Country} [payer.address.country] - Payer address country data.
 * @property {object} [payer.continent] - Payer continent data.
 * @property {number} [payer.continent.id] - Payer continent id.
 * @property {string} [payer.continent.name] - Payer continent name.
 * @property {Array<Country>} [payer.continent.countries] - Payer continent
 * countries data.
 * @property {Array<Amount>} [amounts] - Amounts data.
 * @property {object} [data] - Data.
 * @property {string} [data.cardHolderName] - Card holder name.
 * @property {string} [data.cardNumber] - Card number name.
 * @property {number} [data.cardExpiryMonth] - Card expiry month.
 * @property {number} [data.cardExpiryYear] - Card expiry year.
 * @property {string} [data.cardCvv] - Card cvv.
 * @property {string} [data.giftCardNumber] - Gift card number.
 * @property {string} [data.giftCardCsc] - Gift card csc.
 * @property {string} [data.creditUserId] - Credit user id.
 * @property {string} [data.issuer] - Issuer for iDEAL method.
 */

/**
 * @callback PostInstrumentsThunkFactory
 * @param {string} id - Id of the payment Intent.
 * @param {PostInstrumentsData} data - Instrument object.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Method responsible for creating an instrument.
 *
 * @function doPostInstruments
 * @memberof module:payments/actions
 *
 * @param {Function} postInstruments - Post instruments client.
 *
 * @returns {PostInstrumentsThunkFactory} Thunk factory.
 */
export default postInstruments => (id, data, config) => async dispatch => {
  dispatch({
    type: POST_INSTRUMENT_REQUEST,
  });

  try {
    const result = await postInstruments(id, data, config);

    dispatch({
      type: POST_INSTRUMENT_SUCCESS,
    });

    return result;
  } catch (error) {
    dispatch({
      payload: { error },
      type: POST_INSTRUMENT_FAILURE,
    });

    throw error;
  }
};
