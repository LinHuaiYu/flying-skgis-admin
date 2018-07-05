package com.flying.service;

import java.util.List;
import java.util.Map;

import com.flying.entity.SysMenuEntity;


/**
 * 菜单管理
 * 
 */
public interface SysMenuService {
	
	/**
	 * 根据父菜单，查询子菜单
	 * @param parentId 父菜单ID
	 * @param menuIdList  用户菜单ID
	 */
	List<SysMenuEntity> queryListParentId(Long parentId, List<Long> menuIdList);
	
	/**
	 * 获取不包含按钮的菜单列表
	 */
	List<SysMenuEntity> queryNotButtonList();
	
	/**
	 * 获取用户菜单列表
	 */
	List<SysMenuEntity> getUserMenuList(Long userId);
	
	
	/**
	 * 查询菜单
	 */
	SysMenuEntity queryObject(Long menuId);
	
	/**
	 * 查询菜单列表
	 */
	List<SysMenuEntity> queryList(Map<String, Object> map);
	
	/**
	 * 查询总数
	 */
	int queryTotal(Map<String, Object> map);
	
	/**
	 * 保存菜单
	 */
	void save(SysMenuEntity menu);
	
	/**
	 * 修改
	 */
	void update(SysMenuEntity menu);
	
	/**
	 * 删除
	 */
	void deleteBatch(Long[] menuIds);
	
	/**
	 * 查询用户的权限列表
	 */
	List<SysMenuEntity> queryUserList(Long userId);

	List<SysMenuEntity> treeList();
	
	/**
	 * 一级菜单查询
	 * @param param
	 * @return
	 */
	List<SysMenuEntity> permsFirst(Map<String, Object> param);
	
	/**
	 * 查询二级，三级菜单
	 * @param param
	 * @return
	 */
	List<SysMenuEntity> permSecond(Map<String, Object> param);
	
	List<SysMenuEntity> querySecondList(Map<String, Object> param);
	
}
