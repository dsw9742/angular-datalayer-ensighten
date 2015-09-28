package com.douglaswhitehead;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.web.WebAppConfiguration;

import com.douglaswhitehead.AngularDatalayerEnsightenDemoApplication;

import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = AngularDatalayerEnsightenDemoApplication.class)
@WebAppConfiguration
public class AngularDatalayerEnsightenDemoApplicationTests {

	@Test
	public void contextLoads() {
	}

}
