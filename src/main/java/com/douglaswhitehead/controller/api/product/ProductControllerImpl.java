package com.douglaswhitehead.controller.api.product;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product")
public class ProductControllerImpl {

	// this is a demo object, it really would be backed by a Product Service and DB of some sort
	@RequestMapping(method=RequestMethod.GET, value="/{id}")
	public Map<String, String> get(@PathVariable("id") final int id) {
		Map<String, String> product = new HashMap<String, String>();
		product.put("id", String.valueOf(id));
		product.put("name", "Product "+String.valueOf(id));
		return product;
	}
	
}
