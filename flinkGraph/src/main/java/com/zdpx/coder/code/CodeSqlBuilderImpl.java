package com.zdpx.coder.code;

/**
 *
 */
public class CodeSqlBuilderImpl implements CodeBuilder {
    private final StringBuilder result = new StringBuilder();

    @Override
    public void registerUdfFunction(String udfFunctionName, String functionClass) {
        var sql = String.format("CREATE TEMPORARY FUNCTION %s AS %s", udfFunctionName, functionClass);
        result.append(sql);
    }

    @Override
    public void firstBuild() {

    }

    @Override
    public void generate(String sql) {
        result.append("\r\n");
        result.append(sql);
        result.append(";");
        result.append(System.lineSeparator());
    }

    @Override
    public String lastBuild() {
        return result.toString();
    }
}
