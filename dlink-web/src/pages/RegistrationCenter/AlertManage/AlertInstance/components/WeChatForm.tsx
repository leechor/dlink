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

import React, { useState } from 'react';
import { Button, Divider, Form, Input, Modal, Radio, Switch } from 'antd';
import { AlertInstanceTableListItem } from '@/pages/RegistrationCenter/data';
import {
  buildJSONData,
  getJSONData,
} from '@/pages/RegistrationCenter/AlertManage/AlertInstance/function';
import { ALERT_TYPE } from '@/pages/RegistrationCenter/AlertManage/AlertInstance/conf';
import { l } from '@/utils/intl';

export type AlertInstanceFormProps = {
  onCancel: (flag?: boolean) => void;
  onSubmit: (values: Partial<AlertInstanceTableListItem>) => void;
  onTest: (values: Partial<AlertInstanceTableListItem>) => void;
  modalVisible: boolean;
  values: Partial<AlertInstanceTableListItem>;
};

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const WeChatForm: React.FC<AlertInstanceFormProps> = (props) => {
  const [form] = Form.useForm();
  const [formVals, setFormVals] = useState<Partial<AlertInstanceTableListItem>>({
    id: props.values?.id,
    name: props.values?.name,
    type: ALERT_TYPE.WECHAT,
    params: props.values?.params,
    enabled: props.values?.enabled,
  });

  const {
    onSubmit: handleSubmit,
    onCancel: handleModalVisible,
    onTest: handleTest,
    modalVisible,
  } = props;

  const onValuesChange = (change: any, all: any) => {
    setFormVals({ ...formVals, ...change });
  };
  const sendTestForm = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals(buildJSONData(formVals, fieldsValue));
    handleTest(buildJSONData(formVals, fieldsValue));
  };

  const submitForm = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals(buildJSONData(formVals, fieldsValue));
    handleSubmit(buildJSONData(formVals, fieldsValue));
  };

  const renderContent = (vals) => {
    return (
      <>
        <Divider>{l('pages.rc.alert.instance.wechat')}</Divider>
        <Form.Item
          name="name"
          label={l('pages.rc.alert.instance.name')}
          rules={[{ required: true, message: l('pages.rc.alert.instance.namePleaseHolder') }]}
        >
          <Input placeholder={l('pages.rc.alert.instance.namePleaseHolder')} />
        </Form.Item>
        <Form.Item
          name="sendType"
          label={l('pages.rc.alert.instance.sendType')}
          validateTrigger={['onChange', 'onBlur']}
          rules={[{ required: true, message: l('pages.rc.alert.instance.sendTypePleaseHolder') }]}
        >
          <Radio.Group defaultValue="应用">
            <Radio value="应用">{l('pages.rc.alert.instance.sendType.app')}</Radio>
            <Radio value="群聊">{l('pages.rc.alert.instance.sendType.wechat')}</Radio>
          </Radio.Group>
        </Form.Item>
        {vals.sendType == '群聊' ? (
          <>
            <Form.Item
              name="webhook"
              label={l('pages.rc.alert.instance.webhook')}
              rules={[
                { required: true, message: l('pages.rc.alert.instance.webhookPleaseHolder') },
              ]}
            >
              <Input.TextArea
                placeholder={l('pages.rc.alert.instance.webhookPleaseHolder')}
                allowClear
                autoSize={{ minRows: 1, maxRows: 5 }}
              />
            </Form.Item>
            <Form.Item name="keyword" label={l('pages.rc.alert.instance.keyword')}>
              <Input placeholder={l('pages.rc.alert.instance.keywordPleaseHolder')} />
            </Form.Item>
            <Form.Item
              name="isAtAll"
              validateTrigger={['onChange', 'onBlur']}
              label={l('pages.rc.alert.instance.isAtAll')}
            >
              <Switch
                checkedChildren={l('button.enable')}
                unCheckedChildren={l('button.disable')}
                defaultChecked={vals.isAtAll}
              />
            </Form.Item>
            {!vals.isAtAll && (
              <Form.Item
                name="users"
                label={l('pages.rc.alert.instance.atUsers')}
                rules={[
                  {
                    required: true,
                    message: l('pages.rc.alert.instance.wechatAtUsersPleaseHolder'),
                  },
                ]}
              >
                <Input placeholder={l('pages.rc.alert.instance.wechatAtUsersPleaseHolder')} />
              </Form.Item>
            )}
          </>
        ) : (
          <>
            <Form.Item
              name="corpId"
              label={l('pages.rc.alert.instance.corpId')}
              rules={[{ required: true, message: l('pages.rc.alert.instance.corpIdPleaseHolder') }]}
            >
              <Input placeholder={l('pages.rc.alert.instance.corpIdPleaseHolder')} />
            </Form.Item>
            <Form.Item
              name="secret"
              label={l('pages.rc.alert.instance.secret')}
              rules={[{ required: true, message: l('pages.rc.alert.instance.secretPleaseHolder') }]}
            >
              <Input placeholder={l('pages.rc.alert.instance.secretPleaseHolder')} />
            </Form.Item>
            <Form.Item
              name="users"
              label={l('pages.rc.alert.instance.user')}
              rules={[{ required: true, message: l('pages.rc.alert.instance.userPleaseHolder') }]}
            >
              <Input placeholder={l('pages.rc.alert.instance.userPleaseHolder')} />
            </Form.Item>
            <Form.Item
              name="agentId"
              label={l('pages.rc.alert.instance.agentId')}
              rules={[
                { required: true, message: l('pages.rc.alert.instance.agentIdPleaseHolder') },
              ]}
            >
              <Input placeholder={l('pages.rc.alert.instance.agentIdPleaseHolder')} />
            </Form.Item>
          </>
        )}
        <Form.Item
          name="msgtype"
          label={l('pages.rc.alert.instance.msgtype')}
          rules={[{ required: true, message: l('pages.rc.alert.instance.msgtypePleaseHolder') }]}
        >
          <Radio.Group>
            <Radio value="markdown">{l('pages.rc.alert.instance.markdown')}</Radio>
            <Radio value="text">{l('pages.rc.alert.instance.text')}</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="enabled" label={l('global.table.isEnable')}>
          <Switch
            checkedChildren={l('button.enable')}
            unCheckedChildren={l('button.disable')}
            defaultChecked={vals.enabled}
          />
        </Form.Item>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleModalVisible(false)}>{l('button.cancel')}</Button>
        <Button type="primary" onClick={() => sendTestForm()}>
          {l('button.test')}
        </Button>
        <Button type="primary" onClick={() => submitForm()}>
          {l('button.finish')}
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={'40%'}
      bodyStyle={{ padding: '32px 40px 48px', height: '600px', overflowY: 'auto' }}
      destroyOnClose
      title={
        formVals.id ? l('pages.rc.alert.instance.modify') : l('pages.rc.alert.instance.create')
      }
      visible={modalVisible}
      footer={renderFooter()}
      onCancel={() => handleModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={getJSONData(formVals as AlertInstanceTableListItem)}
        onValuesChange={onValuesChange}
      >
        {renderContent(getJSONData(formVals as AlertInstanceTableListItem))}
      </Form>
    </Modal>
  );
};

export default WeChatForm;
