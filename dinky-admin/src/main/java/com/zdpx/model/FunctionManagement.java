package com.zdpx.model;

public enum FunctionManagement {

    IS_NULL("IS NULL"),
    IS_NOT_NULL("IS NOT NULL"),
    IS_DISTINCT_FROM("IS DISTINCT FROM"),
    IS_NOT_DISTINCT_FROM ("IS NOT DISTINCT FROM "),
    LIKE("LIKE"),
    NOT_LIKE("NOT LIKE"),
    SIMILAR_TO("SIMILAR TO"),
    NOT_SIMILAR_TO("NOT SIMILAR TO"),
    IN("IN"),
    NOT_IN("NOT IN"),
    EXISTS("EXISTS"),
    OR("OR"),
    AND("AND"),
    NOT("NOT"),
    IS_FALSE("IS FALSE"),
    IS_NOT_FALSE("IS NOT FALSE"),
    IS_TRUE("IS TRUE"),
    IS_NOT_TRUE("IS NOT TRUE"),
    POWER("POWER"),
    ABS("ABS"),
    MOD("MOD"),
    SQRT("SQRT"),
    LN("LN"),
    LOG10("LOG10"),
    LOG2("LOG2"),
    EXP("EXP"),
    FLOOR("FLOOR"),
    SIN("SIN"),
    SINH("SINH"),
    COS("COS"),
    TAN("TAN"),
    TANH("TANH"),
    COT("COT"),
    ASIN("ASIN"),
    ACOS("ACOS"),
    ATAN("ATAN"),
    ATAN2("ATAN2"),
    COSH("COSH"),
    DEGREES("DEGREES"),
    RADIANS("RADIANS"),
    SIGN("SIGN"),
    ROUND("ROUND"),
    E("E"),
    RAND("RAND"),
    RAND_INTEGER("RAND_INTEGER"),
    BIN("BIN"),
    TRUNCATE("TRUNCATE"),
    LOG("LOG"),
    CEIL("CEIL"),
    CEILING("CEILING"),
    UPPER("UPPER"),
    LOWER("LOWER"),
    POSITION("POSITION"),
    TRIM("TRIM"),
    LTRIM("LTRIM"),
    RTRIM("RTRIM"),
    REGEXP_REPLACE("REGEXP_REPLACE"),
    OVERLAY("OVERLAY"),
    SUBSTRING("SUBSTRING"),
    REPLACE("REPLACE"),
    REGEXP_EXTRACT("REGEXP_EXTRACT"),
    INITCAP("INITCAP"),
    CONCAT("CONCAT"),
    CONCAT_WS("CONCAT_WS"),
    LPAD("LPAD"),
    RPAD("RPAD"),
    FROM_BASE64("FROM_BASE64"),
    TO_BASE64("TO_BASE64"),
    ASCII("ASCII"),
    CHR("CHR"),
    DECODE("DECODE"),
    ENCODE("ENCODE"),
    INSTR("INSTR"),
    LEFT("LEFT"),
    RIGHT("RIGHT"),
    LOCATE("LOCATE"),
    PARSE_URL("PARSE_URL"),
    REGEXP("REGEXP"),
    SPLIT_INDEX("SPLIT_INDEX"),
    STR_TO_MAP("STR_TO_MAP"),
    SUBSTR("SUBSTR"),
    CHAR_LENGTH("CHAR_LENGTH"),
    CHARACTER_LENGTH("CHARACTER_LENGTH"),
    DATE("DATE"),
    TIME("TIME"),
    TIMESTAMP("TIMESTAMP"),
    INTERVAL ("INTERVAL"),
    EXTRACT ("EXTRACT"),
    YEAR ("YEAR"),
    QUARTER ("QUARTER"),
    MONTH ("MONTH"),
    WEEK ("WEEK"),
    DAYOFYEAR ("DAYOFYEAR"),
    DAYOFMONTH ("DAYOFMONTH"),
    DAYOFWEEK ("DAYOFWEEK"),
    HOUR ("HOUR"),
    MINUTE ("MINUTE"),
    SECOND ("SECOND"),
    OVERLAPS  ("OVERLAPS "),
    DATE_FORMAT  ("DATE_FORMAT "),
    TIMESTAMPADD  ("TIMESTAMPADD"),
    TIMESTAMPDIFF  ("TIMESTAMPDIFF"),
    CONVERT_TZ  ("CONVERT_TZ"),
    FROM_UNIXTIME  ("FROM_UNIXTIME"),
    TO_DATE  ("TO_DATE"),
    TO_TIMESTAMP  ("TO_TIMESTAMP"),
    CASE("CASE"),
    WHEN ("WHEN"),
    THEN ("THEN"),
    END ("END"),
    NULLIF ("NULLIF"),
    COALESCE ("COALESCE"),
    IF ("IF"),
    IS_ALPHA ("IS_ALPHA"),
    IS_DECIMAL ("IS_DECIMAL"),
    IS_DIGIT ("IS_DIGIT"),
    CAST ("CAST"),
    CARDINALITY ("CARDINALITY"),
    ELEMENT ("ELEMENT"),
    ARRAY  ("ARRAY"),
    MAP  ("MAP"),
    MD5  ("MD5"),
    SHA1  ("SHA1"),
    SHA224  ("SHA224"),
    SHA256  ("SHA256"),
    SHA384  ("SHA384"),
    SHA512  ("SHA512"),
    SHA2  ("SHA2"),
    AVG  ("AVG"),
    SUM  ("SUM"),
    MAX ("MAX"),
    MIN ("MIN"),
    STDDEV_POP ("STDDEV_POP"),
    STDDEV_SAMP ("STDDEV_SAMP"),
    VAR_POP ("VAR_POP"),
    VAR_SAMP ("VAR_SAMP"),
    COLLECT ("COLLECT"),
    VARIANCE ("VARIANCE"),
    RANK ("RANK"),
    DENSE_RANK ("DENSE_RANK"),
    ROW_NUMBER ("ROW_NUMBER"),
    LEAD ("LEAD"),
    LAG ("LAG"),
    FIRST_VALUE ("FIRST_VALUE"),
    LAST_VALUE ("LAST_VALUE"),
    LISTAGG ("LISTAGG"),
    withColumns ("withColumns"),
    withoutColumns ("withoutColumns")

    ;


    private final String functionName;


    FunctionManagement(String functionName) {
        this.functionName = functionName;
    }

    public String getFunctionName() {
        return functionName;
    }
}
