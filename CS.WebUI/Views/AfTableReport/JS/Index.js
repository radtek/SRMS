﻿//排序
var sort = { field: "ID", type: "ASC" };

var divWidth = 900, divHeight = 480;
layui.use(["table", "jquery"], function () {
    var table = layui.table, $ = layui.jquery;
    table.on('tool(tablefilter)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'edit') {
            OpenTopWindow("编辑报表", 0, 0, "../AfTableReport/Edit?id=" + data.ID);
        } else if (layEvent === 'configure') {
            OpenTopWindow("报表配置", 0, 0, "../AfTableReport/Configure?id=" + data.ID);
        } else if (layEvent === 'enable') {
            var url = "../AfTableReport/SetEnable?id=" + data.ID;
            $.post(url, function (result) {
                if (result.IsSuccess == true) {
                    RefreshData();
                } else {
                    layer.alert("启用失败 " + result.Message);
                }
            });
        } else if (layEvent === 'disable') {
            var url = "../AfTableReport/SetUnable?id=" + data.ID;
            $.post(url, function (result) {
                if (result.IsSuccess == true) {
                    RefreshData();
                } else {
                    layer.alert("停用失败 " + result.Message);
                }
            });
        } else if (layEvent === 'del') {
            layer.confirm('真的删除行么', function (index) {
                layer.close(index);
                var url = "../AfTableReport/Delete?id=" + data.ID;
                $.post(url, function (result) {
                    if (result.IsSuccess == true) {
                        RefreshData();
                    } else {
                        layer.alert("删除失败" + result.Message);
                    }
                });
            });
        }
    });
    //表格排序
    table.on('sort(tablefilter)', function (obj) {
        sort = obj;
        Query();
    });
});

//添加
function Add() {
    OpenTopWindow("添加报表", 0, 0, "../AfTableReport/Edit?id=0");
}

//查询
var pageindex = 1;
function Query() {
    pageindex = 1;
    RefreshData();
}

//刷新表格
function RefreshData() {
    layui.use(['table', 'jquery'], function () {
        var table = layui.table, $ = layui.jquery;
        //执行重载
        table.reload('datatable', {
            initSort: sort
            , where: {
                name: $("#NAME").val()
                , orderByField: sort.field
                , orderByType: sort.type
            }
            , page: {
                curr: pageindex
            }
            , done: function (res, curr, count) {
                pageindex = curr;
            }
        });
    });
}