/*
 *
 *  Licensed to the Apache Software Foundation (ASF) under one or more
 *  contributor license agreements.  See the NOTICE file distributed with
 *  this work for additional information regarding copyright ownership.
 *  The ASF licenses this file to You under the Apache License, Version 2.0
 *  (the "License"); you may not use this file except in compliance with
 *  the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

package org.dinky.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.dinky.assertion.Asserts;
import org.dinky.data.dto.StudioCADTO;
import org.dinky.data.dto.StudioDDLDTO;
import org.dinky.data.dto.StudioExecuteDTO;
import org.dinky.data.dto.StudioMetaStoreDTO;
import org.dinky.data.enums.Status;
import org.dinky.data.model.Catalog;
import org.dinky.data.model.FlinkColumn;
import org.dinky.data.model.Schema;
import org.dinky.data.result.IResult;
import org.dinky.data.result.Result;
import org.dinky.data.result.SelectResult;
import org.dinky.data.result.SqlExplainResult;
import org.dinky.explainer.lineage.LineageResult;
import org.dinky.job.JobResult;
import org.dinky.service.StudioService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * StudioController
 *
 * @since 2021/5/30 11:05
 */
@Slf4j
@RestController
@RequestMapping("/api/studio")
@RequiredArgsConstructor
@Api(value = "/api/studio", tags = "SQL语句执行类")
public class StudioController {

    private final StudioService studioService;

    /** 执行Sql */
    @PostMapping("/executeSql")
    @ApiOperation(value = "执行Sql", notes = "执行Sql")
    public Result<JobResult> executeSql(@RequestBody StudioExecuteDTO studioExecuteDTO) {
        try {
            JobResult jobResult = studioService.executeSql(studioExecuteDTO);
            return Result.succeed(jobResult, Status.EXECUTE_SUCCESS);
        } catch (Exception ex) {
            JobResult jobResult = new JobResult();
            jobResult.setJobConfig(studioExecuteDTO.getJobConfig());
            jobResult.setSuccess(false);
            jobResult.setStatement(studioExecuteDTO.getStatement());
            jobResult.setError(ex.toString());
            return Result.failed(jobResult, Status.EXECUTE_FAILED);
        }
    }

    /** 解释Sql */
    @PostMapping("/explainSql")
    @ApiOperation(value = "解释Sql", notes = "解释Sql")
    public Result<List<SqlExplainResult>> explainSql(
            @RequestBody StudioExecuteDTO studioExecuteDTO) {
        return Result.succeed(studioService.explainSql(studioExecuteDTO), "解释成功");
    }

    /** 获取执行图 */
    @PostMapping("/getStreamGraph")
    @ApiOperation(value = "获取执行图", notes = "获取执行图")
    public Result<ObjectNode> getStreamGraph(@RequestBody StudioExecuteDTO studioExecuteDTO) {
        return Result.succeed(studioService.getStreamGraph(studioExecuteDTO));
    }

    /** 获取sql的jobplan */
    @PostMapping("/getJobPlan")
    @ApiOperation(value = "获取sql的jobplan", notes = "获取sql的jobplan")
    public Result<ObjectNode> getJobPlan(@RequestBody StudioExecuteDTO studioExecuteDTO) {
        try {
            return Result.succeed(studioService.getJobPlan(studioExecuteDTO));
        } catch (Exception e) {
            e.printStackTrace();
            return Result.failed(e.getMessage());
        }
    }

    /** 进行DDL操作 */
    @PostMapping("/executeDDL")
    @ApiOperation(value = "进行DDL操作", notes = "进行DDL操作")
    public Result<IResult> executeDDL(@RequestBody StudioDDLDTO studioDDLDTO) {
        IResult result = studioService.executeDDL(studioDDLDTO);
        return Result.succeed(result, Status.EXECUTE_SUCCESS);
    }

    /** 根据jobId获取数据 */
    @GetMapping("/getJobData")
    @ApiOperation(value = "根据jobId获取数据", notes = "根据jobId获取数据")
    public Result<SelectResult> getJobData(@RequestParam String jobId) {
        return Result.succeed(studioService.getJobData(jobId));
    }

    /** 获取单任务实例的血缘分析 */
    @PostMapping("/getLineage")
    @ApiOperation(value = "获取单任务实例的血缘分析", notes = "获取单任务实例的血缘分析")
    public Result<LineageResult> getLineage(@RequestBody StudioCADTO studioCADTO) {
        LineageResult lineage = studioService.getLineage(studioCADTO);
        return Asserts.isNull(lineage)
                ? Result.failed("血缘分析异常")
                : Result.succeed(lineage, "血缘分析成功");
    }

    /** 获取flinkJobs列表 */
    @GetMapping("/listJobs")
    @ApiOperation(value = "获取flinkJobs列表", notes = "获取flinkJobs列表")
    public Result<JsonNode[]> listJobs(@RequestParam Integer clusterId) {
        List<JsonNode> jobs = studioService.listJobs(clusterId);
        return Result.succeed(jobs.toArray(new JsonNode[0]));
    }

    /** 停止任务 */
    @GetMapping("/cancel")
    @ApiOperation(value = "停止任务", notes = "停止任务")
    public Result<Boolean> cancel(@RequestParam Integer clusterId, @RequestParam String jobId) {
        return Result.succeed(studioService.cancel(clusterId, jobId), Status.STOP_SUCCESS);
    }

    /** savepoint */
    @GetMapping("/savepoint")
    @ApiOperation(value = "由保存点提交到集群", notes = "由保存点提交到集群")
    public Result<Boolean> savepoint(
            @RequestParam Integer clusterId,
            @RequestParam String jobId,
            @RequestParam String savePointType,
            @RequestParam String name,
            @RequestParam Integer taskId) {
        return Result.succeed(
                studioService.savepoint(taskId, clusterId, jobId, savePointType, name),
                "savepoint 成功");
    }

    /** 获取 Meta Store Catalog 和 Database */
    @PostMapping("/getMSCatalogs")
    @ApiOperation(value = "获取元存储目录", notes = "获取元存储目录")
    public Result<List<Catalog>> getMSCatalogs(@RequestBody StudioMetaStoreDTO studioMetaStoreDTO) {
        return Result.succeed(studioService.getMSCatalogs(studioMetaStoreDTO));
    }

    /** 获取 Meta Store Schema/Database 信息 */
    @PostMapping("/getMSSchemaInfo")
    @ApiOperation(value = "获取元存储模式", notes = "获取元数据信息")
    public Result<Schema> getMSSchemaInfo(@RequestBody StudioMetaStoreDTO studioMetaStoreDTO) {
        return Result.succeed(studioService.getMSSchemaInfo(studioMetaStoreDTO));
    }

    /** 获取 Meta Store Flink Column 信息 */
    @GetMapping("/getMSFlinkColumns")
    @ApiOperation(value = "获取元存储Flink目录信息", notes = "获取元存储Flink目录信息")
    public Result<List<FlinkColumn>> getMSFlinkColumns(
            @RequestParam Integer envId,
            @RequestParam String catalog,
            @RequestParam String database,
            @RequestParam String table) {
        StudioMetaStoreDTO studioMetaStoreDTO = new StudioMetaStoreDTO();
        studioMetaStoreDTO.setEnvId(envId);
        studioMetaStoreDTO.setCatalog(catalog);
        studioMetaStoreDTO.setDatabase(database);
        studioMetaStoreDTO.setTable(table);
        return Result.succeed(studioService.getMSFlinkColumns(studioMetaStoreDTO));
    }
}
