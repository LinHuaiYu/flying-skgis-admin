package com.flying.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.flying.annotation.SysLog;
import com.flying.entity.SysMenuEntity;
import com.flying.service.SysMenuService;
import com.flying.utils.Constant;
import com.flying.utils.Constant.MenuType;
import com.flying.utils.FlyingException;
import com.flying.utils.PageUtils;
import com.flying.utils.Query;
import com.flying.utils.R;

/**
 * 系统菜单
 */
@RestController
@RequestMapping("/sys/menu")
public class SysMenuController extends AbstractController {
	@Autowired
	private SysMenuService sysMenuService;
	
	@GetMapping("/permSecond/{menuId}")
	@RequiresPermissions("sys:menu:perms")
	public R permSecond(@PathVariable("menuId") Long menuId) {
		Map<String,Object> param = new HashMap<String, Object>();
		param.put("parentId",menuId);
		//查询列表数据
		List<SysMenuEntity> menuList = null;
		//只有超级管理员，才能查看所有管理员列表
		if(getUserId() == Constant.SUPER_ADMIN){
			menuList = sysMenuService.querySecondList(param);
		}else{
			//登陆用户
			param.put("userId", getUserId());
			//查询二级，三级菜单
			menuList = sysMenuService.permSecond(param);
		}
		return R.ok().put("menuList", menuList);
	}
	
	/**
	 * 一级菜单渲染
	 * @return
	 */
	@GetMapping("/permsFirst")
	@RequiresPermissions("sys:menu:perms")
	public R permsFirst() {
		Map<String,Object> param = new HashMap<String, Object>();
		//查询列表数据
		List<SysMenuEntity> menuList = null;
		//只有超级管理员，才能查看所有管理员列表
		if(getUserId() == Constant.SUPER_ADMIN){
			param.put("parentId",0);
			menuList = sysMenuService.queryList(param);
		}else{
			//登陆用户
			param.put("userId", getUserId());
			param.put("parentId", 0);
			//查询一级菜单权限
			menuList = sysMenuService.permsFirst(param);
		}
		return R.ok().put("menuList", menuList);
	}
	
	/**
	 * 树形菜单列表
	 */
	@GetMapping(value="/treelist")
	@RequiresPermissions("sys:menu:list")
	public List<SysMenuEntity> treeList(){
		return sysMenuService.treeList();
	}
	/**
	 * 所有菜单列表
	 */
	@PostMapping("/list")
	@RequiresPermissions("sys:menu:list")
	public R list(@RequestParam Map<String, Object> params){
		//查询列表数据
		Query query = new Query(params);
		List<SysMenuEntity> menuList = sysMenuService.queryList(query);
		int total = sysMenuService.queryTotal(query);
		
		PageUtils pageUtil = new PageUtils(menuList, total, query.getLimit(), query.getPage());
		
		return R.ok().put("page", pageUtil);
	}
	
	/**
	 * 选择菜单(添加、修改菜单)
	 */
	@GetMapping("/select")
	@RequiresPermissions("sys:menu:select")
	public R select(){
		//查询列表数据
		List<SysMenuEntity> menuList = sysMenuService.queryNotButtonList();
		
		//添加顶级菜单
		SysMenuEntity root = new SysMenuEntity();
		root.setMenuId(0L);
		root.setName("一级菜单");
		root.setParentId(-1L);
		root.setOpen(true);
		menuList.add(root);
		
		return R.ok().put("menuList", menuList);
	}
	
	/**
	 * 角色授权菜单
	 */
	@GetMapping("/perms")
	@RequiresPermissions("sys:menu:perms")
	public R perms(){
		//查询列表数据
		List<SysMenuEntity> menuList = null;
		//只有超级管理员，才能查看所有管理员列表
		if(getUserId() == Constant.SUPER_ADMIN){
			menuList = sysMenuService.queryList(new HashMap<String, Object>());
		}else{
			menuList = sysMenuService.queryUserList(getUserId());
		}
		return R.ok().put("menuList", menuList);
	}
	
	/**
	 * 菜单信息
	 */
	@RequestMapping("/info/{menuId}")
	@RequiresPermissions("sys:menu:info")
	public R info(@PathVariable("menuId") Long menuId){
		SysMenuEntity menu = sysMenuService.queryObject(menuId);
		return R.ok().put("menu", menu);
	}
	
	/**
	 * 保存
	 */
	@SysLog("保存菜单")
	@PostMapping("/save")
	@RequiresPermissions("sys:menu:save")
	public R save(@RequestBody SysMenuEntity menu){
		//数据校验
		verifyForm(menu);
		
		sysMenuService.save(menu);
		
		return R.ok();
	}
	
	/**
	 * 修改
	 */
	@SysLog("修改菜单")
	@PostMapping("/update")
	@RequiresPermissions("sys:menu:update")
	public R update(@RequestBody SysMenuEntity menu){
		//数据校验
		verifyForm(menu);
				
		sysMenuService.update(menu);
		
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@SysLog("删除菜单")
	@PostMapping("/delete")
	@RequiresPermissions("sys:menu:delete")
	public R delete(@RequestBody Long[] menuIds){
		for(Long menuId : menuIds){
			if(menuId.longValue() <= 30){
				return R.error("系统菜单，不能删除");
			}
		}
		sysMenuService.deleteBatch(menuIds);
		
		return R.ok();
	}
	
	/**
	 * 用户菜单列表
	 */
	@GetMapping("/user")
	public R user(){
		List<SysMenuEntity> menuList = sysMenuService.getUserMenuList(getUserId());
		
		return R.ok().put("menuList", menuList);
	}
	
	/**
	 * 验证参数是否正确
	 */
	private void verifyForm(SysMenuEntity menu){
		if(StringUtils.isBlank(menu.getName())){
			throw new FlyingException("菜单名称不能为空");
		}
		
		if(menu.getParentId() == null){
			throw new FlyingException("上级菜单不能为空");
		}
		
		//菜单
		/*if(menu.getType() == MenuType.MENU.getValue()){
			if(StringUtils.isBlank(menu.getUrl())){
				throw new FlyingException("菜单URL不能为空");
			}
		}*/
		
		//上级菜单类型
		int parentType = MenuType.CATALOG.getValue();
		if(menu.getParentId() != 0){
			SysMenuEntity parentMenu = sysMenuService.queryObject(menu.getParentId());
			parentType = parentMenu.getType();
		}
		
		//目录、菜单
		if(menu.getType() == MenuType.CATALOG.getValue() ||
				menu.getType() == MenuType.MENU.getValue()){
			if(parentType != MenuType.CATALOG.getValue()){
				throw new FlyingException("上级菜单只能为目录类型");
			}
			return ;
		}
		
		//按钮
		if(menu.getType() == MenuType.BUTTON.getValue()){
			if(parentType != MenuType.MENU.getValue()){
				throw new FlyingException("上级菜单只能为菜单类型");
			}
			return ;
		}
	}
}
