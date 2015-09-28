package com.douglaswhitehead.controller.api.digitaldata;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Digital Data Controller Implementation
 * @author douglas.whitehead
 * 
 * DEMO digital data assembly and response
 * 
 * Roughly follows the W3C spec from Customer Experience Digital Data Community Group
 *   Community Group https://www.w3.org/community/custexpdata/
 *   Spec http://www.w3.org/2013/12/ceddl-201312.pdf  
 */
@RestController
@RequestMapping("/digitaldata")
public class DigitalDataControllerImpl {
	
	@RequestMapping(method=RequestMethod.GET, value="/home")
	public Map<String, Object> homePageData() {
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("pageInstanceID", "homePage-Production"); // 6.2 Page Identifier Object
		data.put("page", "page object"); // would really be a fully built 6.3 Page Object
		data.put("product", new Object[0]); // 6.4 Product Object. Probably empty on the home page, 
		                                    // unless certain products are being highlighted for some reason
		
		Map<String, Object> cart = new HashMap<String, Object>(); // 6.5 Cart Object. Shopping cart is persistent, so it should always be
		                                                          // available in the data layer => this object will need to be populated
		                                                          // for every call to the DigitalDataController => should probably by
		                                                          // backed by a Shopping Cart Service.
		cart.put("cartID", "cart ID"); // An identifier for a particular shopping cart.
		cart.put("price", "cart price"); // would really be a fully built Price object. This object provides details of the cart price. 
		                                 // The basePrice SHOULD be the price of the items before applicable discounts, shipping charges, 
		                                 // and tax. The cartTotal SHOULD be the total price inclusive of all discounts, charges, and tax.
		cart.put("attributes", "cart attributes"); // would really be a fully built Attributes object. This object provides extensibility 
		                                           // to the cart as a whole. 
		cart.put("item", new Object[0]); // would really be a list of all items in the customer's cart. 
		data.put("cart", cart);
		
		data.put("transaction", ""); // 6.6 Transaction Object. Per spec, should only be built for completed orders.
		data.put("event", new Object[0]); // 6.7 Event Object. Empties/resets on "page" load. If it needs to be used, then it can be populated
		                                  // by client-side application.
		data.put("component", new Object[0]); // 6.8 Component Object
		data.put("user", new Object[0]); // would really be a fully built 6.9 User Object. There is always a user present, so user[0] 
		                                 // should be the user interacting with the application, and it should always be available in the
		                                 // data layer => this object will need to be populated for every call to the DigitalDataController
		                                 // => should probably be backed by a User- or Current User Service.
		data.put("privacy", "privacy object"); // 6.10 Privacy Object
		data.put("version", "1.0"); // 6.12 Version Object
		return data;
	}
	
	// like the above, this is a very abbreviated demo digitalData object. In a production environment, all of these sub-objects would be built out
	@RequestMapping(method=RequestMethod.GET, value="/product/{id}")
	public Map<String, Object> productPageData(@PathVariable("id") final int id) {
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("pageInstanceID", "product"+String.valueOf(id)+"Page-Production");
		data.put("page", "page object");
		data.put("product", new Object[0]); // would really be a fully built 6.4 Product Object, backed by Product Service and DB

		Map<String, Object> cart = new HashMap<String, Object>();
		cart.put("cartID", "cart ID");
		cart.put("price", "cart price");
		cart.put("attributes", "cart attributes");
		cart.put("item", new Object[0]);
		data.put("cart", cart);
		
		data.put("transaction", "transaction object");
		data.put("event", new Object[0]);
		data.put("component", new Object[0]);
		data.put("user", new Object[0]);
		data.put("privacy", "privacy object");
		data.put("version", "1.0");
		return data;
	}

}