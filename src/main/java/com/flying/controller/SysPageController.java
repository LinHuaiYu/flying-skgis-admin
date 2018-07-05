package com.flying.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 系统页面视图
 */
@Controller
public class SysPageController {
	
	//一级页面记录
	@RequestMapping("{url}.html")
	public String fistPage(@PathVariable("url") String url){
		return url + ".html";
	}
	
	//根路径
	@RequestMapping("/")
	public String root(){
		return "index.html";
	}
	
	//模块路径
	@RequestMapping("{dic}/{url}.html")
	public String secondPage(@PathVariable("dic") String dic,@PathVariable("url") String url){
		return dic+"/"+ url + ".html";
	}
	
	@RequestMapping("{mod}/{dic}/{url}.html")
	public String thirdPage(@PathVariable("mod") String mod,@PathVariable("dic") String dic,@PathVariable("url") String url){
		return mod+"/"+dic+"/"+ url + ".html";
	}
	
}
