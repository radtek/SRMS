﻿//排序
var sort = { field: "ID", type: "ASC" };

$(function () {
    //加载下拉树
    var zNodes = JSON.parse($("#dicMenus").val());
    $.comboztree("PID", {
        ztreenode: zNodes
    });
})

layui.use(["table", "jquery", 'form'], function () {
    var table = layui.table, $ = layui.jquery;

    table.on('tool(tablefilter)', function (obj) {
        var data = obj.data;
        var layEvent = obj.event;
        if (layEvent === 'edit') {
            OpenWindow("编辑菜单", 0, 0, "../AfMenu/Edit?id=" + data.ID);
        } else if (layEvent === 'enable') {
            var url = "../AfMenu/SetEnable?id=" + data.ID;
            $.post(url, function (result) {
                if (result.IsSuccess == true) {
                    RefreshData();
                } else {
                    layer.alert("启用失败 " + result.message);
                }
            });
        } else if (layEvent === 'disable') {
            var url = "../AfMenu/SetUnable?id=" + data.ID;
            $.post(url, function (result) {
                if (result.IsSuccess == true) {
                    RefreshData();
                } else {
                    layer.alert("停用失败 " + result.message);
                }
            });
        } else if (layEvent === 'del') {
            layer.confirm('真的删除行么', function (index) {
                layer.close(index);
                var url = "../AfMenu/Delete?id=" + data.ID;
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
    var pid = $("#PID").val();
    OpenWindow("添加菜单", 0, 0, "../AfMenu/Edit?id=0&pid=" + pid);
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
                pid: $("#PID").val()
                , name: $("#NAME").val()
                , url: $("#URL").val()
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

//导出
function ExportFile() {
    url = "../AfMenu/ExportFile?pid=" + $("#PID").val() + "&name=" + $("#NAME").val() + "&url=" + $("#URL").val();
    window.location = url;
}