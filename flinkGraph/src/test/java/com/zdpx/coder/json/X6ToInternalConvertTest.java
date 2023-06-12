package com.zdpx.coder.json;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

import org.junit.jupiter.api.Test;

import com.zdpx.coder.SceneCodeBuilder;
import com.zdpx.coder.graph.Scene;
import com.zdpx.coder.json.x6.X6ToInternalConvert;

class X6ToInternalConvertTest {

    private static final String x6_json1 =
            "\n"
                    + "{\n"
                    + "  \"cells\": [\n"
                    + "    {\n"
                    + "      \"position\": { \"x\": 40, \"y\": 40 },\n"
                    + "      \"size\": { \"width\": 360, \"height\": 160 },\n"
                    + "      \"attrs\": { \"text\": { \"text\": \"Parent\\n(try to move me)\" } },\n"
                    + "      \"visible\": true,\n"
                    + "      \"shape\": \"package\",\n"
                    + "      \"id\": \"da936e39-1c1f-4360-835d-ac1b76bf92a4\",\n"
                    + "      \"zIndex\": 1,\n"
                    + "      \"children\": [\n"
                    + "        \"d582a458-ecb5-4099-848c-b806945860f5\",\n"
                    + "        \"333a19c2-3b46-4255-b524-93e26de9739d\",\n"
                    + "        \"dfba19c2-3b46-4255-b524-93e26de9739d\",\n"
                    + "        \"11159a19-9226-42b2-9c71-7809d090bf84\",\n"
                    + "        \"44459a19-9226-42b2-9c71-7809d090bf84\"\n"
                    + "      ]\n"
                    + "    },\n"
                    + "    {\n"
                    + "      \"position\": { \"x\": 60, \"y\": 100 },\n"
                    + "      \"size\": { \"width\": 100, \"height\": 40 },\n"
                    + "      \"attrs\": { \"text\": { \"text\": \"Child\\n(inner)\" } },\n"
                    + "      \"visible\": true,\n"
                    + "      \"shape\": \"MysqlSourceOperator\",\n"
                    + "      \"id\": \"d582a458-ecb5-4099-848c-b806945860f5\",\n"
                    + "      \"zIndex\": 2,\n"
                    + "      \"parent\": \"da936e39-1c1f-4360-835d-ac1b76bf92a4\",\n"
                    + "      \"data\": {\n"
                    + "        \"parameters\": [\n"
                    + "          {\n"
                    + "            \"tableName\": \"source\",\n"
                    + "            \"connector\": \"jdbc\",\n"
                    + "            \"url\": \"jdbc:mysql://192.168.1.88:3306/flink?allowPublicKeyRetrieval=true\",\n"
                    + "            \"username\": \"root\",\n"
                    + "            \"password\": \"123456\",\n"
                    + "            \"columns\": [\n"
                    + "              {\n"
                    + "                \"name\": \"id\",\n"
                    + "                \"type\": \"STRING\"\n"
                    + "              },\n"
                    + "              {\n"
                    + "                \"name\": \"taskId\",\n"
                    + "                \"type\": \"STRING\"\n"
                    + "              },\n"
                    + "              {\n"
                    + "                \"name\": \"longitude\",\n"
                    + "                \"type\": \"DOUBLE\"\n"
                    + "              },\n"
                    + "              {\n"
                    + "                \"name\": \"latitude\",\n"
                    + "                \"type\": \"DOUBLE\"\n"
                    + "              },\n"
                    + "              {\n"
                    + "                \"name\": \"va\",\n"
                    + "                \"type\": \"DOUBLE\"\n"
                    + "              },\n"
                    + "              {\n"
                    + "                \"name\": \"gbu_time\",\n"
                    + "                \"type\": \"TIMESTAMP\"\n"
                    + "              },\n"
                    + "              {\n"
                    + "                \"name\": \"taskStatus\",\n"
                    + "                \"type\": \"INT\"\n"
                    + "              },\n"
                    + "              {\n"
                    + "                \"name\": \"task_time\",\n"
                    + "                \"type\": \"TIMESTAMP\"\n"
                    + "              }\n"
                    + "            ]\n"
                    + "          }\n"
                    + "        ]\n"
                    + "      }\n"
                    + "    },\n"

