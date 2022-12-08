create table flink.category
(
    sub_category_id      bigint       not null
        primary key,
    parent_category_name varchar(255) null
)
    collate = utf8_unicode_ci;

create table flink.cep
(
    taskId          varchar(64) null,
    startTaskStatus int         null,
    endTaskStatus   int         null,
    gbuStartTime    timestamp   null,
    gbuEndTime      timestamp   null,
    va              double      null
);

create table flink.gbu_data
(
    id         varchar(64) not null,
    taskId     varchar(64) not null,
    taskStatus int         null,
    gbu_time   timestamp   null,
    task_time  timestamp   null,
    va         double      null
);

create table flink.ts
(
    type       text null,
    id         text null,
    longitude  text null,
    latitude   text null,
    dt         text null,
    v          text null,
    taskId     text null,
    taskStatus int  null
);

