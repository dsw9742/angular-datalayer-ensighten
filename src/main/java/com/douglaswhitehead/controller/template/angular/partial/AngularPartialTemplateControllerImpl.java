package com.douglaswhitehead.controller.template.angular.partial;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/partials")
public class AngularPartialTemplateControllerImpl {
	
	@RequestMapping("/home")
	public String home() {
		return "partials/home";
	}
	
	@RequestMapping("/product1")
	public String product1() {
		return "partials/product1";
	}
	
	@RequestMapping("/product2")
	public String product2() {
		return "partials/product2";
	}

}