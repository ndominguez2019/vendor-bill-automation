/**
 * RESTlet: PO Lookup by Transaction ID
 * Description: Accepts a tranId (PO Number), searches NetSuite for the matching Purchase Order,
 *              and returns the internal ID.
 * Returns:
 *    { success: true, tranId, internalId } if found
 *    { success: false, message } if not found
 */




/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/search'], function(search) {
  function doGet(params) {
    const poNumber = params.tranId;

    if (!poNumber) {
      return { success: false, message: 'Missing tranId param' };
    }

    const poSearch = search.create({
      type: search.Type.PURCHASE_ORDER,
      filters: [['tranid', 'is', poNumber]],
      columns: ['internalid']
    });

    const results = poSearch.run().getRange({ start: 0, end: 1 });

    if (results.length === 0) {
      return { success: false, message: `No PO found with tranId ${poNumber}` };
    }

    return {
      success: true,
      tranId: poNumber,
      internalId: results[0].getValue('internalid')
    };
  }

  return {
    get: doGet
  };
});
