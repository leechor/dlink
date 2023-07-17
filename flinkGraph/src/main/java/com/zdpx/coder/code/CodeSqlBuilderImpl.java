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

package com.zdpx.coder.code;

import com.zdpx.coder.graph.CheckInformationModel;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 */
public class CodeSqlBuilderImpl implements CodeBuilder {
    private final StringBuilder result = new StringBuilder();
    private final Map<String, Object> checkInformation = new HashMap<>();
    private static final String SEMICOLON = ";";

    @Override
    public void registerUdfFunction(String udfFunctionName, String functionClass) {
        String sql =
                String.format(
                        "CREATE TEMPORARY FUNCTION %s AS '%s'", udfFunctionName, functionClass);
        result.append(sql);
        result.append(SEMICOLON);
    }

    @Override
    public void firstBuild() {
    }

    @Override
    public void generate(String sql) {
        result.append("\r\n");
        result.append(sql);
        result.append(SEMICOLON);
        result.append(System.lineSeparator());
    }

    //添加算子的校验信息
    @Override
    public void addCheckInformation(CheckInformationModel checkInformationModel) {
        @SuppressWarnings("unchecked")
        List<CheckInformationModel> list = (List<CheckInformationModel>) checkInformation.get("MSG");
        if (list == null) {
            list = new ArrayList<>();
        }
        list.add(checkInformationModel);
        checkInformation.put("MSG", list);
    }

    @Override
    public String lastBuild() {
        return result.toString();
    }

    //获取算子的校验信息
    @Override
    public Map<String, Object> getCheckInformation() {
        return checkInformation;
    }
}