                    + "    {\n"
                    + "      \"position\": { \"x\": 420, \"y\": 80 },\n"
                    + "      \"size\": { \"width\": 100, \"height\": 40 },\n"
                    + "      \"attrs\": { \"text\": { \"text\": \"Child\\n(outer)\" } },\n"
                    + "      \"visible\": true,\n"
                    + "      \"shape\": \"CommWindowFunctionOperator\",\n"
                    + "      \"id\": \"333a19c2-3b46-4255-b524-93e26de9739d\",\n"
                    + "      \"zIndex\": 2,\n"
                    + "      \"parent\": \"da936e39-1c1f-4360-835d-ac1b76bf92a4\",\n"
                    + "      \"data\": {\n"
                    + "        \"parameters\": [\n"
                    + "          {\n"
                    + "            \"partition\": \"taskId\",\n"
                    + "            \"order\": \"gbu_time\",\n"
                    + "            \"where\": \"gbuStartTime > now() \",\n"
                    + "            \"group\": { \"aggregation\": \"group\", \"column\": \"c1\" },\n"
                    + "            \"window\": { \"windowFunction\": \"CUMULATE\", \"table\": \"windowTable\", \"descriptor\": \"gbuStartTime\" , " +
                                                    "\"step\": { \"timeSpan\": 11, \"timeUnit\": \"MINUTES\" } ," +
                                                    " \"size\": { \"timeSpan\": 22, \"timeUnit\": \"MINUTES\" } " +
                                                "},\n"
                    + "            \"fieldFunctions\": [\n"
                    + "              {\n"
                    + "                \"outName\": \"startTaskStatus\",\n"
                    + "                \"functionName\": \"DISTINDT\",\n"
                    + "                \"parameters\": [\n"
                    + "                  \"A.taskStatus\"\n"
                    + "                ]\n"
                    + "              },\n"
                    + "              {\n"
//                    + "                \"outName\": \"endTaskStatus\",\n"
//                    + "                \"functionName\": \"LAST\",\n"
                    + "                \"parameters\": [\n"
                    + "                  \"taskStatus\"\n"
                    + "                ]\n"
                    + "              },\n"
                    + "              {\n"
                    + "                \"outName\": \"gbuStartTime\",\n"
                    + "                \"functionName\": \"FIRST\",\n"
                    + "                \"parameters\": [\n"
                    + "                  \"gbu_time\"\n"
                    + "                ]\n"
                    + "              },\n"
                    + "              {\n"
                    + "                \"outName\": \"gbuEndTime\",\n"
//                    + "                \"functionName\": \"LAST\",\n"
                    + "                \"parameters\": [\n"
                    + "                  \"gbu_time\"\n"
                    + "                ]\n"
                    + "              },\n"
                    + "              {\n"
                    + "                \"outName\": \"va\",\n"
                    + "                \"functionName\": \"LAST\",\n"
                    + "                \"parameters\": [\n"
                    + "                  \"A.va\"\n"
                    + "                ]\n"
                    + "              }\n"
                    + "            ]\n"

                    + "          }\n"
                    + "        ]\n"
                    + "      }\n"
                    + "    },\n"

                    + "    {\n"
                    + "      \"position\": { \"x\": 420, \"y\": 80 },\n"
                    + "      \"size\": { \"width\": 100, \"height\": 40 },\n"
                    + "      \"attrs\": { \"text\": { \"text\": \"Child\\n(outer)\" } },\n"
                    + "      \"visible\": true,\n"
                    + "      \"shape\": \"MysqlSinkOperator\",\n"
                    + "      \"id\": \"dfba19c2-3b46-4255-b524-93e26de9739d\",\n"
                    + "      \"zIndex\": 2,\n"
                    + "      \"parent\": \"da936e39-1c1f-4360-835d-ac1b76bf92a4\",\n"
                    + "      \"data\": {\n"
                    + "        \"parameters\": [\n"
                    + "          {\n"
                    + "            \"tableName\": \"sink\",\n"
                    + "            \"connector\": \"jdbc\",\n"
                    + "            \"url\": \"jdbc:mysql://192.168.1.88:3306/flink?allowPublicKeyRetrieval=true\",\n"
                    + "            \"username\": \"root\",\n"
                    + "            \"password\": \"123456\",\n"
                    + "            \"columns\": [\n"
                    + "              {\n"
                    + "                \"name\": \"id\",\n"
                    + "                \"type\": \"STRING\"\n"
                    + "              }\n"
                    + "            ]\n"
                    + "          }\n"
                    + "        ]\n"
                    + "      }\n"
                    + "    },\n"

                    + "    {\n"
                    + "      \"shape\": \"edge\",\n"
                    + "      \"attrs\": { \"line\": { \"stroke\": \"#8f8f8f\", \"strokeWidth\": 1 } },\n"
                    + "      \"id\": \"11159a19-9226-42b2-9c71-7809d090bf84\",\n"
                    + "      \"source\": { \"cell\": \"d582a458-ecb5-4099-848c-b806945860f5\" , \"port\": "
                    + "\"output_0\"},\n"
                    + "      \"target\": { \"cell\": \"333a19c2-3b46-4255-b524-93e26de9739d\" , \"port\": "
                    + "\"input_0\"},\n"
                    + "      \"vertices\": [\n"
                    + "        { \"x\": 120, \"y\": 60 },\n"
                    + "        { \"x\": 200, \"y\": 100 }\n"
                    + "      ],\n"
                    + "      \"zIndex\": 3,\n"
                    + "      \"parent\": \"da936e39-1c1f-4360-835d-ac1b76bf92a4\"\n"
                    + "    },\n"

