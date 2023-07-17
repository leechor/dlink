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

package com.zdpx.coder.operator.dataSource.mysql;

import com.zdpx.coder.graph.CheckInformationModel;
import com.zdpx.coder.graph.InputPortObject;
import com.zdpx.coder.operator.dataSource.AbstractSqlTable;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;

/**
 *
 */
@Slf4j
public class MysqlSinkOperator extends AbstractSqlTable {

    private static final String MYSQL_SINK = "MysqlSink";

    @Override
    protected void initialize() {
        getInputPorts().put(INPUT_0, new InputPortObject<>(this, INPUT_0));
        setName("MysqlSink");
    }

    /**
     * 校验内容：
     */
    @Override
    protected void generateCheckInformation(Map<String, Object> map) {
        CheckInformationModel model = new CheckInformationModel();
        model.setOperatorId(map.get("id").toString());
        model.setColor("green");
        model.setTableName(map.get("tableName").toString());

        this.getSchemaUtil().getGenerateResult().addCheckInformation(model);
    }

    @Override
    protected void execute(Map<String, Object> dataModel) {
        processLogic(true, null, dataModel);
    }

    @Override
    protected String getDefaultName() {
        return MYSQL_SINK;
    }
}
