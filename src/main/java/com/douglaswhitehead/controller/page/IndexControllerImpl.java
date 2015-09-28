package com.douglaswhitehead.controller.page;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexControllerImpl {
	
	@RequestMapping(value="/")
	public String index() {
		return "index";
	}

}