                    + "    {\n"
                    + "      \"shape\": \"edge\",\n"
                    + "      \"attrs\": { \"line\": { \"stroke\": \"#8f8f8f\", \"strokeWidth\": 1 } },\n"
                    + "      \"id\": \"44459a19-9226-42b2-9c71-7809d090bf84\",\n"
                    + "      \"source\": { \"cell\": \"333a19c2-3b46-4255-b524-93e26de9739d\" , \"port\": "
                    + "\"output_0\"},\n"
                    + "      \"target\": { \"cell\": \"dfba19c2-3b46-4255-b524-93e26de9739d\" , \"port\": "
                    + "\"input_0\"},\n"
                    + "      \"vertices\": [\n"
                    + "        { \"x\": 120, \"y\": 60 },\n"
                    + "        { \"x\": 200, \"y\": 100 }\n"
                    + "      ],\n"
                    + "      \"zIndex\": 3,\n"
                    + "      \"parent\": \"da936e39-1c1f-4360-835d-ac1b76bf92a4\"\n"
                    + "    }\n"

                    + "  ]\n"
                    + "}\n";


    private static final String cus1 =
            "\n"
                    + "{\n"
                    + "  \"cells\": [\n"

                    + "    {\n"
                    + "      \"position\": { \"x\": 420, \"y\": 80 },\n"
                    + "      \"size\": { \"width\": 100, \"height\": 40 },\n"
                    + "      \"attrs\": { \"text\": { \"text\": \"Child\\n(outer)\" } },\n"
                    + "      \"visible\": true,\n"
                    + "      \"shape\": \"CustomerOperator\",\n"
                    + "      \"id\": \"dfba19c2-3b46-4255-b524-93e26de9739d\",\n"
                    + "      \"zIndex\": 2,\n"
                    + "      \"parent\": \"da936e39-1c1f-4360-835d-ac1b76bf92a4\",\n"
                    + "      \"data\": {\n"
                    + "        \"parameters\": [\n"
                    + "          {\n"
                    + "            \"statementBody\": \"INSERT INTO %0 %1 SELECT %2 FROM %3;\",\n"

                    + "            \"placeholder\": [\n"

                    + "              {\n"
                    + "                \"name\": \"%2\",\n"
                    + "                \"type\": \"fieldName\",\n"
                    + "                \"needBrackets\": \"false\",\n"
                    + "            \"fieldFunctions\": [\n"
                    + "              {\n"
                    + "                \"outName\": \"startTaskStatus\",\n"
                    + "                \"functionName\": \"DISTINDT\",\n"
                    + "                \"parameters\": [\n"
                    + "                  \"A.taskStatus\"\n"
                    + "                ]\n"
                    + "              },\n"
                    + "              {\n"
                    + "                \"parameters\": [\n"
                    + "                  \"taskStatus\"\n"
                    + "                ]\n"
                    + "              }\n"
                    + "            ]\n"
                    + "              },\n"
                    + "              {\n"
                    + "                \"name\": \"%3\",\n"
                    + "                \"type\": \"inputTableName\",\n"
                    + "                \"columns\": \"_CepOperator8\"\n"
                    + "              },\n"
                    + "              {\n"
                    + "                \"name\": \"%1\",\n"
                    + "                \"type\": \"outPutFieldName\",\n"
                    + "                \"needBrackets\": \"true\",\n"
                        + "            \"fieldFunctions\": [\n"
                        + "              {\n"
                        + "                \"outName\": \"startTaskStatus\",\n"
                        + "                \"functionName\": \"DISTINDT\",\n"
                        + "                \"parameters\": [\n"
                        + "                  \"A.taskStatus\"\n"
                        + "                ]\n"
                        + "              },\n"
                        + "              {\n"
                        + "                \"parameters\": [\n"
                        + "                  \"taskStatus\"\n"
                        + "                ]\n"
                        + "              }\n"
                        + "            ]\n"
                    + "              },\n"
                    + "              {\n"
                    + "                \"name\": \"%0\",\n"
                    + "                \"type\": \"outPutTableName\",\n"
                    + "                \"columns\": \"ts_mysqlSink_cep\"\n"
                    + "              }\n"

                    + "            ]\n"
                    + "          }\n"
                    + "        ]\n"
                    + "      }\n"
                    + "    }\n"

                    + "  ]\n"
                    + "}\n";

    public static void main(String [] args){

        X6ToInternalConvert x6 = new X6ToInternalConvert();
        Scene result = x6.convert(cus1);
        result.getEnvironment().setResultType(ResultType.SQL);
        SceneCodeBuilder su = new SceneCodeBuilder(result);
        final String build = su.build();
        System.out.println(build);
    }
}
