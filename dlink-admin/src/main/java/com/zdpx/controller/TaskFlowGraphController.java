package com.zdpx.controller;

import com.dlink.common.result.Result;
import com.dlink.model.Task;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

import com.zdpx.service.TaskFlowGraphService;

/**
 *
 */
@Slf4j
@RestController
@RequestMapping("/api/zdpx")
public class TaskFlowGraphController {

    private final TaskFlowGraphService taskFlowGraphService;

    public TaskFlowGraphController(TaskFlowGraphService taskFlowGraphService) {
        this.taskFlowGraphService = taskFlowGraphService;
    }

    @PostMapping
    public Result<Void> submitSql(@RequestBody Task task) {
        if (taskFlowGraphService.saveOrUpdateTask(task)) {
            return Result.succeed("操作成功");
        } else {
            return Result.failed("操作失败");
        }

    }

}
