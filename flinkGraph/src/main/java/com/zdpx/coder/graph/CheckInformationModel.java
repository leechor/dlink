package com.zdpx.coder.graph;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class CheckInformationModel {

    private String operatorId; // 算子id

    private String tableName; // 算子所在的表名称（输出表名称）

    private Map<String, String> portInformation; //端口名称，端口的报错信息

    private String color; //颜色 green red

    private String sqlErrorMsg; //sql校验异常

    private List<String> operatorErrorMsg; //算子校验异常

}
