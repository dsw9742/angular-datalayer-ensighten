package com.douglaswhitehead.controller.api.cart;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cart")
public class ShoppingCartControllerImpl {

	@RequestMapping(method=RequestMethod.POST, value="/addToCart")
	public Object addToCart(@RequestBody final Object item) {
		// do stuff to add item to cart here, 
		// e.g. persist item to cart in db, recalculate cart total price in db, etc.
		return item;
	}
	
}
