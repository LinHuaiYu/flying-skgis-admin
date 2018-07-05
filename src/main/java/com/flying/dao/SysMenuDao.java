package com.flying.dao;

import java.util.List;
import java.util.Map;

import com.flying.entity.SysMenuEntity;

/**
 * 菜单管理
 */
public interface SysMenuDao extends BaseDao<SysMenuEntity> {
	
	/**
	 * 根据父菜单，查询子菜单
	 * @param parentId 父菜单ID
	 */
	List<SysMenuEntity> queryListParentId(Long parentId);
	
	/**
	 * 获取不包含按钮的菜单列表
	 */
	List<SysMenuEntity> queryNotButtonList();
	
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
	List<SysMenuEntity> queryUserListFirst(Map<String, Object> param);

	List<SysMenuEntity> permsByParentId(Map<String, Object> param);
}
