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

UPDATE
    dinky_udf_manage duml
SET
    "language" =
        CASE
            WHEN r.file_name LIKE '%.zip' OR r.file_name LIKE '%.py' THEN 'python'
            WHEN r.file_name LIKE '%.jar' THEN 'java'
            ELSE 'unknown'
            END
    FROM dinky_resources r
WHERE
    duml.resources_id = r.id;
