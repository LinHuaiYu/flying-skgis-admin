package com.flying.dao;

import java.util.List;

import com.flying.entity.SysDeptEntity;

/**
 * 部门管理
 */
public interface SysDeptDao extends BaseDao<SysDeptEntity> {

    /**
     * 查询子部门ID列表
     * @param parentId  上级部门ID
     */
    List<Long> queryDetpIdList(Long parentId);
}
